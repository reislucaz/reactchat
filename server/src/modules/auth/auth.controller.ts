import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  /* Rota para registrar um usuário, é necessário informar o login, a password e o name pelo body. */
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const register = await this.userService.create(registerDto);

    if (!register)
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return register;
  }

  /*Rota para logar um usuário, é necessário informar o login e a password pelo body. */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }

  /* Rota para retornar o perfil do usuário, é necessário estar autenticado. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN, Role.USER]))
  @Get('/profile')
  getProfile(@Request() req) {
    delete req.user.password;
    delete req.user.id;
    return req.user;
  }
}

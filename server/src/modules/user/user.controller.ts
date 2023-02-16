import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../entities';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuário')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* Rota para criar um novo usuário. Apenas o admin pode criar um novo usuário através dessa rota. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN]))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    if (!user)
      throw new HttpException('Login already exists', HttpStatus.CONFLICT);

    return user;
  }

  /* Rota para listar todos os usuários. Apenas o admin pode listar todos os usuários. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN]))
  @Get()
  findAll(@Query('page') page = 1) {
    return this.userService.findAll(page);
  }

  /* Rota para listar um usuário específico. Apenas o admin pode listar um usuário específico. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN]))
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOne(uuid);
  }

  /* Rota para atualizar um usuário. Apenas o admin ou o próprio usuário pode atualizar um usuário. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN, Role.USER]))
  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    if (req.user.role !== Role.ADMIN && req.user.uuid !== uuid)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    const userExists = this.userService.findOne(uuid);
    if (!userExists)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const user = this.userService.update(uuid, updateUserDto);

    if (!user)
      throw new HttpException(
        `Login already exists, can't change`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return user;
  }

  /* Rota para deletar um usuário. Apenas o próprio usuário ou admin pode deletar um usuário. */
  @UseGuards(new JwtAuthGuard([Role.ADMIN, Role.USER]))
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string, @Request() req: any) {
    if (req.user.role !== Role.ADMIN && req.user.uuid !== uuid)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    const remove = this.userService.remove(uuid);

    if (!remove)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return remove;
  }
}

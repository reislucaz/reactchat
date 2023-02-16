import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { Loaded } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly user_service: UserService,
    private jwtService: JwtService,
  ) {}

  // função que valida o usuário de acordo com login e senha, comparando sua hash.
  async ValidateUser(login: string, password: string): Promise<Loaded<User>> {
    const user = await this.user_service.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  // função que gera o token de acesso.
  async login(user: User) {
    const payload = {
      sub: user.uuid,
      username: user.login,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: jwtConstants.secret,
      }),
    };
  }
}

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../../entities';

// Classe que serve como um midleware que verifica se o usuário está autenticado e se possui permissão para acessar o recurso,
// Essa classe é interessante porque além da função acima, retorna um usuário que vai ficar disponível para o resto da requisição.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  tipo: string[];
  constructor(tipo: string[]) {
    super(tipo);
    this.tipo = tipo;
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (
      this.tipo.includes('public') ||
      (this.tipo.includes('admin') && user.role === Role.ADMIN)
    ) {
      return user;
    }

    // Lançando Exception quando usuário não está autorizado.
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Você não está autenticado para acessar esse recurso.',
        )
      );
    } else if (!this.tipo.includes(user.role)) {
      throw new UnauthorizedException(
        `Você não possui permissão para acessar esse recurso.`,
      );
    }
    return user;
  }
}

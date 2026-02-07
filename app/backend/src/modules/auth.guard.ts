import {
  CanActivate,
  ForbiddenException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  
  public handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован',);
    }
    return user;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Роль пользователя не подходит');
    }
    return true;
  }
}

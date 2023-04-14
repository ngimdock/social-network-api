import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JWT } from '../constants';
import { IS_PUBLIC } from '../decorators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtGuard extends AuthGuard(JWT) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    console.log({ isPublicRoute });

    if (isPublicRoute) return true;

    return super.canActivate(ctx);
  }
}

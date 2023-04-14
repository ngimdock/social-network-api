import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequest } from '../types/request-user.type';

export const CurrentUser = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as UserRequest;

    const user = request.user;

    return property ? user?.[property] : user;
  },
);

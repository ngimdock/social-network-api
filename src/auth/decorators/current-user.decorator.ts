import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequest } from '../types/request-user.type';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqlRequest = ctx.getContext().req as UserRequest;

    const user = gqlRequest.user;

    return property ? user?.[property] : user;
  },
);

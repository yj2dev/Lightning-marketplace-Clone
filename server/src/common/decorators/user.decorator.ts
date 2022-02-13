import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('current user data >> ', data);
    console.log('current user ctx >> ', ctx);
    const request = ctx.switchToHttp().getRequest();
    if (request.user) return request.user;
    else null;
  },
);

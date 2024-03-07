export type { SessionType, UserTempSessionType } from '@backend-x/gateway/type/session.type';
import type { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Session = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.session;
});

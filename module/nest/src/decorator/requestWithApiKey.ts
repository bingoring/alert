import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UndefinedAgentIdHeaderError } from '../error/error';

export const ApiKey = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const apiKey = request.headers['x-api-key'];
    if (apiKey === undefined) {
        throw new UndefinedAgentIdHeaderError();
    }
    return apiKey;
});

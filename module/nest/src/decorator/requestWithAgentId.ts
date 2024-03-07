import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UndefinedAgentIdHeaderError } from '../error/error';

export const AgentId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const agentId = request.headers['agent-id'];
    if (agentId === undefined) {
        throw new UndefinedAgentIdHeaderError();
    }
    return agentId;
});

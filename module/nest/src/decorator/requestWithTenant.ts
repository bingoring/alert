import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UndefinedTenantIdHeaderError } from '../error/error';

export const TenantId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const tenantId = request.headers['x-tenant-id'];
    if (tenantId === undefined) {
        throw new UndefinedTenantIdHeaderError();
    }
    return tenantId;
});

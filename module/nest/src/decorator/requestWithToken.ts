import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.token;
});

export const IpAddr = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const xForwardedForHeader = request.headers['x-forwarded-for'];
    if (xForwardedForHeader !== undefined) {
        const ips = xForwardedForHeader.split(',');
        const clientIp = ips[0].trim();
        return clientIp;
    } else {
        const directClientIp = request.connection.remoteAddress;
        return directClientIp;
    }
});

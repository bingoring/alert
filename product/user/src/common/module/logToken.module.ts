export { DataSource } from 'typeorm';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SessionType } from '../decorator/session.decorator';
import { LogTokenType } from '@backend-x/nest/type';
import { getIpAddr } from '@backend-x/common/util/etc';

export const LogToken = 'LOGTOKEN';

const logTokenFactory = {
    provide: LogToken,
    scope: Scope.DEFAULT,
    useFactory: (req: Request & { session: SessionType }): LogTokenType => {
        return {
            userId: req.session.user.id,
            loginId: req.session.user.loginId,
            tenantId: req.session.organizationId,
            ipAddr: getIpAddr(req) ?? undefined,
        };
    },
    inject: [REQUEST],
};

@Global()
@Module({
    providers: [logTokenFactory],
    exports: [logTokenFactory],
})
export class LogTokenModule {}

export { DataSource } from 'typeorm';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SessionType } from '../decorator/session.decorator';

export const UserSessionToken = 'SESSION';

const sessionFactory = {
    provide: UserSessionToken,
    scope: Scope.DEFAULT,
    useFactory: async (req: Request & { session: SessionType }) => {
        return req.session;
    },
    inject: [REQUEST],
};

@Global()
@Module({
    providers: [sessionFactory],
    exports: [sessionFactory],
})
export class SessionModule {}

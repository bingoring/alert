export { DataSource } from 'typeorm';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UndefinedTenantIdHeaderError } from '../error/error';

export const UserDataToken = 'USERDATA';

const userDataFactory = {
    provide: UserDataToken,
    scope: Scope.REQUEST,
    useFactory: async (req: Request) => {
        const headers = req.headers;
        const tenantId = headers['tenant-id'];
        const loginId = headers['login-id'];
        const userId = headers['user-id'];

        if (typeof tenantId !== 'string') {
            throw new UndefinedTenantIdHeaderError();
        }

        return {
            tenantId,
            loginId,
            userId,
        };
    },
    inject: [REQUEST],
};

@Global()
@Module({
    providers: [userDataFactory],
    exports: [userDataFactory],
})
export class UserDataModule {}

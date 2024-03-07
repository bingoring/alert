export { DataSource } from 'typeorm';
import { PGDataSourceConnection } from '@root/pg/connection/connection';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UndefinedTenantIdHeaderError } from '../error/error';

export const ConnectionToken = 'CONNECTION';

const connectionFactory = {
    provide: ConnectionToken,
    scope: Scope.REQUEST,
    useFactory: async (req: Request) => {
        const headers = req.headers;
        const tenantId = headers['x-tenant-id'];

        if (typeof tenantId !== 'string') {
            throw new UndefinedTenantIdHeaderError();
        }

        const dataSource = await PGDataSourceConnection.getInstance().getDataSource(tenantId);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        return dataSource;
    },
    inject: [REQUEST],
};

@Global()
@Module({
    providers: [connectionFactory],
    exports: [connectionFactory],
})
export class TenantModule {}

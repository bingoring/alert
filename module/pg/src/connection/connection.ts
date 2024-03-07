import { DataSource } from 'typeorm';
import { PGDataSource } from './dataSource';
import { PromiseLock } from '@root/common/util/promiseLock';
import { RepositoryOptionType } from '../repository/abstract.type';

export class PGDataSourceConnection {
    public readonly DefaultTenantId: string = 'public';
    private readonly store: Record<string, DataSource>;
    private readonly promiseLock: PromiseLock;
    private readonly pgDataSource: PGDataSource;
    private static instance: PGDataSourceConnection;

    constructor(options?: RepositoryOptionType) {
        this.store = {};
        this.pgDataSource = PGDataSource.createInstance({ entities: options?.entityList, type: 'postgres' });
        this.promiseLock = PromiseLock.create();
    }

    public async getDataSource(tenantId: string) {
        const unlock = await this.promiseLock.lock();
        try {
            this.store[tenantId] ??= await this.createDatasource(tenantId);
        } catch (e) {
            throw e;
        } finally {
            unlock();
        }
        return this.store[tenantId];
    }

    private async createDatasource(tenantId: string) {
        return await this.pgDataSource.createDataSource(tenantId);
    }

    public static getInstance(options?: RepositoryOptionType) {
        if (this.instance === undefined) {
            this.instance = new this(options);
        }

        return this.instance;
    }
}

import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TenantInvalidError } from '../error/schema.error';
import { EntityList } from '../entity/main';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

export class PGDataSource {
    private readonly options: PostgresConnectionOptions;

    constructor(options?: PostgresConnectionOptions) {
        this.options = {
            ...options,
            type: 'postgres',
            host: env.pg.host,
            port: env.pg.port,
            username: env.pg.user,
            password: env.pg.passwd,
            database: env.pg.database,
            entities: this.getIntegratedEntityList(options?.entities),
            extra: {
                query_timeout: env.pg.queryTimeout,
            },
        };
    }

    private async initDataSource(schema: string) {
        const dataSource = new DataSource({
            ...this.options,
            schema,
            namingStrategy: new SnakeNamingStrategy(),
        });

        return await dataSource.initialize();
    }

    private getIntegratedEntityList(entities?: BaseDataSourceOptions['entities']) {
        if (entities === undefined) {
            return EntityList;
        }
        return [...((EntityList as any[]) ?? []), ...((entities as any[]) ?? [])] as BaseDataSourceOptions['entities'];
    }

    public async createDataSource(schema: unknown) {
        if (typeof schema !== 'string') {
            throw new TenantInvalidError();
        }

        return await this.initDataSource(schema);
    }

    public static createInstance(options?: PostgresConnectionOptions) {
        return new PGDataSource(options);
    }
}

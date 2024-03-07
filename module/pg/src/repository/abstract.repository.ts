import type { DataSource, QueryRunner } from 'typeorm';
import { PGDataSourceConnection } from '../connection/connection';
import { DataSourceNotFoundError } from '../error/dataSource.error';
import { RepositoryOptionType } from './abstract.type';

export abstract class AbstractRepository {
    private dataSource?: DataSource;
    protected readonly tenantId: string;

    private readonly pgDataSourceConnection: PGDataSourceConnection;

    protected queryRunner: QueryRunner | undefined;

    constructor(options: RepositoryOptionType) {
        this.pgDataSourceConnection = PGDataSourceConnection.getInstance(options);

        if ('dataSource' in options) {
            this.dataSource = options.dataSource;
            this.tenantId = this.dataSource.driver.schema ?? this.pgDataSourceConnection.DefaultTenantId;
        } else {
            this.tenantId = options.tenantId;
        }

        this.queryRunner = undefined;
    }

    public async initialize() {
        if (this.dataSource?.isInitialized) {
            return this;
        }

        try {
            this.dataSource = await this.pgDataSourceConnection.getDataSource(this.tenantId);
        } catch (e) {
            log.debug(`getting datasource for ${this.tenantId} failed`);
            throw e;
        }
        return this;
    }

    public getDataSource() {
        if (this.dataSource === undefined) {
            throw new DataSourceNotFoundError();
        }

        return this.dataSource;
    }

    public getQueryRunner() {
        const dataSource = this.getDataSource();
        return dataSource.createQueryRunner();
    }

    public async startTransaction(queryRunner?: QueryRunner) {
        if (this.queryRunner === undefined) {
            if (queryRunner !== undefined) {
                this.queryRunner = queryRunner;
            } else {
                this.queryRunner = this.getQueryRunner();
            }
        }

        if (this.queryRunner.isReleased === false) {
            await this.queryRunner.connect();
        }

        try {
            if (this.queryRunner.isTransactionActive === false) {
                await this.queryRunner.startTransaction();
            }

            return this.queryRunner;
        } catch (e) {
            await this.queryRunner.release();
            this.queryRunner = undefined;
            throw e;
        }
    }

    public async commitTransaction() {
        if (this.queryRunner?.isTransactionActive) {
            await this.queryRunner?.commitTransaction();
            await this.queryRunner?.release();
        }
        this.queryRunner = undefined;
    }

    public async rollbackTransaction() {
        if (this.queryRunner?.isTransactionActive) {
            await this.queryRunner?.rollbackTransaction();
            await this.queryRunner?.release();
        }
        this.queryRunner = undefined;
    }
}

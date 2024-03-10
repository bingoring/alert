import { AbstractMigrate } from '@root/pg/migration/abstract.migrate';
import { QueryRunner } from 'typeorm';

export abstract class AbstractHanaMigrate extends AbstractMigrate {
    private readonly migrationVersionkey: string;
    protected readonly curVersion: string;
    protected readonly tableName: string;
    constructor(tenantId: string, queryRunner: QueryRunner, curVersion: string, tableName: string) {
        super(tenantId, queryRunner);
        this.migrationVersionkey = '/migration/version';
        this.curVersion = curVersion;
        this.tableName = tableName;
    }

    protected async getPrevVersion() {
        const prevVersion = await redis.hget(this.migrationVersionkey, this.tableName);
        if (prevVersion === null || prevVersion === undefined) {
            await redis.hset(this.migrationVersionkey, this.tableName, '-1');
            return '-1';
        }
        return prevVersion;
    }

    protected async setCurVersion() {
        await redis.hset(this.migrationVersionkey, this.tableName, this.curVersion);
    }

    protected async check() {
        const prevVersion = await this.getPrevVersion();
        return +prevVersion < +this.curVersion;
    }

    protected async postMigrate(): Promise<void> {
        await redis.hset(this.migrationVersionkey, this.tableName, this.curVersion);
    }

    protected getQuery(query: string, paramList: any[]) {
        for (const [idx, param] of paramList.entries()) {
            query = query.replace(`$${idx + 1}`, param);
        }
        return query;
    }

    protected abstract getSql(): string | string[] | Promise<string> | Promise<string[]>;
}

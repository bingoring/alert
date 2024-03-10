import { QueryRunner } from 'typeorm';

export abstract class AbstractMigrate {
    protected readonly tenantId: string;
    protected readonly queryRunner: QueryRunner;

    constructor(tenantId: string, queryRunner: QueryRunner) {
        this.tenantId = tenantId;
        this.queryRunner = queryRunner;
    }

    public async run() {
        if (!(await this.check())) {
            return;
        }
        const queryList = await this.getSql();
        if (typeof queryList === 'string') {
            return await this.queryRunner.query(queryList);
        }

        for (const query of queryList) {
            try {
                await this.queryRunner.query(query);
            } catch (e) {
                log.error((e as Error).message);
            }
        }

        await this.postMigrate();
    }

    protected abstract check(): boolean | Promise<boolean>;
    protected abstract getSql(): string | string[] | Promise<string> | Promise<string[]>;
    protected abstract postMigrate(): void | Promise<void>;
}

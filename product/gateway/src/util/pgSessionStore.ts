import { SessionData, Store } from 'express-session';
import { DataSource, QueryRunner } from 'typeorm';

export type PGSessionStoreOptionsType = {
    sessionTimeoutMiliSecond?: number;
};

// Ref
// connnect-pg-simple: https://github.com/voxpelli/node-connect-pg-simple/blob/main/index.js
// connect-redis: https://github.com/tj/connect-redis/blob/master/index.ts
export class PGSessionStore extends Store {
    private isInit = false;
    private sessPruneTimer: NodeJS.Timer | undefined = undefined;
    private readonly tableName = 'session';

    public static readonly DefaultSessionTimeoutMiliSeconds = 30 * 60 * 1000;

    constructor(private readonly dataSource: DataSource, private readonly options: PGSessionStoreOptionsType = {}) {
        super();
    }

    public override async get(
        sid: string,
        callback: (err: any, session?: SessionData | null | undefined) => void
    ): Promise<void> {
        await this.initStoreSetting();
        try {
            const result = await this.wrapWithQueryRunnerContext(async (queryRunner) => {
                return queryRunner.query(`SELECT sess FROM "${this.tableName}" WHERE sid = $1 AND expire >= $2`, [
                    sid,
                    new Date().toISOString(),
                ]);
            });

            if (!result || !Array.isArray(result)) {
                return callback(undefined);
            }

            const [session] = result;

            try {
                return callback(
                    null,
                    typeof session['sess'] === 'string' ? JSON.parse(session['sess']) : session['sess']
                );
            } catch {
                await this.destroy(sid, callback);
            }
        } catch (err) {
            return callback(err);
        }
    }

    public override async set(
        sid: string,
        session: SessionData,
        callback?: ((err?: any) => void) | undefined
    ): Promise<void> {
        await this.initStoreSetting();

        const expireTime = this.getExpireTime(session);
        const query = `
        INSERT INTO "${this.tableName}" 
        (sess, expire, sid) 
        SELECT $1, to_timestamp($2), $3 ON CONFLICT (sid) DO UPDATE SET sess=$1, expire=to_timestamp($2) RETURNING sid`;

        try {
            await this.wrapWithQueryRunnerContext(async (queryRunner) => {
                await queryRunner.query(query, [session, expireTime, sid]);
            });
            return callback && callback(undefined);
        } catch (err) {
            return callback && callback(err);
        }
    }

    private getExpireTime(session: SessionData) {
        let expire;

        if (session && session.cookie && session.cookie['expires']) {
            const expireDate = new Date(session.cookie['expires']);
            expire = Math.ceil(expireDate.valueOf() / 1000);
        } else {
            const ttl = this.options.sessionTimeoutMiliSecond || PGSessionStore.DefaultSessionTimeoutMiliSeconds;
            expire = Math.ceil(Date.now() / 1000 + ttl);
        }

        return expire;
    }

    public override async destroy(sid: string, callback?: ((err?: any) => void) | undefined): Promise<void> {
        await this.initStoreSetting();

        try {
            await this.wrapWithQueryRunnerContext(async (queryRunner) => {
                await queryRunner.query(`DELETE FROM "${this.tableName}" WHERE sid = $1`, [sid]);
            });
            return callback && callback();
        } catch (err) {
            return callback && callback(err);
        }
    }

    public override async touch(sid: string, session: SessionData, callback?: (() => void) | undefined): Promise<void> {
        await this.initStoreSetting();

        const expireTime = this.getExpireTime(session);

        try {
            await this.wrapWithQueryRunnerContext(async (queryRunner) => {
                await queryRunner.query(
                    `UPDATE "${this.tableName}" SET expire = to_timestamp($1) WHERE sid = $2 RETURNING sid`,
                    [expireTime, sid]
                );
            });
        } catch {
        } finally {
            return callback && callback();
        }
    }

    public async initStoreSetting(): Promise<void> {
        if (this.isInit) {
            return;
        }
        await this.initTable();
        this.setSessionPruningTimer();
        this.isInit = true;
    }

    private async initTable(): Promise<void> {
        await this.wrapWithQueryRunnerContext(async (queryRunner) => {
            const isTableExist = await queryRunner.hasTable(this.tableName);
            if (!isTableExist) {
                await this.createSessionTable(queryRunner, this.tableName);
            }
        });
    }

    private setSessionPruningTimer(): void {
        this.sessPruneTimer = setInterval(() => {
            this.pruneExpiredSession();
        }, 15 * 60 * 1000);
    }

    private async pruneExpiredSession(): Promise<void> {
        try {
            await this.wrapWithQueryRunnerContext(async (queryRunner) => {
                await queryRunner.query(`DELETE FROM "${this.tableName}" WHERE expire < $1`, [
                    new Date().toISOString(),
                ]);
            });
        } catch (err) {
            console.log(err);
        }
    }

    private async createSessionTable(queryRunner: QueryRunner, tableName: string): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "${tableName}" (
            "sid" varchar NOT NULL COLLATE "default",
            "sess" json NOT NULL,
            "expire" timestamptz NOT NULL,
            CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
        ) WITH (OIDS=FALSE);
        `);
        await queryRunner.query(`CREATE INDEX "IDX_session_expire" ON "${tableName}" ("expire");`);
    }

    private async wrapWithQueryRunnerContext<T>(dbLogic: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await dbLogic(queryRunner);
        } catch (err) {
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}

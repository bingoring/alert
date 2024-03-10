import { HanaMigrateList } from './list.migrate';
import { PGDataSourceConnection } from '@root/pg/connection/connection';

export async function initializeEntities() {
    const pgDataSourceConnection = PGDataSourceConnection.getInstance();
    const defaultTenantId = pgDataSourceConnection.DefaultTenantId;
    const dataSource = await pgDataSourceConnection.getDataSource(defaultTenantId);
    const queryRunner = dataSource.createQueryRunner();

    try {
        for (const migrateCls of HanaMigrateList) {
            const migrate = new migrateCls('public', queryRunner);

            try {
                await migrate.run();
            } catch (e) {
                log.error(
                    `Migration for QueryRunner Initialize failed. (name: ${migrateCls.name}, message: ${
                        (e as Error).message
                    })`
                );
            }
        }

        log.info('Table Initialize Succeed.');
    } catch {
    } finally {
        await queryRunner.release();
    }
}

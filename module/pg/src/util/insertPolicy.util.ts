import { Injectable } from '@nestjs/common';
import { PolicyRepository } from '../repository/policy';
import {
    CreateArrayFilterQuery,
    createArrLenQuery,
    createDateDiffDateFromNowQuery,
    createDateDiffTextFromNowQuery,
    createDateDiffTimestampFromNowQuery,
    createFilterQuery,
    createGetElementInJsonArrayQuery,
    createSpreadQuery,
    getPreFunctionQuery,
} from '../constant/functionQuery.constant';
import { PolicyVersionMap } from '@root/nest/type/policy.type';
import { PGDataSourceConnection } from '../connection/connection';
import { PolicyMigrateList } from '@root/pg/migration/policy/list.migrate';

@Injectable()
export class InsertPolicy {
    public static async createPolicy(tenantId: string) {
        const pgDataSourceConnection = PGDataSourceConnection.getInstance();
        const dataSource = await pgDataSourceConnection.getDataSource(tenantId);
        // const queryRunner = policyRepository.getQueryRunner();
        try {
            for (const migrateCls of PolicyMigrateList) {
                const migrate = new migrateCls(tenantId, dataSource, PolicyVersionMap.v1);

                try {
                    await migrate.execute();
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            log.error(e);
        }
    }

    public static async createFunction(tenantId: string) {
        const policyRepository = await PolicyRepository.createInstance({ tenantId }).initialize();
        const queryRunner = policyRepository.getQueryRunner();
        try {
            const deleteQueryList = getPreFunctionQuery();
            for (const deleteQuery of deleteQueryList) {
                try {
                    await queryRunner.query(deleteQuery);
                } catch {}
            }

            const queryList = [
                CreateArrayFilterQuery,
                createArrLenQuery,
                createDateDiffDateFromNowQuery,
                createDateDiffTextFromNowQuery,
                createDateDiffTimestampFromNowQuery,
                createFilterQuery,
                createGetElementInJsonArrayQuery,
                createSpreadQuery,
            ];
            for (const query of queryList) {
                try {
                    await queryRunner.query(query);
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            log.error(e);
        } finally {
            await queryRunner.release();
        }
    }
}

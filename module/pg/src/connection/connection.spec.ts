import { DefaultConfig } from '@root/common/type/config.type';
import { PGDataSourceConnection } from './connection';
import { TenantInvalidError } from '../error/schema.error';
import { FakeDatabase } from './fakeDatabase.mock';
import { PGDataSource } from './dataSource';
import { randomBytes } from 'crypto';

describe('PGConnection', () => {
    beforeEach(() => {
        globalThis.env = DefaultConfig;
        const fakeDB = FakeDatabase.createInstance();

        jest.spyOn(PGDataSource.prototype as any, 'initDataSource').mockImplementation(async (schema: unknown) => {
            if (typeof schema !== 'string') {
                throw new TenantInvalidError();
            }

            return await fakeDB.createDataSource(schema);
        });
    });

    describe('dataSource', () => {
        it('store same test', async () => {
            const pgConnection = new PGDataSourceConnection();

            const t1 = randomBytes(20).toString('hex');

            const dataSource1 = await pgConnection.getDataSource(t1);
            const dataSource2 = await pgConnection.getDataSource(t1);

            expect(dataSource1).toBe(dataSource2);
            expect(dataSource1.driver.schema).toEqual(t1);
            expect(dataSource2.driver.schema).toEqual(t1);
        });

        it('store not same test', async () => {
            const pgConnection = new PGDataSourceConnection();

            const t1 = randomBytes(20).toString('hex');
            const t2 = randomBytes(20).toString('hex');

            const dataSource1 = await pgConnection.getDataSource(t1);
            const dataSource2 = await pgConnection.getDataSource(t2);

            expect(dataSource1).not.toBe(dataSource2);
            expect(dataSource1.driver.schema).toEqual(t1);
            expect(dataSource2.driver.schema).toEqual(t2);
        });

        it('deadlock test', async () => {
            const pgConnection = new PGDataSourceConnection();

            const t1 = randomBytes(20).toString('hex');
            const t2 = randomBytes(20).toString('hex');
            const promiseList = [];
            for (let i = 0; i < 1000; i++) {
                promiseList.push(pgConnection.getDataSource(t1));
                promiseList.push(pgConnection.getDataSource(t2));
            }

            await Promise.all(promiseList);

            const dataSource1 = await pgConnection.getDataSource(t1);
            const dataSource2 = await pgConnection.getDataSource(t2);

            expect(dataSource1).not.toBe(dataSource2);
        }, 3000);
    });

    describe('sql', () => {
        it('simple query test', async () => {
            const pgConnection = new PGDataSourceConnection();

            const schema = randomBytes(20).toString('hex');
            const dataSource = await pgConnection.getDataSource(schema);

            const queryRunner = dataSource.createQueryRunner();

            const rowList = (await queryRunner.query(`select 1 as num`)) as { num: number }[];

            expect(rowList.length).toEqual(1);
            expect(rowList[0].num).toEqual(1);
        });
    });
});

import { DefaultConfig } from '@root/common/type/config.type';
import { PGDataSource } from './dataSource';
import { TenantInvalidError } from '../error/schema.error';
import { FakeDatabase } from './fakeDatabase.mock';

describe('PGDataSource', () => {
    let fakeDB: FakeDatabase;
    let pgDataSource: PGDataSource;

    beforeEach(async () => {
        globalThis.env = DefaultConfig;
        fakeDB = FakeDatabase.createInstance();

        jest.spyOn(PGDataSource.prototype as any, 'initDataSource').mockImplementation(async (schema: unknown) => {
            if (typeof schema !== 'string') {
                throw new TenantInvalidError();
            }

            return await fakeDB.createDataSource(schema);
        });
        pgDataSource = PGDataSource.createInstance();
    });

    describe('tenant', () => {
        it('tenantId verification test', async () => {
            const numberTest = 1;
            const objectTest = { test: undefined };
            const undefinedTest = undefined;
            const nullTest = null;
            const stringTest = 'string';

            expect(pgDataSource.createDataSource(numberTest)).rejects.toThrowError(TenantInvalidError);
            expect(pgDataSource.createDataSource(objectTest)).rejects.toThrowError(TenantInvalidError);
            expect(pgDataSource.createDataSource(undefinedTest)).rejects.toThrowError(TenantInvalidError);
            expect(pgDataSource.createDataSource(nullTest)).rejects.toThrowError(TenantInvalidError);

            const dataSource = await pgDataSource.createDataSource(stringTest);
            expect(dataSource.driver.schema).toEqual(stringTest);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

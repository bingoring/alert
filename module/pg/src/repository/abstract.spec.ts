import { DefaultConfig } from '@root/common/type/config.type';
import { randomBytes } from 'crypto';
import { FakeDatabase } from '../connection/fakeDatabase.mock';
import { MockRepository } from './abstract.mock';
import { PGDataSource } from '../connection/dataSource';
import { TenantInvalidError } from '../error/schema.error';
import { DataSourceNotFoundError } from '../error/dataSource.error';

describe('AbstractRepository', () => {
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

    describe('initialize', () => {
        it('not called `initialize` to DataSourceNotFound error tenantId based test', () => {
            const tenantId = randomBytes(20).toString('hex');
            const mockRepository = new MockRepository({ tenantId });

            expect(() => mockRepository.getDS()).toThrow(DataSourceNotFoundError);
        });

        it('tenantId based test', async () => {
            const tenantId = randomBytes(20).toString('hex');
            const mockRepository = new MockRepository({ tenantId });
            await mockRepository.initialize();

            expect(() => mockRepository.getDS()).not.toThrow(DataSourceNotFoundError);

            const dataSource = mockRepository.getDS();
            const isInit1 = dataSource.isInitialized;
            await mockRepository.initialize();
            const isInit2 = dataSource.isInitialized;

            expect(isInit1).toEqual(isInit2);
            expect(tenantId).toEqual(mockRepository.getTenantId());
        });

        it('dataSource based test', async () => {
            const tenantId = randomBytes(20).toString('hex');
            const dataSource = await PGDataSource.createInstance().createDataSource(tenantId);
            const mockRepository = new MockRepository({ dataSource });
            expect(() => mockRepository.getDS()).not.toThrow(DataSourceNotFoundError);

            const ds = mockRepository.getDS();

            expect(dataSource).toBe(ds);
            expect(dataSource.driver.schema).toEqual(mockRepository.getTenantId());
        });
    });
});

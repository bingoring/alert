import { DefaultConfig } from '@root/common/type/config.type';
import { randomBytes } from 'crypto';
import { FakeDatabase } from '../connection/fakeDatabase.mock';
import { MockOffsetRepository, TestEntity } from './abstract.mock';
import { PGDataSource } from '../connection/dataSource';
import { TenantInvalidError } from '../error/schema.error';
import { PGDataSourceConnection } from '../connection/connection';
import { ulid } from 'ulid';

describe('AbstractEntityOffsetPaginationRepository', () => {
    let mockRepository: MockOffsetRepository;
    let testRowList: TestEntity[];

    beforeEach(async () => {
        globalThis.env = DefaultConfig;
        const fakeDB = FakeDatabase.createInstance();
        const tenantId = PGDataSourceConnection.getInstance().DefaultTenantId;

        jest.spyOn(PGDataSource.prototype as any, 'initDataSource').mockImplementation(async (schema: unknown) => {
            if (typeof schema !== 'string') {
                throw new TenantInvalidError();
            }

            return await fakeDB.createDataSource(schema, [TestEntity]);
        });

        mockRepository = new MockOffsetRepository({ tenantId });
        await mockRepository.initialize();

        testRowList = Array(100)
            .fill({})
            .map(() => ({
                id: ulid(),
                name: randomBytes(20).toString('hex'),
            }));
        await mockRepository.createMany(testRowList);
    });

    describe('offset pagination', () => {
        it('pagination test', async () => {
            const d1 = await mockRepository.getPagination({
                page: 1,
                limit: 10,
            });

            const d1IdList = d1.itemList.map((v) => v.id);

            expect(Array.isArray(d1.itemList)).toEqual(true);
            expect(d1.itemList.length).toEqual(10);

            const d2 = await mockRepository.getPagination({ limit: 10, page: 2 });
            const d1IdInd2 = d2.itemList.find((v) => d1IdList.includes(v.id));

            expect(d1IdInd2).toBeUndefined();
            expect(d2.itemList.length).toEqual(10);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

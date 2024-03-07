import { DefaultConfig } from '@root/common/type/config.type';
import { randomBytes } from 'crypto';
import { FakeDatabase } from '../connection/fakeDatabase.mock';
import { MockCursorRepository, TestEntity } from './abstract.mock';
import { PGDataSource } from '../connection/dataSource';
import { TenantInvalidError } from '../error/schema.error';
import { PGDataSourceConnection } from '../connection/connection';
import { ulid } from 'ulid';

describe('AbstractEntityCursorPaginationRepository', () => {
    let mockRepository: MockCursorRepository;
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

        mockRepository = new MockCursorRepository({ tenantId, paginationKeyList: ['id'] });
        await mockRepository.initialize();

        testRowList = Array(100)
            .fill({})
            .map(() => ({
                id: ulid(),
                name: randomBytes(20).toString('hex'),
            }));
        await mockRepository.createMany(testRowList);
    });

    describe('cursor pagination', () => {
        it('asc test', async () => {
            const d1 = await mockRepository.getPagination({ limit: 10 });
            const d1IdList = d1.itemList.map((v) => v.id);

            expect(Array.isArray(d1.itemList)).toEqual(true);
            expect(d1.itemList.length).toEqual(10);

            const d2 = await mockRepository.getPagination({ limit: 5, afterCursor: d1.cursor.afterCursor });
            const d2IdList = d2.itemList.map((v) => v.id);
            const d1IdInd2 = d2.itemList.find((v) => d1IdList.includes(v.id));

            expect(d1IdInd2).toBeUndefined();
            expect(d2.itemList.length).toEqual(5);

            expect(isAscSorted(d1IdList)).toEqual(true);
            expect(isAscSorted(d2IdList)).toEqual(true);
        });

        it('desc test', async () => {
            const d1 = await mockRepository.getPagination({ limit: 10, order: 'DESC' });
            const d1IdList = d1.itemList.map((v) => v.id);

            expect(Array.isArray(d1.itemList)).toEqual(true);
            expect(d1.itemList.length).toEqual(10);

            const d2 = await mockRepository.getPagination({
                limit: 5,
                afterCursor: d1.cursor.afterCursor,
                order: 'DESC',
            });
            const d2IdList = d2.itemList.map((v) => v.id);
            const d1IdInd2 = d2.itemList.find((v) => d1IdList.includes(v.id));

            expect(d1IdInd2).toBeUndefined();
            expect(d2.itemList.length).toEqual(5);

            expect(isDescSorted(d1IdList)).toEqual(true);
            expect(isDescSorted(d2IdList)).toEqual(true);
        });

        it('before cursor test', async () => {
            const d1 = await mockRepository.getPagination({ limit: 10 });
            const d1IdList = d1.itemList.map((v) => v.id);

            const d2 = await mockRepository.getPagination({ limit: 5, afterCursor: d1.cursor.afterCursor });
            const d3 = await mockRepository.getPagination({ limit: 10, beforeCursor: d2.cursor.beforeCursor });
            const d3IdList = d3.itemList.map((v) => v.id);

            expect(d1IdList).toEqual(expect.arrayContaining(d3IdList));
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

function isAscSorted(arr: string[]) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }

    return true;
}

function isDescSorted(arr: string[]) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }

    return true;
}

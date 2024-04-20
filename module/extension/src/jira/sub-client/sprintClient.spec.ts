import { DefaultConfig } from '@root/common/type/config.type';
import { SprintClient } from './sprintClient';
import { initLogger } from '@root/log/init';
import { Request } from '@root/common/util/request';
jest.mock('@root/common/util/request');

describe('sprintClient', () => {
    let client: SprintClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        initLogger('test', 'test');
        client = new SprintClient({
            host: 'localhost',
            protocol: 'http',
            port: '9000',
            username: 'test',
            passwd: 'api-token',
            apiVersion: '2',
        });
    });

    describe('actual test(with environment configuration)', () => {
        //위에서 jest.mock('@root/common/util/request'); 지우고 돌리기
        test('list', async () => {
            const sprintList = await client.listForBoard('1');
            expect(sprintList).toStrictEqual([]);
        });
    });

    describe('mock test', () => {
        test('list', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                maxResults: 50,
                startAt: 0,
                isLast: true,
                values: [
                    {
                        id: 1,
                        self: 'http://localhost:9000/rest/agile/1.0/sprint/1',
                        state: 'active',
                        name: 'test_boa 1 스프린트',
                        startDate: '2023-08-14T08:15:00.000Z',
                        endDate: '2023-08-28T08:15:00.000Z',
                        activatedDate: '2023-08-14T08:15:25.574Z',
                        originBoardId: 1,
                        goal: '',
                    },
                ],
            });
            const sprintList = await client.listForBoard('1');
            expect(sprintList).toStrictEqual([
                {
                    id: 1,
                    self: 'http://localhost:9000/rest/agile/1.0/sprint/1',
                    state: 'active',
                    name: 'test_boa 1 스프린트',
                    startDate: '2023-08-14T08:15:00.000Z',
                    endDate: '2023-08-28T08:15:00.000Z',
                    activatedDate: '2023-08-14T08:15:25.574Z',
                    originBoardId: 1,
                    goal: '',
                },
            ]);
        });
    });
});

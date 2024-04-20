import { DefaultConfig } from '@root/common/type/config.type';
import { BoardClient } from './boardClient';
import { Request } from '@root/common/util/request';
jest.mock('@root/common/util/request');

describe('boardClient', () => {
    let client: BoardClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        client = new BoardClient({
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
            const boardList = await client.list();
            expect(boardList).toStrictEqual([]);
        });
    });

    describe('mock test', () => {
        test('list', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                values: [
                    { id: 1, self: 'http://localhost:9000/rest/agile/1.0/board/1', name: 'test_board', type: 'scrum' },
                ],
            });
            const boardList = await client.list();
            expect(boardList).toStrictEqual([
                { id: 1, self: 'http://localhost:9000/rest/agile/1.0/board/1', name: 'test_board', type: 'scrum' },
            ]);
        });
    });
});

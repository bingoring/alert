import { DefaultConfig } from '@root/common/type/config.type';
import { JiraClient } from './jiraClient';
import { Request } from '@root/common/util/request';

describe('jiraClient', () => {
    let client: JiraClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        client = new JiraClient({
            host: 'localhost',
            protocol: 'http',
            port: '9000',
            username: 'test',
            passwd: 'api-token',
            apiVersion: '2',
        });
    });

    test('board list', async () => {
        jest.spyOn(Request.prototype, 'send').mockResolvedValue({
            values: [{ id: 1, self: 'http://localhost:9000/rest/agile/1.0/jira/1', name: 'test_jira', type: 'scrum' }],
        });
        const boardList = await client.board.list();
        expect(boardList).toStrictEqual([
            { id: 1, self: 'http://localhost:9000/rest/agile/1.0/jira/1', name: 'test_jira', type: 'scrum' },
        ]);
    });
});

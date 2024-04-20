import { DefaultConfig } from '@root/common/type/config.type';
import { IssueClient } from './issueClient';
import {
    IssueFieldsType,
    JiraContent,
    JiraContentTextData,
    JiraDescription,
} from '@root/extension/type/jira/issue.type';
import { initLogger } from '@root/log/init';
import { Request } from '@root/common/util/request';
import { mockIssueList, mockProjectIssueType } from './issueClient.mock';
jest.mock('@root/common/util/request');

describe('issueClient', () => {
    let client: IssueClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        initLogger('test', 'test');
        client = new IssueClient({
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
        test('listForBoard', async () => {
            const issueList = await client.listForBoard('1');
            expect(issueList).toStrictEqual([]);
        });

        test('listForProject', async () => {
            const issueList = await client.listForProject('10000');
            expect(issueList).toStrictEqual([]);
        });

        test('listIssueType', async () => {
            const projectList = await client.listIssueType(['10000']);
            expect(projectList).toStrictEqual([]);
        });

        test('create issue', async () => {
            const content = new JiraContent('paragraph');
            content.content.push(
                new JiraContentTextData('* *Severity*\r\n ** High\r\n * *Policy Description*\r\n ** Lorem ~')
            );

            const description = new JiraDescription([content]);
            const newIssueFields = new IssueFieldsType({
                summary: 'create issue',
                labelList: ['Severity:High'],
                projectId: '10000',
                issueTypeId: '10003',
                reporter: 'amelia.lim',
                description,
            });
            const issueList = await client.create(newIssueFields);
            expect(issueList).toStrictEqual([undefined]);
        });

        test('get issue', async () => {
            const issue = await client.getIssue('10001');
            expect(issue).toStrictEqual(undefined);
        });
    });

    describe('mock test', () => {
        test('listForBoard', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                expand: 'schema, names',
                startAt: 0,
                maxResults: 50,
                total: 1,
                issues: mockIssueList,
            });
            const issueList = await client.listForBoard('1');
            expect(issueList).toStrictEqual(mockIssueList);
        });

        test('listForProject', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                expand: 'schema, names',
                startAt: 0,
                maxResults: 50,
                total: 1,
                issues: mockIssueList,
            });
            const issueList = await client.listForProject('10000');
            expect(issueList).toStrictEqual(mockIssueList);
        });

        test('listIssueType', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                projects: [mockProjectIssueType],
            });
            const projectList = await client.listIssueType(['10000']);
            expect(projectList).toStrictEqual([mockProjectIssueType]);
        });

        test('create issue', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                id: '10001',
                key: 'TEST-2',
                self: 'http://localhost:9000/rest/api/2/issue/10001',
            });
            const content = new JiraContent('paragraph');
            content.content.push(
                new JiraContentTextData('* *Severity*\r\n ** High\r\n * *Policy Description*\r\n ** Lorem ~')
            );
            const description = new JiraDescription([content]);
            const newIssueFields = new IssueFieldsType({
                summary: 'create issue',
                labelList: ['Severity:High'],
                projectId: '10000',
                issueTypeId: '10003',
                reporter: 'test',
                description,
            });
            const issueList = await client.create(newIssueFields);
            expect(issueList).toStrictEqual([
                { id: '10001', key: 'TEST-2', self: 'http://localhost:9000/rest/api/2/issue/10001' },
            ]);
        });

        test('get issue', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                ...mockIssueList[0],
                renderedFields: {
                    created: '7분 전',
                    updated: '7분 전',
                    description:
                        '<ul>\n' +
                        '\t<li><b>Severity</b>\n' +
                        '\t<ul>\n' +
                        '\t\t<li>High</li>\n' +
                        '\t</ul>\n' +
                        '\t</li>\n' +
                        '\t<li><b>Policy Description</b>\n' +
                        '\t<ul>\n' +
                        '\t\t<li>Lorem ~</li>\n' +
                        '\t</ul>\n' +
                        '\t</li>\n' +
                        '</ul>\n',
                    timetracking: {},
                    attachment: [],
                    environment: '',
                    comment: { comments: [], maxResults: 0, total: 0, startAt: 0 },
                    worklog: { startAt: 0, maxResults: 20, total: 0, worklogs: [] },
                },
            });
            const issue = await client.getIssue('10001');
            expect(issue).toStrictEqual({
                ...mockIssueList[0],
                renderedFields: {
                    created: '7분 전',
                    updated: '7분 전',
                    description:
                        '<ul>\n' +
                        '\t<li><b>Severity</b>\n' +
                        '\t<ul>\n' +
                        '\t\t<li>High</li>\n' +
                        '\t</ul>\n' +
                        '\t</li>\n' +
                        '\t<li><b>Policy Description</b>\n' +
                        '\t<ul>\n' +
                        '\t\t<li>Lorem ~</li>\n' +
                        '\t</ul>\n' +
                        '\t</li>\n' +
                        '</ul>\n',
                    timetracking: {},
                    attachment: [],
                    environment: '',
                    comment: { comments: [], maxResults: 0, total: 0, startAt: 0 },
                    worklog: { startAt: 0, maxResults: 20, total: 0, worklogs: [] },
                },
            });
        });
    });
});

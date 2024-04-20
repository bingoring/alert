import { DefaultConfig } from '@root/common/type/config.type';
import { ProjectClient } from './projectClient';
import { Request } from '@root/common/util/request';
import { mockIssueTypeWithStatusList, mockProject } from './projectClient.mock';
import { initLogger } from '@root/log/init';
jest.mock('@root/common/util/request');

describe('projectClient', () => {
    let client: ProjectClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        initLogger('test', 'test');
        client = new ProjectClient({
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
            const projectList = await client.list();
            expect(projectList).toStrictEqual([]);
        });

        test('get', async () => {
            const project = await client.get('10000');
            expect(project).toStrictEqual(undefined);
        });

        test('listStatus', async () => {
            const statusList = await client.listStatus('10000');
            expect(statusList).toStrictEqual([]);
        });
    });

    describe('mock test', () => {
        test('list', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue([
                {
                    expand: 'description,lead,url,projectKeys',
                    self: 'http://localhost:9000/rest/api/2/project/10000',
                    id: '10000',
                    key: 'TEST',
                    name: 'test',
                    avatarUrls: {
                        '48x48': 'http://localhost:9000/secure/projectavatar?avatarId=10324',
                        '24x24': 'http://localhost:9000/secure/projectavatar?size=small&avatarId=10324',
                        '16x16': 'http://localhost:9000/secure/projectavatar?size=xsmall&avatarId=10324',
                        '32x32': 'http://localhost:9000/secure/projectavatar?size=medium&avatarId=10324',
                    },
                    projectTypeKey: 'business',
                    archived: false,
                },
            ]);
            const projectList = await client.list();
            expect(projectList).toStrictEqual([
                {
                    expand: 'description,lead,url,projectKeys',
                    self: 'http://localhost:9000/rest/api/2/project/10000',
                    id: '10000',
                    key: 'TEST',
                    name: 'test',
                    avatarUrls: {
                        '48x48': 'http://localhost:9000/secure/projectavatar?avatarId=10324',
                        '24x24': 'http://localhost:9000/secure/projectavatar?size=small&avatarId=10324',
                        '16x16': 'http://localhost:9000/secure/projectavatar?size=xsmall&avatarId=10324',
                        '32x32': 'http://localhost:9000/secure/projectavatar?size=medium&avatarId=10324',
                    },
                    projectTypeKey: 'business',
                    archived: false,
                },
            ]);
        });

        test('get', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue(mockProject);
            const project = await client.get('10000');
            expect(project).toStrictEqual(mockProject);
        });

        test('listStatus', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue(mockIssueTypeWithStatusList);
            const statusList = await client.listStatus('10000');
            expect(statusList).toStrictEqual(mockIssueTypeWithStatusList);
        });
    });
});

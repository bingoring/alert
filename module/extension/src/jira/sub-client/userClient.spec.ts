import { DefaultConfig } from '@root/common/type/config.type';
import { UserClient } from './userClient';
import { initLogger } from '@root/log/init';
import { Request } from '@root/common/util/request';
jest.mock('@root/common/util/request');

describe('userClient', () => {
    let client: UserClient;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeAll(async () => {
        globalThis.env = { ...DefaultConfig };
        initLogger('test', 'test');
        client = new UserClient({
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
            const userList = await client.list();
            expect(userList).toStrictEqual([]);
        });

        test('list For Project', async () => {
            const userList = await client.listForProject('TEST');
            expect(userList).toStrictEqual([]);
        });

        test('myself', async () => {
            const user = await client.myself();
            expect(user).toStrictEqual(undefined);
        });

        test('get', async () => {
            const user = await client.get('admin');
            expect(user).toStrictEqual(undefined);
        });
    });

    describe('mock test', () => {
        test('list', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue([
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=admin',
                    key: 'JIRAUSER10000',
                    name: 'admin',
                    emailAddress: 'admin@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                    },
                    displayName: 'admin@test.com',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'ko_KR',
                },
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=test',
                    key: 'JIRAUSER10001',
                    name: 'test',
                    emailAddress: 'test@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=32',
                    },
                    displayName: 'test',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'en_US',
                },
            ]);
            const userList = await client.list();
            expect(userList).toStrictEqual([
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=admin',
                    key: 'JIRAUSER10000',
                    name: 'admin',
                    emailAddress: 'admin@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                    },
                    displayName: 'admin@test.com',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'ko_KR',
                },
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=test',
                    key: 'JIRAUSER10001',
                    name: 'test',
                    emailAddress: 'test@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=32',
                    },
                    displayName: 'test',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'en_US',
                },
            ]);
        });

        test('list For Project', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue([
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=test',
                    key: 'JIRAUSER10001',
                    name: 'test',
                    emailAddress: 'test@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=32',
                    },
                    displayName: 'test',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'en_US',
                },
            ]);
            const userList = await client.listForProject('TEST');
            expect(userList).toStrictEqual([
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=test',
                    key: 'JIRAUSER10001',
                    name: 'test',
                    emailAddress: 'test@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/3dc1f9d14803cd348286965cd68d97cf?d=mm&s=32',
                    },
                    displayName: 'test',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'en_US',
                },
            ]);
        });

        test('myself', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue({
                self: 'http://localhost:9000/rest/api/2/user?username=test',
                key: 'JIRAUSER10001',
                name: 'test',
                emailAddress: 'test@test.com',
                avatarUrls: {
                    '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                    '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                    '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                    '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                },
                displayName: 'test@test.com',
                active: true,
                deleted: false,
                timeZone: 'Etc/UTC',
                locale: 'en_US',
                groups: { size: 2, items: [] },
                applicationRoles: { size: 1, items: [] },
                expand: 'groups,applicationRoles',
            });
            const user = await client.myself();
            expect(user).toStrictEqual({
                self: 'http://localhost:9000/rest/api/2/user?username=test',
                key: 'JIRAUSER10001',
                name: 'test',
                emailAddress: 'test@test.com',
                avatarUrls: {
                    '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                    '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                    '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                    '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                },
                displayName: 'test@test.com',
                active: true,
                deleted: false,
                timeZone: 'Etc/UTC',
                locale: 'en_US',
                groups: { size: 2, items: [] },
                applicationRoles: { size: 1, items: [] },
                expand: 'groups,applicationRoles',
            });
        });

        test('get', async () => {
            jest.spyOn(Request.prototype, 'send').mockResolvedValue([
                {
                    self: 'http://localhost:9000/rest/api/2/user?username=admin',
                    key: 'JIRAUSER10000',
                    name: 'admin',
                    emailAddress: 'admin@test.com',
                    avatarUrls: {
                        '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                        '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                        '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                        '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                    },
                    displayName: 'admin@test.com',
                    active: true,
                    deleted: false,
                    timeZone: 'Etc/UTC',
                    locale: 'ko_KR',
                    groups: { size: 2, items: [] },
                    applicationRoles: { size: 1, items: [] },
                    expand: 'groups,applicationRoles',
                },
            ]);
            const user = await client.get('admin');
            expect(user).toStrictEqual({
                self: 'http://localhost:9000/rest/api/2/user?username=admin',
                key: 'JIRAUSER10000',
                name: 'admin',
                emailAddress: 'admin@test.com',
                avatarUrls: {
                    '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
                    '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
                    '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
                    '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
                },
                displayName: 'admin@test.com',
                active: true,
                deleted: false,
                timeZone: 'Etc/UTC',
                locale: 'ko_KR',
                groups: { size: 2, items: [] },
                applicationRoles: { size: 1, items: [] },
                expand: 'groups,applicationRoles',
            });
        });
    });
});

import { IssueTypeWithStatusType } from '@root/extension/type/jira/project.type';

export const mockIssueTypeWithStatusList: IssueTypeWithStatusType[] = [
    {
        self: 'http://localhost:9000/rest/api/2/issuetype/10003',
        id: '10003',
        name: 'Task',
        subtask: false,
        statuses: [
            {
                self: 'http://localhost:9000/rest/api/2/status/10000',
                description: '',
                iconUrl: 'http://localhost:9000/images/icons/status_generic.gif',
                name: '할 일',
                id: '10000',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/2',
                    id: 2,
                    key: 'new',
                    colorName: 'blue-gray',
                    name: '할 일',
                },
            },
            {
                self: 'http://localhost:9000/rest/api/2/status/3',
                description: '현재 담당자가 이 이슈를 처리하고 있습니다.',
                iconUrl: 'http://localhost:9000/images/icons/statuses/inprogress.png',
                name: '진행 중',
                id: '3',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/4',
                    id: 4,
                    key: 'indeterminate',
                    colorName: 'yellow',
                    name: '진행 중',
                },
            },
            {
                self: 'http://localhost:9000/rest/api/2/status/10001',
                description: '',
                iconUrl: 'http://localhost:9000/images/icons/status_generic.gif',
                name: '완료',
                id: '10001',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: '완료',
                },
            },
        ],
    },
    {
        self: 'http://localhost:9000/rest/api/2/issuetype/10000',
        id: '10000',
        name: 'Sub-task',
        subtask: true,
        statuses: [
            {
                self: 'http://localhost:9000/rest/api/2/status/10000',
                description: '',
                iconUrl: 'http://localhost:9000/images/icons/status_generic.gif',
                name: '할 일',
                id: '10000',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/2',
                    id: 2,
                    key: 'new',
                    colorName: 'blue-gray',
                    name: '할 일',
                },
            },
            {
                self: 'http://localhost:9000/rest/api/2/status/3',
                description: '현재 담당자가 이 이슈를 처리하고 있습니다.',
                iconUrl: 'http://localhost:9000/images/icons/statuses/inprogress.png',
                name: '진행 중',
                id: '3',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/4',
                    id: 4,
                    key: 'indeterminate',
                    colorName: 'yellow',
                    name: '진행 중',
                },
            },
            {
                self: 'http://localhost:9000/rest/api/2/status/10001',
                description: '',
                iconUrl: 'http://localhost:9000/images/icons/status_generic.gif',
                name: '완료',
                id: '10001',
                statusCategory: {
                    self: 'http://localhost:9000/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: '완료',
                },
            },
        ],
    },
];

export const mockProject = {
    expand: 'description,lead,url,projectKeys',
    self: 'http://localhost:9000/rest/api/2/project/10000',
    id: '10000',
    key: 'TEST',
    description:
        '<h3>Welcome to the administration of your demonstration project!</h3>\n' +
        ' <p>This is where you can view and change how the project is configured. Use the tabs on the left to navigate to different project settings.</p>',
    lead: {
        self: 'http://localhost:9000/rest/api/2/user?username=amelia.lim',
        key: 'JIRAUSER10000',
        name: 'amelia.lim',
        avatarUrls: {
            '48x48': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=48',
            '24x24': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=24',
            '16x16': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=16',
            '32x32': 'https://www.gravatar.com/avatar/71c6ca59a8ac804b21599b0814b40fc4?d=mm&s=32',
        },
        displayName: 'amelia.lim@tatumsecurity.com',
        active: true,
    },
    components: [],
    issueTypes: [
        {
            self: 'http://localhost:9000/rest/api/2/issuetype/10003',
            id: '10003',
            description: '해야할 일',
            iconUrl: 'http://localhost:9000/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
            name: '작업',
            subtask: false,
            avatarId: 10318,
        },
        {
            self: 'http://localhost:9000/rest/api/2/issuetype/10000',
            id: '10000',
            description: '이슈의 하위작업입니다.',
            iconUrl: 'http://localhost:9000/images/icons/issuetypes/subtask_alternate.png',
            name: '하위 작업',
            subtask: true,
        },
    ],
    assigneeType: 'UNASSIGNED',
    versions: [],
    name: 'test',
    roles: {
        Developers: 'http://localhost:9000/rest/api/2/project/10000/role/10100',
        Administrators: 'http://localhost:9000/rest/api/2/project/10000/role/10002',
    },
    avatarUrls: {
        '48x48': 'http://localhost:9000/secure/projectavatar?avatarId=10324',
        '24x24': 'http://localhost:9000/secure/projectavatar?size=small&avatarId=10324',
        '16x16': 'http://localhost:9000/secure/projectavatar?size=xsmall&avatarId=10324',
        '32x32': 'http://localhost:9000/secure/projectavatar?size=medium&avatarId=10324',
    },
    projectTypeKey: 'business',
    archived: false,
};

import { JiraUserType } from './user.type';

export interface ProjectType {
    self: string;
    id: string;
    key: string;
    name: string;
    expand?: string;
    archived?: boolean;
    projectTypeKey?: string;
    lead?: JiraUserType;
    simplified?: boolean;
    avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
    };
    style?: string;
    isPrivate?: boolean;
    properties?: Record<string, any>;
    entityId?: string;
    uuid?: string;
}

export interface IssueTypeWithStatusType {
    self: string;
    id: string;
    name: string;
    subtask: boolean;
    statuses: StatusType[];
}

export interface StatusType {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    untranslatedName?: string;
    statusCategory?: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
    };
    scope?: {
        type: string;
        project: {
            id: string;
        };
    };
}

import { JiraUserType } from './user.type';

export interface BoardType {
    id: number;
    self: string;
    name: string;
    view: string;
    description?: string;
    type?: string;
    owner?: JiraUserType;
    popularity?: number;
    location?: {
        projectId: number;
        displayName?: string;
        projectName?: string;
        projectKey?: string;
        projectTypeKey?: string;
        avatarURI?: string;
        name?: string;
    };
}

export interface ListBoardsOptionType {
    name?: string;
    projectId?: string;
}

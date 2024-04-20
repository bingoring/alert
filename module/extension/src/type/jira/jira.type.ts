export interface JiraClientConstructorType {
    username: string;
    passwd: string;
    protocol?: string;
    host: string;
    port?: string;
    apiVersion: string;
}

export interface JiraBaseResponseType {
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
}

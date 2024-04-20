export interface JiraUserType {
    self: string;
    key?: string;
    name?: string;
    accountId?: string;
    accountType?: string;
    avatarUrls: {
        '16x16': string;
        '24x24': string;
        '32x32': string;
        '48x48': string;
    };
    displayName: string;
    active: boolean;
    locale?: string;
    timeZone?: string;
}

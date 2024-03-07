import { ValueOfType } from '@root/common/type/utility.type';

export const defaultUser = {
    tenantId: 'public',
    loginId: 'SYSTEM',
    userId: '',
};

export const defaultToken = {
    tenantId: 'public',
    loginId: 'SYSTEM',
};

export const LogLevelMap = {
    error: 'error',
    info: 'info',
    debug: 'debug',
    access: 'access',
} as const;
export const LogLevelList = Object.values(LogLevelMap);
export type LogLevelType = ValueOfType<typeof LogLevelMap>;

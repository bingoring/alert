import { LogLevelType } from '@root/log/type';
export const LogLevelNumberList = [0, 2, 4, 5] as const;
export type LogLevelNumberListType = (typeof LogLevelNumberList)[number];
export const LogLevelToNumberMap: Record<LogLevelType, LogLevelNumberListType> = {
    error: 0,
    info: 2,
    access: 4,
    debug: 5,
};

export const NumberToLogLevelMap: Record<LogLevelNumberListType, LogLevelType> = {
    0: 'error',
    2: 'info',
    4: 'access',
    5: 'debug',
};

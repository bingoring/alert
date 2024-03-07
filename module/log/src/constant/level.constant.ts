import { LogLevelType } from '../type';

export const LogLevelNumberList = [0, 2, 5] as const;
export type LogLevelNumberListType = (typeof LogLevelNumberList)[number];
export const LogLevelToNumberMap: Record<LogLevelType, LogLevelNumberListType> = {
    error: 0,
    info: 2,
    debug: 5,
};

export const NumberToLogLevelMap: Record<LogLevelNumberListType, LogLevelType> = {
    0: 'error',
    2: 'info',
    5: 'debug',
};

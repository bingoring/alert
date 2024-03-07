import { ValueOfType } from '@root/common/type/utility.type';

export const ServerNameMap = {
    user: 'user',
    schedule: 'schedule',
} as const;

export const ServerNameList = Object.values(ServerNameMap);
export type ServerNameType = ValueOfType<typeof ServerNameMap>;

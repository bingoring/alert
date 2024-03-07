import { ValueOfType } from '../type/utility.type';

export const PermissionStateMap = {
    notUsed: 'NOT_USED',
    overPermission: 'OVER_PERMISSION',
    used: 'USED',
} as const;
export const PermissionStateList = Object.values(PermissionStateMap);
export type PermissionStateType = ValueOfType<typeof PermissionStateMap>;

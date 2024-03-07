export const PolicyVersionMap = {
    none: '-1',
    v1: '1',
} as const;
export const PolicyVersionList = Object.values(PolicyVersionMap);
export type PolicyVersionType = (typeof PolicyVersionList)[number];

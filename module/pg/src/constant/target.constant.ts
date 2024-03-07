import { v4 } from 'uuid';

export const TargetIdMap = {
    cloud: '0',
    cloudOrganization: '1',
    agent: '2',
    agentSubject: '3',
} as const;

export const TargetIdList = Object.values(TargetIdMap);
export type TargetIdKeyType = keyof typeof TargetIdMap;
export type TargetIdType = (typeof TargetIdList)[number];

export const TargetTypeMap = {
    cloud: 'CLOUD',
    cloudOrganization: 'CLOUD_ORGANIZATION',
    agent: 'AGENT',
    agentSubject: 'AGENT_SUBJECT',
} as const;

export const TargetTypeList = Object.values(TargetTypeMap);
export type TargetTypeType = (typeof TargetTypeList)[number];

export function generateTargetId(target: TargetIdKeyType) {
    const id = v4();
    return TargetIdMap[target] + id.slice(1);
}

export function getTargetType(targetId?: string) {
    if (targetId === undefined) {
        return undefined;
    }
    const key = +targetId[0];
    return TargetTypeList[key];
}

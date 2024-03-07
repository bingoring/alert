import { InvalidRoleArnException } from '@root/common/error/error';

export function extractRoleName(roleArn: string) {
    const roleNameList = /(?<=:role\/).*/.exec(roleArn);
    if (roleNameList === null || roleNameList[0] === undefined) {
        throw new InvalidRoleArnException(roleArn);
    }
    return roleNameList[0];
}

export function extractAccountId(roleArn: string) {
    const accountIdList = /(?<=::).*(?=:)/.exec(roleArn);
    if (accountIdList === null || accountIdList[0] === undefined) {
        throw new InvalidRoleArnException(roleArn);
    }
    return accountIdList[0];
}

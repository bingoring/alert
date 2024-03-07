import type { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TargetTypeMap, TargetTypeType } from '@backend-x/pg/constant/target.constant';
import axios from 'axios';

export const TargetId = createParamDecorator(async (data: TargetTypeType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const userId = request.session.id;

    if (data === TargetTypeMap.cloud) {
        return await getCloudIdList(userId);
    }

    if (data === TargetTypeMap.agent) {
        return await getAgentIdList(userId);
    }

    if (data === TargetTypeMap.cloudOrganization) {
        return await getCloudOrganizationIdList(userId);
    }

    return [];
});

async function getCloudIdList(userId: string) {
    const result = await axios.get(`${env.user.url}/v1/projects/cloud-ids`, {
        headers: { 'X-USER-ID': userId },
    });

    return (result.data?.value ?? []) as string[];
}

async function getCloudOrganizationIdList(userId: string) {
    const result = await axios.get(`${env.user.url}/v1/projects/cloud-organization-ids`, {
        headers: { 'X-USER-ID': userId },
    });

    return (result.data?.value ?? []) as string[];
}

async function getAgentIdList(userId: string) {
    const result = await axios.get(`${env.user.url}/v1/projects/agent-ids`, {
        headers: { 'X-USER-ID': userId },
    });

    return (result.data?.value ?? []) as string[];
}

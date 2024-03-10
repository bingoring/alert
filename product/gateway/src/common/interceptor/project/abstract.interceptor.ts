import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import {
    ProjectGetResponseType,
    ProjectGetResponseValueItemType,
} from '@root/gateway/router/project/type/project.type';
import { v4 } from 'uuid';

export abstract class AbstractProjectInterceptor implements NestInterceptor {
    public async intercept(context: ExecutionContext, next: CallHandler) {
        const request = this.getRequest(context);

        if (request.isAdmin) {
            return next.handle();
        }

        await this.updateQuery(request);

        return next.handle();
    }

    protected async getProjectList(request: Request) {
        const userId = request.session.user?.id;
        const activeRoleId = request.session.activeRole?.roleId;

        if (activeRoleId === undefined) {
            throw new Error('No such active role.');
        }

        try {
            const projectResponse = await axios.get(`${env.user.url}/v1/projects?roleId=${activeRoleId}&size=200`, {
                headers: {
                    'X-USER-ID': userId,
                },
            });

            const data = projectResponse.data as ProjectGetResponseType;
            return data.value.itemList;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    protected getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest() as Request;
    }

    protected getCloudIdList(projectList: ProjectGetResponseValueItemType[]) {
        const cloudIdList = projectList.map((v) => (v.cloudList ?? []).map((o) => o.id)).flat();
        return Array.from(new Set(cloudIdList));
    }

    protected getAgentIdList(projectList: ProjectGetResponseValueItemType[]) {
        const cloudIdList = projectList.map((v) => (v.agentList ?? []).map((o) => o.id)).flat();
        return Array.from(new Set(cloudIdList));
    }

    protected getCloudOrganizationIdList(projectList: ProjectGetResponseValueItemType[]) {
        const cloudIdList = projectList.map((v) => (v.organizationList ?? []).map((o) => o.id)).flat();
        return Array.from(new Set(cloudIdList));
    }

    protected getTargetIdList(projectList: ProjectGetResponseValueItemType[]) {
        return [
            this.getAgentIdList(projectList),
            this.getCloudIdList(projectList),
            this.getCloudOrganizationIdList(projectList),
        ].flat();
    }

    protected convertQueryId(queryId: unknown) {
        if (typeof queryId !== 'string') {
            return undefined;
        }

        return queryId.split(',');
    }

    protected filterAllowIdList(queryIdList: string[], allowIdList: string[]) {
        const resultList = queryIdList.filter((v) => allowIdList.includes(v));

        if (resultList.length === 0) {
            return ['9' + v4().slice(1)];
        }

        return resultList;
    }

    protected getValue(request: Request, target: TargetType) {
        if (request.method.toUpperCase() === 'GET') {
            return request.query[`${target}Id`];
        } else {
            return request.body[`${target}Id`];
        }
    }

    protected setValue(request: Request, target: TargetType, value: string) {
        if (request.method.toUpperCase() === 'GET') {
            request.query[`${target}Id`] = value;
        } else {
            request.body[`${target}Id`] = value;
        }
    }

    protected abstract updateQuery(request: Request): Promise<void>;
}

type TargetType = 'cloud' | 'agent' | 'cloudOrganization' | 'target';

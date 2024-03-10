import { AbstractProjectInterceptor } from './abstract.interceptor';
import { Request } from 'express';

export class ProjectCloudOrganizationInterceptor extends AbstractProjectInterceptor {
    protected async updateQuery(request: Request) {
        const projectList = await this.getProjectList(request);
        const allowIdList = this.getCloudOrganizationIdList(projectList);
        if (allowIdList.length === 0) {
            return;
        }

        const value = this.getValue(request, 'cloudOrganization');
        const cloudOrganizationIdList = this.convertQueryId(value);

        if (cloudOrganizationIdList === undefined) {
            this.setValue(request, 'cloudOrganization', allowIdList.join());
        } else {
            const resultId = this.filterAllowIdList(cloudOrganizationIdList, allowIdList).join();
            this.setValue(request, 'cloudOrganization', resultId);
        }
    }
}

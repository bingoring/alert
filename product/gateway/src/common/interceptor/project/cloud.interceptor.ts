import { AbstractProjectInterceptor } from './abstract.interceptor';
import { Request } from 'express';

export class ProjectCloudInterceptor extends AbstractProjectInterceptor {
    protected async updateQuery(request: Request) {
        const projectList = await this.getProjectList(request);
        const allowIdList = this.getCloudIdList(projectList);
        if (allowIdList.length === 0) {
            return;
        }

        const value = this.getValue(request, 'cloud');
        const cloudIdList = this.convertQueryId(value);

        if (cloudIdList === undefined) {
            this.setValue(request, 'cloud', allowIdList.join());
        } else {
            const resultId = this.filterAllowIdList(cloudIdList, allowIdList).join();
            this.setValue(request, 'cloud', resultId);
        }
    }
}

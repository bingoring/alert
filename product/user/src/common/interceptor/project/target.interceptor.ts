import { AbstractProjectInterceptor } from './abstract.interceptor';
import { Request } from 'express';

export class ProjectTargetInterceptor extends AbstractProjectInterceptor {
    protected async updateQuery(request: Request) {
        const projectList = await this.getProjectList(request);
        const allowIdList = this.getTargetIdList(projectList);
        const value = this.getValue(request, 'target');
        const targetIdList = this.convertQueryId(value);

        if (projectList.length === 0) {
            return;
        }

        if (targetIdList === undefined) {
            this.setValue(request, 'target', allowIdList.join());
        } else {
            const resultId = this.filterAllowIdList(targetIdList, allowIdList).join();
            this.setValue(request, 'target', resultId);
        }
    }
}

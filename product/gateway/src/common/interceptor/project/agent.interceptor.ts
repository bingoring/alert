import { AbstractProjectInterceptor } from './abstract.interceptor';
import { Request } from 'express';

export class ProjectAgentInterceptor extends AbstractProjectInterceptor {
    protected async updateQuery(request: Request) {
        const projectList = await this.getProjectList(request);
        const allowIdList = this.getAgentIdList(projectList);
        if (allowIdList.length === 0) {
            return;
        }

        const value = this.getValue(request, 'agent');
        const agentIdList = this.convertQueryId(value);

        if (agentIdList === undefined) {
            this.setValue(request, 'agent', allowIdList.join());
        } else {
            const resultId = this.filterAllowIdList(agentIdList, allowIdList).join();
            this.setValue(request, 'agent', resultId);
        }
    }
}

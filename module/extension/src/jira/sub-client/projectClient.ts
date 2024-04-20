import { AbstractJiraSubClient } from '../jiraSubClient';
import { IssueTypeWithStatusType, ProjectType } from '@root/extension/type/jira/project.type';

export class ProjectClient extends AbstractJiraSubClient {
    public async list() {
        try {
            const response = await this.request(`${this.requestUrl}/project`, { method: 'get' });
            if (!Array.isArray(response)) {
                return [];
            }
            return response as ProjectType[];
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    public async get(projectId?: string) {
        try {
            if (projectId === undefined) {
                return undefined;
            }

            const project = await this.request(`${this.requestUrl}/project/${projectId}`, { method: 'get' });
            return project;
        } catch (e) {
            log.error(e);
            return undefined;
        }
    }

    public async listStatus(projectId?: string) {
        try {
            if (projectId === undefined) {
                return [];
            }
            const response = await this.request(`${this.requestUrl}/project/${projectId}/statuses`, { method: 'get' });
            if (!Array.isArray(response)) {
                return [];
            }
            return response as IssueTypeWithStatusType[];
        } catch (e) {
            log.error(e);
            return [];
        }
    }
}

import { JiraUserType } from '@root/extension/type/jira/user.type';
import { AbstractJiraSubClient } from '../jiraSubClient';

export class UserClient extends AbstractJiraSubClient {
    public async get(username?: string) {
        try {
            if (username === undefined) {
                return undefined;
            }
            const response = await this.request(`${this.requestUrl}/user/search?username=${username}`, {
                method: 'get',
            });
            return response[0] as JiraUserType;
        } catch (e) {
            log.error(e);
            return undefined;
        }
    }

    public async list() {
        try {
            const response = await this.request(
                `${this.requestUrl}/user/search?startAt=0&maxResults=1000&username=.+`,
                {
                    method: 'get',
                }
            );
            if (!Array.isArray(response)) {
                return [];
            }
            return response as JiraUserType[];
        } catch (e) {
            log.error(e);
            return [];
        }
    }
    public async listForProject(projectKey?: string) {
        try {
            if (projectKey === undefined) {
                return [];
            }
            const response = await this.request(
                `${this.requestUrl}/user/assignable/search?project=${projectKey}&startAt=0&maxResults=1000`,
                {
                    method: 'get',
                }
            );
            if (!Array.isArray(response)) {
                return [];
            }
            return response as JiraUserType[];
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    public async myself() {
        const myself = await this.request(`${this.requestUrl}/myself`, { method: 'get' });
        return myself as JiraUserType;
    }
}

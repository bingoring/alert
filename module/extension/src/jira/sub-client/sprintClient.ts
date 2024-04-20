import { SprintType } from '@root/extension/type/jira/sprint.type';
import { AbstractJiraSubClient } from '../jiraSubClient';

export class SprintClient extends AbstractJiraSubClient {
    public async listForBoard(boardId?: string) {
        if (boardId === undefined) {
            return [];
        }
        try {
            const response = await this.request(`${this.agileUrl}/board/${boardId}/sprint`, { method: 'get' });
            const sprintList: SprintType[] = response?.values ?? [];
            return sprintList;
        } catch (e) {
            log.error(e);
            return [];
        }
    }
}

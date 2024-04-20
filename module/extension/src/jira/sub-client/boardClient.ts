import { AbstractJiraSubClient } from '../jiraSubClient';
import { BoardType } from '@root/extension/type/jira/board.type';

export class BoardClient extends AbstractJiraSubClient {
    public async list() {
        try {
            let next = `${this.agileUrl}/board`;
            const boardList: BoardType[] = [];

            do {
                const response = await this.request(next, { method: 'get' });
                const valueList = response?.values ?? [];
                if (valueList.length === 0) {
                    break;
                }

                boardList.push(...valueList);
                next = response.next;
            } while (next);

            return boardList;
        } catch (e) {
            log.error(e);
            return [];
        }
    }
}

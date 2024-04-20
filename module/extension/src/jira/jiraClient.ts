import { JiraClientConstructorType } from '@root/extension/type/jira/jira.type';
import { BoardClient } from './sub-client/boardClient';
import { IssueClient } from './sub-client/issueClient';
import { ProjectClient } from './sub-client/projectClient';
import { SprintClient } from './sub-client/sprintClient';
import { UserClient } from './sub-client/userClient';

export class JiraClient {
    public readonly board: BoardClient;
    public readonly issue: IssueClient;
    public readonly project: ProjectClient;
    public readonly sprint: SprintClient;
    public readonly user: UserClient;

    constructor(jiraClientConstructor: JiraClientConstructorType) {
        this.board = new BoardClient(jiraClientConstructor);
        this.issue = new IssueClient(jiraClientConstructor);
        this.project = new ProjectClient(jiraClientConstructor);
        this.sprint = new SprintClient(jiraClientConstructor);
        this.user = new UserClient(jiraClientConstructor);
    }
}

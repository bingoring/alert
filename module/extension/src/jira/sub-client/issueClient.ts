import { AbstractJiraSubClient } from '../jiraSubClient';
import {
    IssueFieldsType,
    IssueType,
    LegacyIssueFieldsType,
    ProjectIssueType,
} from '@root/extension/type/jira/issue.type';

export class IssueClient extends AbstractJiraSubClient {
    public async listForBoard(boardId?: string) {
        try {
            if (boardId === undefined) {
                return [];
            }
            let total = 0;
            let maxResults = 0;
            let startAt = 0;
            const issueList: IssueType[] = [];

            do {
                const response = await this.request(`${this.agileUrl}/board/${boardId}/issue`, {
                    params: { startAt },
                    method: 'get',
                });

                const valueList = response?.issues ?? [];
                if (valueList.length === 0) {
                    break;
                }
                issueList.push(...valueList);

                total = response.total;
                maxResults = response.maxResults;
                startAt = startAt + maxResults;
            } while (total === maxResults);

            return issueList;
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    public async listForProject(projectId?: string) {
        try {
            if (projectId === undefined) {
                return [];
            }
            let total = 0;
            let maxResults = 0;
            let startAt = 0;
            const issueList: IssueType[] = [];

            do {
                const response = await this.request(`${this.requestUrl}/search`, {
                    params: { jql: `project=${projectId}`, startAt },
                    method: 'get',
                });

                const valueList = response?.issues ?? [];
                if (valueList.length === 0) {
                    break;
                }
                issueList.push(...valueList);

                total = response.total;
                maxResults = response.maxResults;
                startAt = startAt + maxResults;
            } while (total === maxResults);

            return issueList;
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    public async listIssueType(projectIdList?: string[]): Promise<ProjectIssueType[]> {
        try {
            const response = await this.request(`${this.requestUrl}/issue/createmeta`, {
                method: 'get',
                params: {
                    projectIds: projectIdList ? projectIdList.join(',') : undefined,
                    expand: 'projects.issuetypes.fields',
                },
            });

            const projectWithIssueTypeList = response?.projects ?? [];
            return projectWithIssueTypeList;
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    public async create(issueFields: IssueFieldsType) {
        try {
            const fieldList = (() => {
                if (this.apiVersion === '2') {
                    const data = issueFields.getLegacyData();
                    return this.sliceLegacyIssue(data);
                }
                return [issueFields.getData()];
            })();

            const createIssueRequestList = fieldList.map((fields) =>
                this.request(`${this.requestUrl}/issue`, { method: 'post', data: { fields } })
            );
            const responseList = await Promise.all(createIssueRequestList);
            return responseList as {
                id: string;
                key: string;
                self: string;
            }[];
        } catch (e) {
            log.error(e);
            return [];
        }
    }

    private sliceLegacyIssue(fields: LegacyIssueFieldsType): LegacyIssueFieldsType[] {
        if (fields.description === undefined) {
            return [fields];
        }
        const slicedFieldList: LegacyIssueFieldsType[] = [];
        const seperator = '----';
        const maxDescriptionSize = 30000;

        let accumulatedDescriptionList: string[] = [];
        let accumulatedSize = 0;
        for (let description of fields.description.split(seperator)) {
            const descriptionSize = description.length;

            if (descriptionSize >= maxDescriptionSize) {
                if (accumulatedSize !== 0) {
                    slicedFieldList.push({
                        ...fields,
                        description: accumulatedDescriptionList.join(seperator),
                    });
                    accumulatedDescriptionList = [];
                    accumulatedSize = 0;
                }

                description = description.slice(0, maxDescriptionSize) + '...';
                if (description.includes('{code')) {
                    description += '{code}';
                }
                slicedFieldList.push({
                    ...fields,
                    description,
                });
            } else if (accumulatedSize + descriptionSize <= maxDescriptionSize) {
                accumulatedDescriptionList.push(description);
                accumulatedSize += descriptionSize;
            } else if (accumulatedSize + descriptionSize > maxDescriptionSize) {
                slicedFieldList.push({
                    ...fields,
                    description: accumulatedDescriptionList.join(seperator),
                });

                accumulatedDescriptionList = [description];
                accumulatedSize = descriptionSize;
            } else {
                console.log(accumulatedSize, descriptionSize);
            }
        }
        if (accumulatedSize !== 0) {
            slicedFieldList.push({
                ...fields,
                description: accumulatedDescriptionList.join(seperator),
            });
        }
        return slicedFieldList;
    }

    public async getIssue(issueId: string): Promise<IssueType> {
        const response = await this.request(`${this.requestUrl}/issue/${issueId}`, {
            method: 'get',
            params: { expand: 'renderedFields' },
        });
        return response as IssueType;
    }
}

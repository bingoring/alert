import JiraApi from 'jira-client';
import * as url from 'url';
import { JiraClientConstructorType } from '@root/extension/type/jira/jira.type';
import { OptionType } from '@root/common/type/request.type';
import { Request } from '@root/common/util/request';

export abstract class AbstractJiraSubClient {
    protected readonly client: JiraApi;
    protected readonly apiVersion: string;
    protected readonly requestUrl: any;
    protected readonly agileUrl: string;
    protected readonly passwd: string;
    protected readonly userName: string;

    constructor(jiraClientConstructor: JiraClientConstructorType) {
        this.apiVersion = jiraClientConstructor.apiVersion;
        this.userName = jiraClientConstructor.username;
        this.passwd = jiraClientConstructor.passwd;

        this.requestUrl = url.format({
            protocol: jiraClientConstructor.protocol ?? 'http',
            hostname: jiraClientConstructor.host,
            port: jiraClientConstructor.port ?? '8080',
            pathname: env.jiraInterMediaPath ?? `/rest/api/${this.apiVersion}`,
        });
        this.agileUrl = url.format({
            protocol: jiraClientConstructor.protocol ?? 'http',
            hostname: jiraClientConstructor.host,
            port: jiraClientConstructor.port ?? '8080',
            pathname: env.jiraInterMediaPath ?? `/rest/agile/1.0`,
        });
        this.client = new JiraApi({
            protocol: jiraClientConstructor.protocol ?? 'http',
            host: jiraClientConstructor.host,
            port: jiraClientConstructor.port,
            username: jiraClientConstructor.username,
            password: jiraClientConstructor.passwd,
            apiVersion: jiraClientConstructor.apiVersion,
            intermediatePath: env.jiraInterMediaPath,
            strictSSL: true,
        });
    }

    protected async request(path: string, option: OptionType) {
        const headers = {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${this.userName}:${this.passwd}`).toString('base64')}`,
        };
        const req = new Request('');
        try {
            return await req.send<any>(path, { ...option, headers });
        } catch (err) {
            log.error(err);
            return undefined;
        }
    }
}

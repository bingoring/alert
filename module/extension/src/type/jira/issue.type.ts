import { ProjectType } from './project.type';
import { SprintType } from './sprint.type';

export interface IssueDefaultFieldSetType {
    issuetype: IssueTypeType;
    project: ProjectType;
    creator: IssueUserType;
    reporter: IssueUserType;
    status: {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: {
            self: string;
            id: number;
            key: string;
            colorName: string;
            name: string;
        };
    };
    summary: string;
}

export interface IssueTypeType {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: boolean;
    expand?: string;
    fields?: {
        summary: IssueTypeFieldType;
        issuetype: IssueTypeFieldType;
        reporter: IssueTypeFieldType;
        duedate: IssueTypeFieldType;
        description: IssueTypeFieldType;
        project: IssueTypeFieldType;
        labels: IssueTypeFieldType;
        assignee: IssueTypeFieldType;
        timetracking?: IssueTypeFieldType;
        priority?: IssueTypeFieldType;
        parent?: IssueTypeFieldType;
    };
    untranslatedName?: string;
    avatarId?: number;
    hierarchyLevel?: number;
    scope?: {
        type: string;
        project: {
            id: string;
        };
    };
}
export interface IssueTypeFieldType {
    required: boolean;
    schema: { type: string; system: string; items?: string };
    name: string;
    fieldId: string;
    hasDefaultValue: boolean;
    operations: string[];
    autoCompleteUrl?: string;
    allowedValues?: any[];
    defaultValue?: any;
}

export interface IssueType {
    expand: string;
    id: string;
    self: string;
    key: string;
    renderedFields?: {
        description: string;
    };
    fields: IssueDefaultFieldSetType & {
        sprint: SprintType | null;
        labels: string[];
        workratio: number;
        priority?: {
            self: string;
            iconUrl: string;
            name: string;
            id: string;
        };
        issuerestriction?: {
            issuerestrictions: Record<string, any>;
            shouldDisplay: boolean;
        };
        lastViewed: string;
        watches: {
            self: string;
            watchCount: number;
            isWatching: boolean;
        };
        created: string;
        versions: [];
        issuelinks: [];
        assignee?: IssueUserType;
        updated: string;
        components: [];
        description: string | null;
        timetracking: Record<string, any>;
        attachment: [];
        flagged: boolean;
        creator: IssueUserType;
        subtasks: {
            id: string;
            key: string;
            self: string;
            fields: IssueDefaultFieldSetType;
        }[];
        aggregateprogress: {
            progress: number;
            total: number;
        };
        progress: {
            progress: number;
            total: number;
        };
        comment: {
            comments: [];
            maxResults: number;
            total: number;
            startAt: number;
        };
        votes: {
            self: string;
            votes: number;
            hasVoted: boolean;
        };
        worklog: {
            startAt: number;
            maxResults: number;
            total: number;
            worklogs: [];
        };
        renderedFields?: any;
    };
}

export interface ProjectIssueType {
    self: string;
    id: string;
    key: string;
    name: string;
    expand?: string;
    avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
    };
    issuetypes: IssueTypeType[];
}

export interface ConnectIssueType {
    link: string;
    name: string;
    id: string;
    issueType: 'jira';
    customValueList?: CustomValueType[];
}
export interface CustomValueType {
    key: string;
    type: string;
    label: string;
    value: string;
    filter: Record<string, any>;
    default: string;
    divideByCategory?: boolean;
}

export interface IssueUserType {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
    };
    displayName: string;
    active: boolean;
    timeZone: string;
}

export interface IssueFieldsOptionType {
    summary: string;
    labelList?: string[];
    projectId: string;
    parentIssueId?: string;
    issueTypeId: string;
    assignee?: string;
    reporter: string;
    description?: JiraDescription;
}

export type LegacyIssueFieldsType = ReturnType<InstanceType<typeof IssueFieldsType>['getLegacyData']>;

export class IssueFieldsType {
    public summary: string;
    public labelList?: string[];
    public parent?: JiraId;
    public project: JiraId;
    public issueType: JiraId;
    public assignee?: JiraId;
    public reporter: JiraId;
    public description?: JiraDescription;

    private readonly issueData: ConnectIssueType;

    constructor({
        summary,
        labelList,
        projectId,
        issueTypeId,
        assignee,
        reporter,
        description,
        parentIssueId,
    }: IssueFieldsOptionType) {
        this.summary = summary;
        this.labelList = labelList;
        this.issueType = JiraId.create(issueTypeId);
        this.project = JiraId.create(projectId);
        this.assignee = assignee ? JiraId.create(assignee) : undefined;
        this.reporter = JiraId.create(reporter);
        this.parent = parentIssueId ? JiraId.create(parentIssueId) : undefined;
        this.description = description;

        this.issueData = {
            id: '',
            link: '',
            name: '',
            issueType: 'jira',
        };
    }

    public getData() {
        return {
            parent: this.parent?.getData(),
            summary: this.summary.slice(0, 255),
            labels: this.labelList,
            project: this.project.getData(),
            issuetype: this.issueType.getData(),
            assignee: this.assignee?.getData(),
            reporter: this.reporter.getData(),
            description: this.description?.getData(),
        };
    }
    public getLegacyData() {
        return {
            parent: this.parent?.getData(),
            summary: this.summary.slice(0, 255),
            labels: this.labelList,
            project: this.project.getData(),
            issuetype: this.issueType.getData(),
            assignee: this.assignee?.getLegacyData(),
            reporter: this.reporter.getLegacyData(),
            description: this.description?.getLegacyData(),
        };
    }

    public getIssueData() {
        return this.issueData;
    }

    public setIssueData(issueData: Partial<ConnectIssueType>) {
        this.issueData.id = issueData.id ?? this.issueData.id;
        this.issueData.name = issueData.name ?? this.issueData.name;
        this.issueData.link = issueData.link ?? this.issueData.link;
    }
}

export class JiraId {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    public getData() {
        if (this.id === undefined) {
            return undefined;
        }
        return { id: this.id };
    }
    public getLegacyData() {
        if (this.id === undefined) {
            return undefined;
        }
        return { name: this.id };
    }

    public static create(id: string) {
        return new JiraId(id);
    }
}

export type JiraContentTypeType = 'paragraph' | 'heading' | 'codeBlock' | 'table' | 'tableRow' | 'tableCell' | 'rule';

export class JiraDescription {
    public type: 'doc';
    public version: number;
    public content: JiraContent<JiraContentTypeType>[];

    constructor(content: JiraContent<JiraContentTypeType>[] = []) {
        this.type = 'doc';
        this.version = 1;
        this.content = content;
    }

    public getData() {
        return {
            type: this.type,
            version: this.version,
            content: this.content.map((v) => v.getData()),
        };
    }

    public addDivider() {
        this.content.push(new JiraContent('rule'));
    }

    public getLegacyData() {
        return this.content
            .map((v) => {
                try {
                    const content = v.content?.[0] as any;

                    if (v.type === 'rule') {
                        return `----`;
                    }

                    if (content === undefined) {
                        return '';
                    }

                    if (v.type === 'heading') {
                        return `h${v.attrs.level}. ${content.text}`;
                    }
                    if (v.type === 'paragraph') {
                        const color = content.marks?.[0]?.attrs.color;
                        const text = content.text;
                        if (color) {
                            return `{color:${color}}${text}{color}`;
                        }
                        if (text.includes(`#`)) {
                            if (content?.marks === undefined) {
                                return `${text.replace(/\n\n/gi, `\n`)}`;
                            }
                        }
                        return `${content.text}`;
                    }
                    if (v.type === 'codeBlock') {
                        return `{code:json}${content.text}{code}`;
                    }

                    return '';
                } catch (e) {
                    console.log(e);
                    return '';
                }
            })
            .join('\r\n');
    }
}

export class JiraContent<T extends JiraContentTypeType> {
    public readonly type: T;
    public readonly attrs?: JiraContentAttrsType<T>;
    public readonly content: (T extends 'table'
        ? JiraContent<'tableRow'>
        : T extends 'tableRow'
        ? JiraContent<'tableCell'>
        : JiraContentTextData)[];

    constructor(type: T, attrs?: JiraContentAttrsType<T>) {
        this.type = type;
        this.attrs = attrs;
        if (Object.keys(this.attrs ?? {}).length === 0) {
            this.attrs = undefined;
        }
        this.content = [];
    }

    public getData(): { type: T; attrs?: JiraContentAttrsType<T>; content: any } {
        return {
            type: this.type,
            attrs: this.attrs,
            content: this.type === 'rule' ? undefined : this.content?.map((v) => v.getData()),
        };
    }
}

export type HeadLevelType = 1 | 2 | 3 | 4 | 5 | 6;

export type JiraContentAttrsType<T extends JiraContentTypeType> = T extends 'heading'
    ? {
          level?: HeadLevelType;
      }
    : T extends 'codeBlock'
    ? {
          language?: 'json';
      }
    : T extends 'table'
    ? {
          isNumberColumnEnabled?: boolean;
          layout?: 'default' | 'full-width' | 'wide';
      }
    : any;

export class JiraContentTextData {
    public text: string;
    public type: 'text';
    public marks: any;

    constructor(text: string, marks: any = undefined) {
        this.text = text;
        this.type = 'text';
        this.marks = marks;
    }

    public getData() {
        if (this.text.length === 0) {
            this.text = ' ';
        }

        return {
            text: this.text,
            type: this.type,
            marks: this.marks,
        };
    }
}

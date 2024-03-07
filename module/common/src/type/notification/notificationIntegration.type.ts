import { IntegrationMethodType } from '@root/common/constant/integration.constant';
import { JiraConfigurationDto } from '@root/nest/type/dto/notification/integration/jira.type';
import { EmailConfigurationDto } from '@root/nest/type/dto/notification/integration/email.type';
import { WebhookConfigurationDto } from '@root/nest/type/dto/notification/integration/webhook.type';

export interface NotificationIntegrationWebhookConfigType {
    urlList: string[];
}

export type NotificationIntegrationConfigType<T extends IntegrationMethodType> = T extends 'EMAIL'
    ? EmailConfigurationDto
    : T extends 'JIRA'
    ? JiraConfigurationDto
    : T extends 'WEBHOOK'
    ? WebhookConfigurationDto
    : never;

export interface NotificationIntegrationStatisticsType {
    jiraCount: number;
    emailCount: number;
    slackCount: number;
    webhookCount: number;
    siemCount: number;
}

export const initialNotificationIntegrationStatistics: NotificationIntegrationStatisticsType = {
    jiraCount: 0,
    emailCount: 0,
    slackCount: 0,
    webhookCount: 0,
    siemCount: 0,
};

export const NotificationMethodStaticMap = {
    JIRA: 'jiraCount',
    EMAIL: 'emailCount',
    SLACK: 'slackCount',
    WEBHOOK: 'webhookCount',
    SIEM: 'siemCount',
} as const;

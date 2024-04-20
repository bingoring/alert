export interface ToWebhookType {
    url: string;
    content: WebhookMessageType;
}

export interface WebhookMessageType {
    message: string;
    policyId: string;
    policyName: string;
    severity?: string;
    resourceName?: string;
    resourceId?: string;
    provider?: string;
    identifier?: string;
}

export const MapperColumn: Record<string, string> = {
    eventName: 'name',
    originEventName: 'originEventName',
    originEventIpAddr: 'ipAddr',
    severity: 'severity',
    resourceId: 'resourceId',
    resourceName: 'resourceName',
    resourceType: 'resourceType',
    policyId: 'policyId',
    policyName: 'policyName',
    policyDescription: 'description',
    diagnosticCriterion: 'diagnosticCriterion',
    policyAudit: 'audit',
    policyRemediation: 'remediation',
    csp: 'provider',
    cloudName: 'cloudName',
    identifier: 'identifier',
} as const;

export const DisplayNameMapper = {
    eventName: 'Event Name',
    originEventName: 'API Name',
    originEventIpAddr: 'Source IP',
    severity: 'Severity',
    resourceId: 'Resource ID',
    resourceName: 'Resource Name',
    resourceType: 'Resource Type',
    policyId: 'Policy ID',
    policyName: 'Policy Name',
    policyDescription: 'Policy Description',
    diagnosticCriterion: 'Diagnostic Criteria',
    policyAudit: 'Policy Audit Method',
    policyRemediation: 'Policy Remediation',
    csp: 'CSP',
} as const;

export const SummaryMapperColum: Record<string, string> = {
    CSP: 'provider',
    Severity: 'severity',
    'Event Name': 'name',
    'Policy ID': 'policyId',
    'API Name': 'originEventName',
    'Resource Name': 'resourceName',
    'Resource ID': 'resourceId',
    'Resource Type': 'resourceType',
    'Source IP': 'ipAddr',
};

export type MessageVariableType = keyof typeof DisplayNameMapper;
export const MessageVariableList = Object.keys(DisplayNameMapper) as MessageVariableType[];

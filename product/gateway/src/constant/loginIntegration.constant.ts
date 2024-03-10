export const LoginIntegrationMethodMap = {
    saml: 'SAML',
    ldap: 'LDAP',
} as const;
export const LoginIntegrationMethodList = Object.values(LoginIntegrationMethodMap);
export type LoginIntegrationMethodType = (typeof LoginIntegrationMethodList)[number];

export const LoginIntegrationUserApprovalMap = {
    autoApproval: 'AUTO_APPROVAL',
    autoDeny: 'AUTO_DENY',
    manualApproval: 'MANUAL_APPROVAL',
} as const;
export const LoginIntegrationUserApprovalList = Object.values(LoginIntegrationUserApprovalMap);
export type LoginIntegrationUserApprovalType = (typeof LoginIntegrationUserApprovalList)[number];

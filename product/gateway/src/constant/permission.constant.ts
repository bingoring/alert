export const UserPermissionMap = {
    dashboardRead: 'DASHBOARD_READ',
    dashboardWrite: 'DASHBOARD_WRITE',
    eventRead: 'EVENT_READ',
    eventWrite: 'EVENT_WRITE',
    exceptionRead: 'EXCEPTION_READ',
    exceptionWrite: 'EXCEPTION_WRITE',
    anomalyDetectionRead: 'ANOMALY_DETECTION_READ',
    anomalyDetectionWrite: 'ANOMALY_DETECTION_WRITE',
    inventoryRead: 'INVENTORY_READ',
    complianceReportRead: 'COMPLIANCE_REPORT_READ',
    policyRead: 'POLICY_READ',
    policyWrite: 'POLICY_WRITE',
    complianceManagementRead: 'COMPLIANCE_MANAGEMENT_READ',
    complianceManagementWrite: 'COMPLIANCE_MANAGEMENT_WRITE',
    vulnerabilityRead: 'VULNERABILITY_READ',
    iamRead: 'IAM_READ',
    networkSecurityRead: 'NETWORK_SECURITY_READ',
    userRead: 'USER_READ',
    userWrite: 'USER_WRITE',
    groupRead: 'GROUP_READ',
    groupWrite: 'GROUP_WRITE',
    groupAssignRead: 'GROUP_ASSIGN_READ',
    groupAssignWrite: 'GROUP_ASSIGN_WRITE',
    roleRead: 'ROLE_READ',
    roleWrite: 'ROLE_WRITE',
    userAuthenticationRead: 'USER_AUTHENTICATION_READ',
    userAuthenticationWrite: 'USER_AUTHENTICATION_WRITE',
    projectRead: 'PROJECT_READ',
    projectWrite: 'PROJECT_WRITE',
    integrationAlertRead: 'INTEGRATION_ALERT_READ',
    integrationAlertWrite: 'INTEGRATION_ALERT_WRITE',
    cloudRead: 'CLOUD_READ',
    cloudWrite: 'CLOUD_WRITE',
    agentRead: 'AGENT_READ',
    agentWrite: 'AGENT_WRITE',
    apiRead: 'API_READ',
    apiWrite: 'API_WRITE',
    auditLogRead: 'AUDIT_LOG_READ',
} as const;

export const SystemPermissionMap = {
    ...UserPermissionMap,
    admin: 'ADMIN',
} as const;

export const UserPermissionList = Object.values(UserPermissionMap);
export type UserPermissionType = (typeof UserPermissionList)[number];

export const SystemPermissionList = Object.values(SystemPermissionMap);
export type SystemPermissionType = (typeof SystemPermissionList)[number];

export const UserStatusList = ['ACTIVATED', 'DISABLED'] as const;
export type UserStatusType = (typeof UserStatusList)[number];

export const UserLoginTypeList = ['ID_PW', 'SAML', 'LDAP', 'SSO'] as const;
export type UserLoginTypeType = (typeof UserLoginTypeList)[number];

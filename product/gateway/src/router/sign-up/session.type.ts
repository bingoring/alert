export type SessionAllType = UserTempSessionType & SessionType;

export interface UserTempSessionType {
    isTemp: true;
    user: Pick<SessionUserType, 'id'>;
    type: string;
    token?: string;
}
export interface SessionType {
    organizationId: string;
    user: SessionUserType;
    mfa: SessionMfaType;
}

export interface SessionUserType {
    id: string;
    email?: string;
    loginId: string;
    givenName: string;
    familyName: string;
}

interface SessionMfaType {
    required: boolean;
    registered: boolean;
}

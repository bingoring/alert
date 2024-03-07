import {
    AllSubProviderType,
    OrganizationProviderType,
    ProviderType,
    PublicProviderType,
} from '@root/common/type/provider.type';
import { AllKeyMethodType, KeyMethodType } from '@root/common/type/keyMethod.type';
import { ValidateStatusType } from '@root/common/type/validateStatus.type';
import { LogCollectInfoType } from '@root/common/type/cloud/logCollectInfo.type';
import { AllRegisterMethodType, RegisterMethodType } from '@root/common/type/cloud/registerMethod.type';

export class CloudDeepPartialType {
    userId!: string;
    tag?: Record<string, any>;
    provider!: ProviderType;
    subProvider?: AllSubProviderType;
    cloudName?: string;
    status?: ValidateStatusType;
    keyMethod!: AllKeyMethodType;
    registerMethod!: AllRegisterMethodType;
    keyInfo!: Record<string, string>;
    logCollectInfo?: LogCollectInfoType<PublicProviderType>;
    cloudOrganizationId?: string;
    identifier?: string;
    alias?: string;
}

export class UserDeepPartialType {
    loginId!: string;
}

export class CloudOrganizationDeepPartialType {
    userId!: string;
    provider!: OrganizationProviderType;
    subProvider?: AllSubProviderType;
    status?: ValidateStatusType;
    identifier?: string;
    keyMethod!: KeyMethodType<OrganizationProviderType>;
    registerMethod!: RegisterMethodType<OrganizationProviderType>;
    adminIdentifier?: string;
    adminKeyInfo?: Record<string, string>;
    logCollectInfo?: LogCollectInfoType<OrganizationProviderType>;
}
export class LogDeepPartialType {
    level!: number;
    category!: string;
    content!: string;
    type!: string;
    createdAt!: string;
    savedAt!: string;
    ipAddr!: string;
    loginId!: string;
    server!: string;
}

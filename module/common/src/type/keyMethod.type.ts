import { PublicProviderType } from './provider.type';
import { ValueOfType } from './utility.type';

export const AwsKeyMethodMap = {
    assumeRole: 'AWS_ASSUME_ROLE',
    anywhere: 'AWS_ANYWHERE',
} as const;

export const AzureKeyMethodMap = {
    clientId: 'AZURE_CLIENT_ID',
} as const;

export const GcpKeyMethodMap = {
    jsonKey: 'GCP_JSON_KEY',
} as const;

export const NcpKeyMethodMap = {
    accessKey: 'NCP_ACCESS_KEY',
} as const;

export const NhnKeyMethodMap = {
    accessKey: 'NHN_ACCESS_KEY',
} as const;

export const AwsKeyMethodList = Object.values(AwsKeyMethodMap);
export const AzureKeyMethodList = Object.values(AzureKeyMethodMap);
export const GcpKeyMethodList = Object.values(GcpKeyMethodMap);
export const NcpKeyMethodList = Object.values(NcpKeyMethodMap);
export const NhnKeyMethodList = Object.values(NhnKeyMethodMap);
export const OcpKeyMethodList = ['OCP_API_KEY'] as const;
export const VsphereKeyMethodList = ['VSPHERE_LOGIN_ID'] as const;

export const KeyMethodList = [
    ...AwsKeyMethodList,
    ...AzureKeyMethodList,
    ...GcpKeyMethodList,
    ...NcpKeyMethodList,
    ...NhnKeyMethodList,
] as const;

export type AwsKeyMethodType = ValueOfType<typeof AwsKeyMethodMap>;
export type AzureKeyMethodType = ValueOfType<typeof AzureKeyMethodMap>;
export type GcpKeyMethodType = ValueOfType<typeof GcpKeyMethodMap>;
export type NcpKeyMethodType = ValueOfType<typeof NcpKeyMethodMap>;
export type NhnKeyMethodType = ValueOfType<typeof NhnKeyMethodMap>;
export type OcpKeyMethodType = (typeof OcpKeyMethodList)[number];
export type VsphereKeyMethodType = (typeof VsphereKeyMethodList)[number];

export type AllKeyMethodType = (typeof KeyMethodList)[number];

export type KeyMethodType<Provider extends PublicProviderType> = Provider extends 'AWS'
    ? AwsKeyMethodType
    : Provider extends 'AZURE'
    ? AzureKeyMethodType
    : Provider extends 'GCP'
    ? GcpKeyMethodType
    : Provider extends 'NCP'
    ? NcpKeyMethodType
    : Provider extends 'OCP'
    ? OcpKeyMethodType
    : Provider extends 'VSPHERE'
    ? VsphereKeyMethodType
    : never;

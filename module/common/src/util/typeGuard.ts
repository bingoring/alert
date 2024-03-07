import { PublicProviderType } from '@root/common/type/provider.type';
import { PublicProvider } from '../type/provider.type';
import { KeyType } from '@root/common/type/cloud';
import { isArray } from 'class-validator';

export type TypeofType = 'undefined' | 'boolean' | 'string' | 'number' | 'object' | 'function' | 'symbol' | 'bigint';

export class TypeGuard {
    private readonly guards: ((data: unknown) => boolean)[];

    constructor() {
        this.guards = [];
    }

    public addCondition(guardList: ((data: unknown) => boolean)[]): this {
        this.guards.push(...guardList);
        return this;
    }

    public getConditionList() {
        return this.guards;
    }

    public addPropertyCondition(propertyName: string, typeList: TypeofType[]) {
        this.guards.push(this.isObjectWithProperty(propertyName, typeList));
        return this;
    }

    public addStringPropertyCondition(propertyName: string, { nullable }: { nullable: boolean } = { nullable: false }) {
        const typeList: TypeofType[] = ['string'];
        if (nullable === true) {
            typeList.push('undefined');
        }
        this.guards.push(this.isObjectWithProperty(propertyName, typeList));
        return this;
    }

    public addNumberPropertyCondition(propertyName: string, { nullable }: { nullable: boolean } = { nullable: false }) {
        const typeList: TypeofType[] = ['number'];
        if (nullable === true) {
            typeList.push('undefined');
        }
        this.guards.push(this.isObjectWithProperty(propertyName, typeList));
        return this;
    }

    public addBooleanPropertyCondition(
        propertyName: string,
        { nullable }: { nullable: boolean } = { nullable: false }
    ) {
        const typeList: TypeofType[] = ['boolean'];
        if (nullable === true) {
            typeList.push('undefined');
        }
        this.guards.push(this.isObjectWithProperty(propertyName, typeList));
        return this;
    }

    public addArrayPropertyCondition(
        propertyName: string,
        type: TypeofType,
        { nullable }: { nullable: boolean } = { nullable: false }
    ) {
        this.guards.push(this.isObjectWithArrayProperty(propertyName, type, nullable));
        return this;
    }

    public test(data: unknown): boolean {
        return this.guards.every((guard) => guard(data));
    }

    public isType<T>(data: unknown): data is T {
        return this.test(data);
    }

    private isObjectWithProperty(propertyName: string, typeList: TypeofType[]) {
        return (data: unknown): boolean => {
            if (data === null) {
                return false;
            }

            if (typeof data !== 'object') {
                return false;
            }

            if (isArray(data)) {
                return false;
            }

            const typeSet = new Set(typeList);
            return typeSet.has(typeof data[propertyName as keyof typeof data]);
        };
    }

    private isObjectWithArrayProperty(propertyName: string, type: TypeofType, isOptional = false) {
        return (data: unknown): boolean => {
            if (data === null || typeof data !== 'object' || isArray(data)) {
                return false;
            }
            if (isOptional && !(propertyName in data)) {
                return true;
            }
            if (!(propertyName in data)) {
                return false;
            }

            const propertyData = (data as Record<string, unknown>)[propertyName];
            return Array.isArray(propertyData) && propertyData.every((item) => typeof item === type);
        };
    }
}

const awsKeyTypeGuard = new TypeGuard()
    .addStringPropertyCondition('roleArn')
    .addStringPropertyCondition('externalId', { nullable: true });

const azureDefaultKeyGuard = new TypeGuard()
    .addStringPropertyCondition('clientId')
    .addStringPropertyCondition('secretKey')
    .addStringPropertyCondition('tenantId');

export const azureCloudKeyTypeGuard = new TypeGuard()
    .addCondition(azureDefaultKeyGuard.getConditionList())
    .addPropertyCondition('subscriptionId', ['string', 'undefined']);

export const azureOrganizationKeyTypeGuard = new TypeGuard()
    .addCondition(azureDefaultKeyGuard.getConditionList())
    .addPropertyCondition('managementGroupId', ['string', 'undefined']);

const gcpKeyTypeGuard = new TypeGuard()
    .addStringPropertyCondition('type')
    .addStringPropertyCondition('project_id')
    .addStringPropertyCondition('private_key_id')
    .addStringPropertyCondition('private_key')
    .addStringPropertyCondition('client_email')
    .addStringPropertyCondition('client_id')
    .addStringPropertyCondition('auth_uri')
    .addStringPropertyCondition('token_uri')
    .addStringPropertyCondition('auth_provider_x509_cert_url')
    .addStringPropertyCondition('client_x509_cert_url')
    .addStringPropertyCondition('universe_domain');

const ncpKeyTypeGuard = new TypeGuard().addStringPropertyCondition('accessKey').addStringPropertyCondition('secretKey');

const nhnInfraKeyGuard = new TypeGuard()
    .addStringPropertyCondition('tenantId')
    .addStringPropertyCondition('apiPassword');
const nhnObjectStorageKeyGuard = new TypeGuard()
    .addStringPropertyCondition('tenantId')
    .addStringPropertyCondition('apiUserId')
    .addStringPropertyCondition('apiPassword');
const nhnCdnKeyGaurd = new TypeGuard().addStringPropertyCondition('secretKey');
const nhnAppKeyKeyGaurd = new TypeGuard().addStringPropertyCondition('appKey');

const nhnDefaultKeyTypeGuard = new TypeGuard()
    .addStringPropertyCondition('appKey')
    .addStringPropertyCondition('username')
    .addStringPropertyCondition('userAccessKey')
    .addStringPropertyCondition('secretAccessKey');

export const awsLogCollectInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('trail')
    .addStringPropertyCondition('bucket', { nullable: true })
    .addStringPropertyCondition('region', { nullable: true })
    .addStringPropertyCondition('prefix', { nullable: true });

export const awsTrailInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('Name')
    .addStringPropertyCondition('S3BucketName')
    .addStringPropertyCondition('HomeRegion')
    .addStringPropertyCondition('S3KeyPrefix', { nullable: true })
    .addBooleanPropertyCondition('IsOrganizationTrail', { nullable: true });

export const gcpPubSubInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('topicName')
    .addStringPropertyCondition('subscriptionName');

export const azureEventHubInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('eventHubName')
    .addStringPropertyCondition('eventHubConnectionString')
    .addStringPropertyCondition('consumerGroup')
    .addStringPropertyCondition('storageConnectionString', { nullable: true });

export const awsCloudInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('id')
    .addArrayPropertyCondition('aliasList', 'string');

export const ncpCloudInfoTypeGuard = new TypeGuard().addStringPropertyCondition('subAccountId');
export const gcpCloudInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('projectId')
    .addStringPropertyCondition('projectNumber', { nullable: true })
    .addStringPropertyCondition('name', { nullable: true });

export const nhnCloudInfoTypeGuard = new TypeGuard()
    .addStringPropertyCondition('id')
    .addStringPropertyCondition('name')
    .addStringPropertyCondition('groupId')
    .addStringPropertyCondition('description')
    .addBooleanPropertyCondition('enabled')
    .addStringPropertyCondition('project_domain')
    .addStringPropertyCondition('RegionOne_sdn_preferred', { nullable: true });

export function isKeyType<Provider extends PublicProviderType>(
    provider: Provider,
    keyInfo: unknown
): keyInfo is KeyType<Provider> {
    if (keyInfo === null || typeof keyInfo !== 'object') {
        return false;
    }

    switch (provider) {
        case PublicProvider.Aws: {
            return awsKeyTypeGuard.test(keyInfo);
        }
        case PublicProvider.Azure: {
            const guard = azureDefaultKeyGuard
                .addStringPropertyCondition('subscriptionId', { nullable: true })
                .addStringPropertyCondition('managementGroupId', { nullable: true });
            return guard.test(keyInfo);
        }
        case PublicProvider.Gcp: {
            return gcpKeyTypeGuard.test(keyInfo);
        }
        case PublicProvider.Ncp: {
            return ncpKeyTypeGuard.test(keyInfo);
        }
        case PublicProvider.Nhn: {
            const isNhnKeyInfoInfra = 'infra' in keyInfo && nhnInfraKeyGuard.test(keyInfo.infra);
            const isNhnKeyInfoObjectStorage =
                'objectStorage' in keyInfo && nhnObjectStorageKeyGuard.test(keyInfo.objectStorage);
            const isNhnKeyInfoCdn = 'cdn' in keyInfo && nhnCdnKeyGaurd.test(keyInfo.cdn);
            const isNhnKeyInfoMysql = 'mysql' in keyInfo && nhnAppKeyKeyGaurd.test(keyInfo.mysql);
            const isNhnKeyInfoMariadb = 'mariadb' in keyInfo && nhnAppKeyKeyGaurd.test(keyInfo.mariadb);
            const isNhnKeyInfoCloudtrail = 'cloudtrail' in keyInfo && nhnAppKeyKeyGaurd.test(keyInfo.cloudtrail);

            const isNhnKeyInfo =
                nhnDefaultKeyTypeGuard.test(keyInfo) &&
                isNhnKeyInfoInfra &&
                isNhnKeyInfoObjectStorage &&
                isNhnKeyInfoCdn &&
                isNhnKeyInfoMysql &&
                isNhnKeyInfoMariadb &&
                isNhnKeyInfoCloudtrail;
            return isNhnKeyInfo;
        }
        case PublicProvider.Ocp:
        case PublicProvider.Vsphere:
            return true;
        default:
            return false;
    }
}

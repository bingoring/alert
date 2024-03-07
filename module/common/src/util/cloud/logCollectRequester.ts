import { Injectable } from '@nestjs/common';
import {
    LogCollectRequesterConfigType,
    LogCollectorReqBodyType,
} from '@root/common/type/cloud/logCollectRequester.type';
import { sleep } from '@root/common/util';
import { LogCollectorRequestFailException } from '@root/common/error/error';
import { OptionType } from '@root/common/type/request.type';
import axios, { AxiosError } from 'axios';
import { ProviderUsingLogCollectorType } from '@root/common/type/log-collector/providerUsedCollector.type';
import {
    AzureInputConfigData,
    GcpInputConfigData,
    HttpOutputConfigData,
    InputCategoryType,
    InputConfigDataType,
    NcpInputConfigData,
    NhnInputConfigData,
    S3InputConfigData,
} from '@root/common/type/log-collector/pipeline-config';

@Injectable()
export class LogCollectRequester {
    public async sendLogCollectorGetRequest(tenantId: string, { targetId }: { targetId: string }) {
        try {
            const headers = { 'x-tenant-id': tenantId };
            const res = await this.requestLogCollector({ method: 'get', headers, params: { targetId } });
            if (res === undefined) {
                throw new LogCollectorRequestFailException('Get');
            }
            return res;
        } catch (e) {
            log.error(e);
        }
    }

    public async sendLogCollectorCreateRequest<Provider extends ProviderUsingLogCollectorType>(
        tenantId: string,
        {
            provider,
            subProvider,
            targetId,
            isTargetOrganization,
            keyInfo,
            logCollectInfo,
            proxyUrl,
        }: LogCollectRequesterConfigType<Provider>
    ) {
        try {
            const headers = { 'x-tenant-id': tenantId };
            const createBody = this.getLogCollectorRequestBody({
                provider,
                subProvider,
                targetId,
                isTargetOrganization,
                keyInfo,
                logCollectInfo,
                proxyUrl,
            });
            const res = await this.requestLogCollector({
                method: 'post',
                headers,
                data: createBody,
            });
            if (res === undefined) {
                throw new LogCollectorRequestFailException('Create');
            }
            return res;
        } catch (e) {
            throw e;
        }
    }

    public async sendLogCollectorUpdateRequest<Provider extends ProviderUsingLogCollectorType>(
        tenantId: string,
        {
            provider,
            subProvider,
            targetId,
            isTargetOrganization,
            keyInfo,
            logCollectInfo,
            proxyUrl,
        }: LogCollectRequesterConfigType<Provider>
    ) {
        try {
            const headers = { 'x-tenant-id': tenantId };
            const updateBody = this.getLogCollectorRequestBody({
                provider,
                subProvider,
                targetId,
                isTargetOrganization,
                keyInfo,
                logCollectInfo,
                proxyUrl,
            });
            const res = await this.requestLogCollector({
                method: 'put',
                headers,
                data: updateBody,
            });
            if (res === undefined) {
                throw new LogCollectorRequestFailException('Update');
            }
            return res;
        } catch (e) {
            if (e instanceof AxiosError) {
                const errJson = e.toJSON() as any;
                if (errJson.status === 409) {
                    log.error(e);
                    return;
                }
            }
            throw e;
        }
    }

    public async sendLogCollectorDeleteRequest(
        tenantId: string,
        {
            targetId,
            isTargetOrganization,
        }: {
            targetId: string;
            isTargetOrganization: boolean;
        }
    ) {
        try {
            const headers = { 'x-tenant-id': tenantId };
            const deleteQuery = { targetId, isTargetOrganization };
            const res = await this.requestLogCollector({
                method: 'delete',
                headers,
                params: deleteQuery,
            });
            if (res === undefined) {
                throw new LogCollectorRequestFailException('Delete');
            }
            return res;
        } catch (e) {
            throw e;
        }
    }

    private getLogCollectorRequestBody(
        reqContext: LogCollectRequesterConfigType<ProviderUsingLogCollectorType>
    ): LogCollectorReqBodyType<typeof provider> {
        const { provider, targetId } = reqContext;
        const output: HttpOutputConfigData = {
            outputCategory: 'HTTP',
            targetUrl: env.logSink.url,
            targetPath: `/cloud-log/${provider.toLowerCase()}`,
        };
        const inputConfigCreator: AbstractPipelineInputConfigStrategy<ProviderUsingLogCollectorType> =
            provider === 'AWS'
                ? new AwsInputConfigStrategy()
                : provider === 'AZURE'
                ? new AzureInputConfigStrategy()
                : provider === 'GCP'
                ? new GcpInputConfigStrategy()
                : provider === 'NCP'
                ? new NcpInputConfigStrategy()
                : new NhnInputConfigStrategy();

        return {
            provider,
            pipelineConfig: { targetId, output, input: inputConfigCreator.createInputConfig(reqContext) },
        };
    }

    private async requestLogCollector(option: OptionType): Promise<any> {
        try {
            const result = await axios({ url: '/pipelines', ...option, baseURL: env.logCollector.url });
            return result;
        } catch (e) {
            if (e instanceof AxiosError) {
                const errJson = e.toJSON() as any;
                if (errJson.status === 400) {
                    log.error(e);
                    return undefined;
                }
                if (errJson.status === 404) {
                    log.error(e.message);
                    return undefined;
                }
            }
            log.error(e);
            await sleep(3000);
            const targetId =
                option.data &&
                'pipelineConfig' in option.data &&
                typeof option.data.pipelineConfig === 'object' &&
                'targetId' in option.data.pipelineConfig
                    ? option.data.pipelineConfig.targetId
                    : undefined;
            log.debug(`Resend ${option.method} request to log collector server with targetId ${targetId}`);
            return this.requestLogCollector(option);
        }
    }
}

abstract class AbstractPipelineInputConfigStrategy<Provider extends ProviderUsingLogCollectorType> {
    public abstract createInputConfig(
        reqContext: LogCollectRequesterConfigType<Provider>
    ): InputConfigDataType<InputCategoryType<Provider>>;
}

class AwsInputConfigStrategy extends AbstractPipelineInputConfigStrategy<'AWS'> {
    public override createInputConfig(reqContext: LogCollectRequesterConfigType<'AWS'>): S3InputConfigData {
        const {
            logCollectInfo: { bucket, prefix, region },
            keyInfo: { roleArn, externalId },
            proxyUrl,
        } = reqContext;
        return {
            inputCategory: 'S3',
            bucket: bucket ?? '',
            prefix: prefix ?? '',
            region: region ?? '',
            roleArn,
            externalId,
            proxyUrl,
        };
    }
}

class AzureInputConfigStrategy extends AbstractPipelineInputConfigStrategy<'AZURE'> {
    public override createInputConfig(reqContext: LogCollectRequesterConfigType<'AZURE'>): AzureInputConfigData {
        const {
            logCollectInfo: { eventHubName, eventHubConnectionString, consumerGroup, storageConnectionString },
            proxyUrl,
        } = reqContext;
        return {
            inputCategory: 'AZURE',
            eventHubConnectionString: eventHubConnectionString ?? '',
            consumerGroup: consumerGroup ?? '',
            eventHubName,
            storageConnectionString,
            proxyUrl,
        };
    }
}

class GcpInputConfigStrategy extends AbstractPipelineInputConfigStrategy<'GCP'> {
    public override createInputConfig(reqContext: LogCollectRequesterConfigType<'GCP'>): GcpInputConfigData {
        const {
            logCollectInfo: { topicName, subscriptionId },
            keyInfo,
            proxyUrl,
        } = reqContext;
        return {
            inputCategory: 'GCP',
            projectId: keyInfo.project_id,
            subscriptionId: subscriptionId ?? '',
            jsonKeyFileStringValue: JSON.stringify(keyInfo),
            topicName,
            proxyUrl,
        };
    }
}

class NcpInputConfigStrategy extends AbstractPipelineInputConfigStrategy<'NCP'> {
    public override createInputConfig(reqContext: LogCollectRequesterConfigType<'NCP'>): NcpInputConfigData {
        const {
            keyInfo: { accessKey, secretKey },
            subProvider,
            proxyUrl,
        } = reqContext;
        return {
            inputCategory: 'NCP',
            subCategory: subProvider ?? 'NCP',
            accessKey,
            secretKey,
            proxyUrl,
        };
    }
}

class NhnInputConfigStrategy extends AbstractPipelineInputConfigStrategy<'NHN'> {
    public override createInputConfig(reqContext: LogCollectRequesterConfigType<'NHN'>): NhnInputConfigData {
        const {
            keyInfo: { cloudtrail },
            subProvider,
            proxyUrl,
        } = reqContext;
        return {
            inputCategory: 'NHN',
            subCategory: subProvider ?? 'NHN',
            appKey: cloudtrail.appKey,
            proxyUrl,
        };
    }
}

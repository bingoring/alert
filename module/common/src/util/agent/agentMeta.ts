import { AgentMetaDataSummaryType, AgentNetworkType } from '@root/common/type/agent';
import { AgentMetadataDto } from '@root/nest/type/dto/agent/agentMetadata.type';

export async function getAgentMeta({ tenantId, agentId }: { tenantId: string; agentId: string }) {
    const agentConfigKey = `/agent/meta/${tenantId}/${agentId}`;
    const metadata: AgentMetadataDto = (await redis.hgetall(agentConfigKey)) ?? {};
    for (const key of Object.keys(metadata)) {
        const value = metadata[key as keyof AgentMetadataDto] ?? '{}';
        try {
            metadata[key as keyof AgentMetadataDto] = JSON.parse(value);
        } catch {
            metadata[key as keyof AgentMetadataDto] = value;
        }
    }
    return metadata;
}

export async function getIpMedidate({
    metadata,
    tenantId,
    agentId,
}: {
    metadata?: AgentMetadataDto;
    tenantId: string;
    agentId: string;
}) {
    const meta = metadata ?? (await getAgentMeta({ tenantId, agentId }));
    return meta.gohai.network as AgentNetworkType;
}

export function getIpv4Address(network?: AgentNetworkType, interfaceFilter?: Array<string>) {
    if (network === undefined) {
        return [];
    }
    if (network.interfaces === undefined) {
        return [{ name: 'N/A', ip: network.ipaddress ?? '' }];
    }

    if (interfaceFilter?.length === 0) {
        return network.interfaces
            .filter((o) => !!o.ipv4?.[0])
            .map((o) => ({ name: o.name, ip: o.ipv4[0] ?? '' }))
            .flat();
    }
    const filterList = ['en', 'eth', 'wl', 'ww'];

    return network.interfaces
        .filter((o) => filterList.some((f) => !!o.ipv4?.[0] && o.name.includes(f)))
        .map((o) => ({ name: o.name, ip: o.ipv4[0] ?? '' }))
        .flat();
}

export function getAgentMetaSummary(metaData: AgentMetadataDto) {
    const hostName = metaData.meta?.hostname;
    const { detectedFeatures, signatureStatus: isSignatured, signatureFailReason, lastConnectedAt, tasMeta } = metaData;

    return {
        detectedFeatures,
        signatureStatus: isSignatured,
        signatureFailReason,
        lastConnectedAt,
        tasMeta,
        hostName,
    } as AgentMetaDataSummaryType;
}

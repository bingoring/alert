export type SendOptionType = {
    properties?: Record<string, string>;
    eventTimestamp?: number;
    sequenceId?: number;
    partitionKey?: string;
    orderingKey?: string;
    replicationClusters?: string[];
    deliverAfter?: number;
    deliverAt?: number;
    disableReplication?: boolean;
};

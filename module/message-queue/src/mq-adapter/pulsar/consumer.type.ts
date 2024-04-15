import { SubscriptionNameType } from './subscription.type';
import { SubscriptionType } from 'pulsar-client';
import { TopicNameType } from '../../topic.type';

export type PulsarConsumerAckStyleType = 'BEFORE_CALLBACK' | 'AFTER_CALLBACK';

export type ConsumerOptionType = {
    topic: TopicNameType;
    subscription: SubscriptionNameType;
    subscriptionType: SubscriptionType;
    receiverQueueSize?: number;
    ackTimeoutMs?: number;
    ackStyle?: PulsarConsumerAckStyleType;
};

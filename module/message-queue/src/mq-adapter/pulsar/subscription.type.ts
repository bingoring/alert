import { ValueOfType } from '@root/common/type/utility.type';

export const SubscriptionNameMap = {
    sseSubscription: 'SSE_SUBSCRIPTION',
} as const;

export const SubscriptionNameList = Object.values(SubscriptionNameMap);
export type SubscriptionNameType = ValueOfType<typeof SubscriptionNameMap>;

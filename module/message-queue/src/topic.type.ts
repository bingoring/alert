import { ValueOfType } from '@root/common/type/utility.type';

export const TopicNameMap = {
    alarmTopic: 'ALARM_TOPIC',
} as const;

export const TopicNameList = Object.values(TopicNameMap);
export type TopicNameType = ValueOfType<typeof TopicNameMap>;

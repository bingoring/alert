import { ValueOfType } from '@root/common/type/utility.type';

export const ServerNameMap = {
    api: 'api',
    dataCollector: 'data-collector',
    dataProcessor: 'data-processor',
    gateway: 'gateway',
    logCollector: 'log-collector',
    logSink: 'log-sink',
    reporter: 'reporter',
    scanner: 'scanner',
    agent: 'agent',
    kbBank: 'kb-bank',
    hanaBank: 'hana-bank',
} as const;

export const ServerNameList = Object.values(ServerNameMap);
export type ServerNameType = ValueOfType<typeof ServerNameMap>;

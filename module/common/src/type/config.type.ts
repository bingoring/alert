import { LogLevelType } from '@root/log/type';
import { EncryptKeyType } from './crypto.type';

export interface ConfigType {
    version: string;
    useEmail: boolean;
    encrypt?: EncryptKeyType;
    mode: ModeType;
    jwtSecretKey?: string;
    environment: 'production' | 'development';
    pg: ServerInfoType;
    redis: RedisInfoType;
    pulsar: ServerInfoType;
    gateway: ServerInfoType;
    schedule: ServerInfoType;
    publicKeyPath: string;
    gmail?: GmailConfigType;
    jiraInterMediaPath?: string;
    isConfigUnlimitedRequests: boolean;
    isOrgTrail: boolean;
    logLevel: LogLevelType;
}

export interface GmailConfigType {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    accessToken: string;
    refreshToken: string;
}

export interface ServerInfoType {
    host: string;
    port: number;
    protocol: string;
    url: string;
    user?: string;
    passwd?: string;
    clustering?: number;
    database?: string;
    queryTimeout?: number;
}

interface RedisInfoType {
    isCluster: boolean;
    passwd?: string;
    nodeList: RedisNodeInfoType[];
}

interface RedisNodeInfoType {
    host?: string;
    port?: number;
    url?: string;
}

const localhost = '127.0.0.1';
export const decryptKeyList = ['passwd', 'accessKeyId', 'secretAccessKey', 'jwtSecretKey'];
export const ModeList = ['saas', 'installed'] as const;
export type ModeType = (typeof ModeList)[number];
export const processKeyList = ['pg', 'redis', 'pulsar', 'gateway', 'schedule', 'grafana'] as (keyof ConfigType)[];

export const DefaultConfig: ConfigType = {
    version: 'v0.0.1',
    useEmail: true,
    encrypt: undefined,
    pg: {
        host: localhost,
        port: 5432,
        protocol: 'postgres',
        url: `postgres://${localhost}:5432`,
        user: 'postgres',
        passwd: undefined,
        database: 'database',
        queryTimeout: 15000,
    },
    gateway: {
        host: localhost,
        port: 5001,
        protocol: 'http',
        url: `http://${localhost}:5001`,
    },
    redis: {
        isCluster: false,
        passwd: undefined,
        nodeList: [
            {
                host: localhost,
                port: 6379,
                url: `redis://${localhost}:6379`,
            },
        ],
    },
    pulsar: {
        host: localhost,
        port: 6650,
        protocol: `pulsar`,
        url: `pulsar://${localhost}:6650`,
    },
    schedule: {
        host: localhost,
        port: 4500,
        protocol: 'http',
        url: `http://${localhost}:4500`,
    },
    jwtSecretKey: 'undefined',
    publicKeyPath: 'pubKey',
    mode: 'saas',
    environment: 'development',
    gmail: undefined,
    isConfigUnlimitedRequests: false,
    isOrgTrail: true,
    logLevel: 'debug',
};

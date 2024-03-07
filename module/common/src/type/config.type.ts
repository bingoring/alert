import { EncryptKeyType } from './crypto.type';
import { LogLevelType } from '@root/log/type';

export interface ConfigType {
    tatumUrl: string;
    version: string;
    useEmail: boolean;
    encrypt?: EncryptKeyType;
    mode: ModeType;
    jwtSecretKey?: string;
    logFilePath: string;
    isUsingLocalstack: boolean;
    environment: 'production' | 'development';
    pg: ServerInfoType;
    redis: RedisInfoType;
    pulsar: ServerInfoType;
    api: ServerInfoType;
    user: ServerInfoType;
    gateway: ServerInfoType;
    logCollector: ServerInfoType;
    logSink: ServerInfoType;
    logKeeper: ServerInfoType;
    logLevel: LogLevelType;
    dataCollector: ServerInfoType;
    dataProcessor: ServerInfoType;
    scanner: ServerInfoType;
    reporter: ServerInfoType;
    agent: ServerInfoType;
    kbBank: ServerInfoType;
    hanaBank: ServerInfoType;
    localstack: ServerInfoType;
    seaweedFSMaster: ServerInfoType;
    seaweedFSVolume: ServerInfoType;
    seaweedFSFiler: ServerInfoType;
    grafana: ServerInfoType;
    publicKeyPath: string;
    s3UrlPath: S3UrlPathConfigType;
    gmail?: GmailConfigType;
    jiraInterMediaPath?: string;
    isConfigUnlimitedRequests: boolean;
    isOrgTrail: boolean;
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

export interface S3UrlPathConfigType {
    cloud?: string;
    cloudOrg?: string;
    cloudOrgStackSet?: string;
}

const localhost = '127.0.0.1';
export const decryptKeyList = ['passwd', 'accessKeyId', 'secretAccessKey', 'jwtSecretKey'];
export const ModeList = ['saas', 'installed'] as const;
export type ModeType = (typeof ModeList)[number];
export const processKeyList = [
    'pg',
    'redis',
    'pulsar',
    'api',
    'user',
    'gateway',
    'logCollector',
    'logSink',
    'logKeeper',
    'dataCollector',
    'dataProcessor',
    'scanner',
    'reporter',
    'agent',
    'seaweedFSMaster',
    'seaweedFSVolume',
    'seaweedFSFiler',
    'grafana',
] as (keyof ConfigType)[];

export const DefaultConfig: ConfigType = {
    tatumUrl: 'http://localhost:4000',
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
    api: {
        host: localhost,
        port: 4000,
        protocol: 'http',
        url: `http://${localhost}:4000`,
    },
    user: {
        host: localhost,
        port: 6001,
        protocol: 'http',
        url: `http://${localhost}:6001`,
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
    localstack: {
        host: localhost,
        port: 4566,
        protocol: 'http',
        url: `http://${localhost}:4566/`,
    },
    dataCollector: {
        host: localhost,
        port: 4300,
        protocol: 'http',
        url: `http://${localhost}:4300`,
        clustering: 2,
    },
    logCollector: {
        host: localhost,
        port: 4100,
        protocol: 'http',
        url: `http://${localhost}:4100`,
    },
    logSink: {
        host: localhost,
        port: 4400,
        protocol: 'http',
        url: `http://${localhost}:4400`,
    },
    logKeeper: {
        host: localhost,
        port: 4800,
        protocol: 'http',
        url: `http://${localhost}:4800`,
    },
    dataProcessor: {
        host: localhost,
        port: 4200,
        protocol: 'http',
        url: `http://${localhost}:4200`,
    },
    seaweedFSMaster: {
        host: localhost,
        port: 9333,
        protocol: 'http',
        url: `http://${localhost}:9333`,
    },
    seaweedFSVolume: {
        host: localhost,
        port: 9222,
        protocol: 'http',
        url: `http://${localhost}:9222`,
    },
    seaweedFSFiler: {
        host: localhost,
        port: 9888,
        protocol: 'http',
        url: `http://${localhost}:9888`,
    },
    scanner: {
        host: localhost,
        port: 4500,
        protocol: 'http',
        url: `http://${localhost}:4500`,
    },
    reporter: {
        host: localhost,
        port: 4600,
        protocol: 'http',
        url: `http://${localhost}:4600`,
    },
    agent: {
        host: localhost,
        port: 4700,
        protocol: 'http',
        url: `http://${localhost}:4700`,
    },
    kbBank: {
        host: localhost,
        port: 4444,
        protocol: 'http',
        url: `http://${localhost}:4444`,
    },
    hanaBank: {
        host: localhost,
        port: 4445,
        protocol: 'http',
        url: `http://${localhost}:4445`,
    },
    grafana: {
        host: localhost,
        port: 9090,
        protocol: 'http',
        url: `http://${localhost}:9090`,
    },
    jwtSecretKey: 'undefined',
    logFilePath: 'logs/',
    publicKeyPath: 'pubKey',
    mode: 'saas',
    credentials: {
        aws: {
            roleArn: '',
            certificatePath: './cert.pem',
            privateKeyPath: './private.pem',
            cloudRoleName: 'TatumSecurityAccessRole',
            orgRoleName: 'TatumSecurityOrganizationAccessRole',
        },
    },
    isUsingLocalstack: false,
    environment: 'development',
    s3UrlPath: {},
    gmail: undefined,
    isConfigUnlimitedRequests: false,
    isOrgTrail: true,
    logLevel: 'debug',
};

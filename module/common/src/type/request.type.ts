import { AxiosProxyConfig } from 'axios';

export type QueryType = Record<string, string | string[] | number | number[] | boolean | undefined>;
export type BodyType = Record<string, any>;
export type HeadersType = Record<string, string>;
export type MethodType = 'get' | 'post' | 'patch' | 'put' | 'delete';
export type ResType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';

export interface OptionType {
    data?: BodyType;
    params?: QueryType;
    headers?: HeadersType;
    filePath?: string;
    timeout?: number;
    responseType?: ResType;
    method: MethodType;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    baseURL?: string;
}

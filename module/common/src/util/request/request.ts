import { OptionType } from '../../type/request.type';
import axios, { AxiosRequestConfig } from 'axios';
import { AbstractRetryStrategy, NonRetryStrategy } from '../retry-strategy';
import fetch, { RequestInit } from 'node-fetch';

export type RequestOptionsType = { retryStrategy?: AbstractRetryStrategy };

export class Request {
    private readonly baseURL: string;
    private readonly retryStrategy: AbstractRetryStrategy;

    constructor(url: string, options?: RequestOptionsType) {
        this.baseURL = url;
        this.retryStrategy = options?.retryStrategy ?? new NonRetryStrategy();
    }

    public async send<ReturnData>(path: string, option: OptionType): Promise<ReturnData> {
        return this.retryStrategy.execPromiseLogic(async () => {
            const timeout = option.timeout ?? 0;

            const config: AxiosRequestConfig = {
                baseURL: this.baseURL,
                ...option,
                url: path,
                timeout,
            };

            const response = await axios(config);
            return response.data as ReturnData;
        });
    }

    public async sendByStream<ReturnData>(path: string, option: RequestInit): Promise<ReturnData> {
        return this.retryStrategy.execPromiseLogic(async () => {
            const timeout = option.timeout ?? 0;

            const config: RequestInit = {
                ...option,
                timeout,
            };

            const response = await fetch(`${this.baseURL}/${path}`, config);
            return response.json() as ReturnData;
        });
    }
}

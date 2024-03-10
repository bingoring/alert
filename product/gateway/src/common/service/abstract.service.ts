import type { ConfigType } from '@root/common/type';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ServerConnectError } from '@root/common/error/requester.error';
import { CustomHttpError } from '@root/nest/error/http.error';

export abstract class AbstractService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async request<ResponseData, RequestData = any>(
        url: string,
        option?: AxiosRequestConfig<RequestData>
    ): Promise<AxiosResponse<ResponseData, RequestData>> {
        const timeout = option?.timeout ?? 5000;
        const config: AxiosRequestConfig<RequestData> = {
            timeout,
            url,
            baseURL: this.baseUrl,
            ...option,
        };

        try {
            const response: AxiosResponse<ResponseData, RequestData> = await axios(config);
            return response;
        } catch (e) {
            if (e instanceof AxiosError && e.response?.data !== undefined) {
                const data = e.response?.data;
                const statusCode = data?.statusCode;

                if (statusCode !== undefined) {
                    throw new CustomHttpError(statusCode, data.error?.code, data.message ?? data.error?.message);
                }
            }

            if (e instanceof Error && e.message.includes('connect ECONNREFUSED ')) {
                const errorUrl = e.message.split('connect ECONNREFUSED ')[1];
                const url = (() => {
                    for (const service in env) {
                        const serverInfo = env[service as keyof ConfigType];
                        const isServerEnv = typeof serverInfo === 'object' && 'protocol' in serverInfo;

                        if (isServerEnv && serverInfo.url.includes(errorUrl)) {
                            return `"${service}" service (url: ${errorUrl})`;
                        }
                    }

                    return errorUrl;
                })();

                throw new ServerConnectError(url);
            }

            throw e;
        }
    }
}

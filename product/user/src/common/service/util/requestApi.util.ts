import { AxiosRequestConfig } from 'axios';
import { AbstractService } from '../abstract.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemApiService extends AbstractService {
    constructor() {
        super(env.api.url);
    }

    public async requestApi<ResponseData = any, RequestData = any>(
        url: string,
        option: AxiosRequestConfig<RequestData>
    ) {
        option.headers = {
            'x-tenant-id': 'public',
        };

        return await this.request<ResponseData, RequestData>(url, option);
    }
}

import { AxiosRequestConfig } from 'axios';
import { AbstractService } from './abstract.service';
import { SessionType } from '../decorator/session.decorator';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { UserSessionToken } from '../module/session.module';

@Injectable({ scope: Scope.DEFAULT })
export abstract class AbstractApiService extends AbstractService {
    constructor(@Inject(UserSessionToken) private readonly session: SessionType) {
        super(env.api.url);
    }

    public async requestApi<ResponseData = any, RequestData = any>(
        url: string,
        option: AxiosRequestConfig<RequestData>
    ) {
        option.headers = {
            ...option.headers,
            'x-tenant-id': this.session.organizationId,
            'x-user-id': this.session.user.id,
            'x-login-id': this.session.user.loginId,
        };

        return await this.request<ResponseData, RequestData>(url, option);
    }
}

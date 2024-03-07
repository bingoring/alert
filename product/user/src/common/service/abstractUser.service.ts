import { AxiosRequestConfig } from 'axios';
import { AbstractService } from './abstract.service';
import { AbstractGatewayResponse } from '@backend-x/nest/constant/response.constant';
import { CustomHttpError } from '@backend-x/nest/error/http.error';
import { HttpStatusCode } from '@backend-x/nest/constant/httpStatus.constant';
import { ValueNotFound } from '@backend-x/gateway/constant/error/request/response.error';
import { Injectable, Scope } from '@nestjs/common';
import qs from 'qs';

export * from './util/userService.util';

@Injectable({ scope: Scope.REQUEST })
export abstract class AbstractUserService extends AbstractService {
    constructor() {
        super(env.user.url);
    }

    protected async requestUser<ResponseData = AbstractGatewayResponse, RequestData = any>(
        url: string,
        option: AxiosRequestConfig<RequestData> & { userId: string }
    ) {
        option.headers = {
            ...option.headers,
            'X-USER-ID': option.userId,
        };

        option.paramsSerializer = (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        };

        try {
            return await this.request<ResponseData, RequestData>(url, option);
        } catch (e) {
            if (e instanceof CustomHttpError) {
                if (e.getStatus() === HttpStatusCode.notFound) {
                    throw new ValueNotFound();
                }
            }

            throw e;
        }
    }
}

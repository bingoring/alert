import type { AbstractBaseResponse } from '@root/nest/constant/response.constant';
import { HttpException } from '@nestjs/common';
import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';

export abstract class AbstractHttpError extends HttpException {
    private readonly responseBody: AbstractGatewayResponse;
    constructor(statusCode: AbstractBaseResponse['statusCode'], code: string, message?: string) {
        super(message ?? code, statusCode);
        this.responseBody = { error: { code, message }, statusCode };
    }

    public getResponseBody() {
        return this.responseBody;
    }
}

export class CustomHttpError extends AbstractHttpError {}

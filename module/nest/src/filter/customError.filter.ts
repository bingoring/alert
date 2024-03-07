import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { CustomError } from '@root/common/custom-error/error';

@Catch(CustomError)
export class CustomErrorExceptionFilter implements ExceptionFilter {
    public catch(exception: CustomError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const httpStatus = exception.statusCode;

        const code = this.toCode(exception.name) ?? 'NOT_DEFINED_ERROR';
        const message = exception.message;

        const responseBody: AbstractGatewayResponse = {
            statusCode: httpStatus,
            error: {
                code,
                message,
            },
        };

        log.error(exception);

        response.status(httpStatus).json(responseBody);
    }

    private toCode(name: string | undefined) {
        if (name === undefined) {
            return name;
        }

        const result = name.replace(/[A-Z]/g, (v) => `_${v}`).toUpperCase();

        if (result[0] === '_') {
            return result.slice(1);
        }

        return result;
    }
}

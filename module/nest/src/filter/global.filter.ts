import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { AbstractBaseResponse } from '../constant/response.constant';
import { CustomError } from '@root/common/custom-error/error';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    public catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const httpStatus = (() => {
            if (exception instanceof NotFoundException) {
                return HttpStatus.NOT_FOUND;
            } else if (exception instanceof CustomError) {
                return exception.statusCode;
            } else {
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }
        })();

        const message = (() => {
            if (exception instanceof Error) {
                return exception.message;
            }
            return undefined;
        })();

        const responseBody: AbstractBaseResponse = {
            statusCode: httpStatus,
            message,
        };

        log.error(exception);

        response.status(httpStatus).json(responseBody);
    }
}

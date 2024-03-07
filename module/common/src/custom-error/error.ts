import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';
import { StatusCodeValueType } from '@root/nest/type';

export class CustomError extends Error {
    public readonly statusCode: StatusCodeValueType;
    constructor(message: string, statusCode: StatusCodeValueType = HttpStatusCode.internalError) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class UserError extends CustomError {
    constructor(message: string, statusCode: StatusCodeValueType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}

export class SystemError extends CustomError {
    constructor(message: string, statusCode: StatusCodeValueType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}

export class AccessError extends CustomError {
    constructor(message: string, statusCode: StatusCodeValueType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}

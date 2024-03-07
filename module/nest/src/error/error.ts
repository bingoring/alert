import { SystemError } from '@root/common/custom-error/error';
import { HttpStatusCode } from '../constant/httpStatus.constant';

export class InvalidULIDException extends SystemError {
    constructor() {
        super('Invalid ULID', HttpStatusCode.badRequest);
        this.name = 'InvalidULIDException';
    }
}

export class UndefinedTenantIdHeaderError extends SystemError {
    constructor() {
        super(`'x-tenant-id' header is empty`, HttpStatusCode.badRequest);
        this.name = 'UndefinedTenantIdHeaderError';
    }
}

export class UndefinedAgentIdHeaderError extends SystemError {
    constructor() {
        super(`'agent-id' header is empty`, HttpStatusCode.badRequest);
        this.name = 'UndefinedAgentIdHeaderError';
    }
}

export class UndefinedApiKeyHeaderError extends SystemError {
    constructor() {
        super(`'x-api-key' header is empty`, HttpStatusCode.badRequest);
        this.name = 'UndefinedApiKeyHeaderError';
    }
}

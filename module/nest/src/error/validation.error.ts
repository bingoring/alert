import { HttpStatusCode } from '../constant/httpStatus.constant';
import { SystemError } from '@root/common/custom-error/error';

export class ValidationFailException extends SystemError {
    constructor(message: string) {
        super(message, HttpStatusCode.badRequest);
        this.name = 'VALIDATION_ERROR';
    }
}

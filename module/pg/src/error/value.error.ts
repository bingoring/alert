import { UserError } from '@root/common/custom-error/error';
import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';

export class ValueNotFoundError extends UserError {
    constructor() {
        super('Value not found.', HttpStatusCode.badRequest);
        this.name = 'ValueNotFoundError';
    }
}

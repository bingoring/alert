import { AbstractHttpError } from '@root/nest/error/http.error';

export class ValueNotFound extends AbstractHttpError {
    constructor(item = 'Value') {
        super(400, 'VALUE_NOT_FOUND', `${item} not found.`);
    }
}

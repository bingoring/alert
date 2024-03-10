import { AbstractHttpError } from '@root/nest/error/http.error';
import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';

export class SessionNotFound extends AbstractHttpError {
    constructor() {
        super(HttpStatusCode.unauthorized, 'SESSION_NOT_FOUND', 'Session not found.');
    }
}

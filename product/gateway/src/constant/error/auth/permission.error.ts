import { UserPermissionType } from '../../permission.constant';
import { AbstractHttpError } from '@root/nest/error/http.error';
import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';

export class PermissionForbiddenError extends AbstractHttpError {
    constructor(permissionList: UserPermissionType[]) {
        super(HttpStatusCode.forbidden, 'PERMISSION_FORBIDDEN_ERROR', `${permissionList.join()} not authorized.`);
    }
}

export class AdminPermissionForbiddenError extends AbstractHttpError {
    constructor() {
        super(HttpStatusCode.forbidden, 'ADMIN_PERMISSION_FORBIDDEN_ERROR', 'ADMIN not authorized.');
    }
}

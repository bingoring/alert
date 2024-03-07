import { SystemPermissionType } from '@backend-x/gateway/constant/permission.constant';
import { UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guard/permission.guard';
import { SessionGuard } from '../guard/session.guard';

export const Permission = (...permission: SystemPermissionType[]) => {
    return UseGuards(SessionGuard, new PermissionGuard(permission));
};

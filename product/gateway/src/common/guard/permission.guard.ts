export { SystemPermissionMap } from '@root/gateway/constant/permission.constant';
import { Request } from 'express';
import {
    SystemPermissionList,
    SystemPermissionMap,
    SystemPermissionType,
    UserPermissionType,
} from '@root/gateway/constant/permission.constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
    AdminPermissionForbiddenError,
    PermissionForbiddenError,
} from '@root/gateway/constant/error/auth/permission.error';
import { UserService } from '@root/gateway/router/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    private userService!: UserService;
    constructor(private readonly allowList: SystemPermissionType[]) {}

    public async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest() as Request;
        this.userService ??= new UserService();

        if ((this.allowList ?? []).length === 0) {
            return true;
        }

        const isAdminGuard = this.allowList.includes(SystemPermissionMap.admin);
        const permissionList = await this.getPermissionList(request);

        return this.isAllow(isAdminGuard, permissionList, this.allowList);
    }

    private isAllow(isAdminGuard: boolean, permissionList: SystemPermissionType[], allowList: SystemPermissionType[]) {
        for (const allowPermission of allowList) {
            if ((permissionList ?? []).includes(allowPermission)) {
                return true;
            }
        }

        if (isAdminGuard) {
            throw new AdminPermissionForbiddenError();
        } else {
            throw new PermissionForbiddenError(allowList as UserPermissionType[]);
        }
    }

    private async getPermissionList(request: Request) {
        const roleId = request.session.activeRole?.roleId;
        const userId = request.session.user?.id;

        if (userId === undefined) {
            return [];
        }

        const userResponse = await this.userService.get(userId, { userId, page: 1, limit: 10 });
        const [user] = userResponse.value.itemList;

        if (roleId !== undefined && roleId !== user.activeRole?.roleId) {
            request.session.activeRole = user.activeRole;
            request.session.save();
        }

        if (user?.isAdmin) {
            request.isAdmin = true;
            return SystemPermissionList;
        }

        const { value } = await this.userService.getPermission(userId, {});
        return value.permissionList;
    }
}

import type { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionNotFound } from '@backend-x/gateway/constant/error/auth/session.error';

@Injectable()
export class SessionGuard implements CanActivate {
    public canActivate(ctx: ExecutionContext): boolean {
        const request = ctx.switchToHttp().getRequest() as Request;

        if (request.session === undefined || request.session.isTemp) {
            return false;
        }

        const isExistSession = request.session.user?.id !== undefined;

        if (!isExistSession) {
            throw new SessionNotFound();
        }

        return isExistSession;
    }
}

@Injectable()
export class TempSessionGuard implements CanActivate {
    public canActivate(ctx: ExecutionContext): boolean {
        const request = ctx.switchToHttp().getRequest() as Request;

        if (!request.session.isTemp) {
            return false;
        }

        const isExistSession = request.session.user?.id !== undefined || request.session.token !== undefined;

        if (!isExistSession) {
            throw new SessionNotFound();
        }

        return isExistSession;
    }
}

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwtStrategy') {
    public override canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    public override handleRequest(err: any, token: any, info: any, context: any) {
        if (err || !token) {
            throw err || new UnauthorizedException();
        }

        context.switchToHttp().getRequest().token = token;
        return token;
    }
}

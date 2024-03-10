import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from './login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly loginService: LoginService) {
        super({
            usernameField: 'loginId',
            passwordField: 'password',
        });
    }

    public async validate(loginId: string, password: string, done: CallableFunction): Promise<any> {
        const user = await this.loginService.validateUser({ loginId, password });
        if (!user) {
            throw new UnauthorizedException();
        }
        return done(null, user);
    }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenType } from '../type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
    constructor() {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.jwtSecretKey,
            passReqToCallback: true,
        });
    }

    public async validate(req: Request, payload: TokenType) {
        return payload;
    }
}

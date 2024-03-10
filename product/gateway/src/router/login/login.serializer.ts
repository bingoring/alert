import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserRepository } from '@root/pg/repository/user';
import { LoginPostBodyDto } from './dto';

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {
        super();
    }

    public serializeUser(user: any, done: CallableFunction) {
        console.log(user);
        //user객체는 무거우니, userId만 뽑아서 세션에 저장한다.
        done(null, user);
    }

    public async deserializeUser(payload: LoginPostBodyDto, done: CallableFunction) {
        return await this.userRepository
            .getRepository()
            .findOne({
                where: { loginId: payload.loginId },
            })
            .then((user) => {
                console.log('user', user);
                done(null, user);
            })
            .catch((err) => done(err));
    }
}

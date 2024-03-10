import { AbstractUserService } from 'product/gateway/src/common/service/abstractUser.service';
import { Inject, Injectable } from '@nestjs/common';
import { LoginPostBodyDto } from './dto';
import { UserRepository } from '@root/pg/repository/user';
import { UserEntity } from '@root/pg/entity/user/user.entity';

@Injectable()
export class LoginService extends AbstractUserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository // @Inject('UserRepository') private readonly userRepository: UserRepository
    ) {
        super();
    }

    public async validateUser(body: LoginPostBodyDto): Promise<UserEntity | null> {
        if (env.useEmail === false && body.password === undefined) {
            throw new Error('password is undefined');
        }

        const user = await this.userRepository.getRepository().findOne({
            where: {
                loginId: body.loginId,
            },
        });
        return user;
    }
}

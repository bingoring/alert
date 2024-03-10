import { AbstractUserService } from 'product/gateway/src/common/service/abstractUser.service';
import { Inject, Injectable } from '@nestjs/common';
import { SignUpPostBodyDto, SignUpPostResponseValueType } from './dto';
import { UserRepository } from '@root/pg/repository/user';

@Injectable()
export class SignUpService extends AbstractUserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository // @Inject('UserRepository') private readonly userRepository: UserRepository
    ) {
        super();
    }

    public async signUp(body: SignUpPostBodyDto): Promise<SignUpPostResponseValueType> {
        if (env.useEmail === false && body.password === undefined) {
            throw new Error('password is undefined');
        }

        const signUpUser = await this.userRepository.create(body.toUserCreateCommand);

        return signUpUser;
    }

    // public async enterPassword(userId: string, body: EnterPasswordBodyDto) {
    //     const response = await this.requestUser<EnterPasswordResponseDto>('/v1/sign-up/enter-password', {
    //         method: 'POST',
    //         data: body,
    //         userId,
    //     });
    //     return response.data;
    // }
}

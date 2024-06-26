import { AbstractUserService } from 'product/gateway/src/common/service/abstractUser.service';
import { Inject, Injectable } from '@nestjs/common';
import { AlarmGetBodyDto, AlarmGetResponseValueType, AlarmPostBodyDto, AlarmPostResponseValueType } from './dto';
import { AlarmRepository } from '@root/pg/repository/alarm';

@Injectable()
export class AlarmService extends AbstractUserService {
    constructor(
        @Inject('AlarmRepository') private readonly alarmRepostiroy: AlarmRepository // @Inject('UserRepository') private readonly userRepository: UserRepository
    ) {
        super();
    }

    public async get(_: AlarmGetBodyDto): Promise<AlarmGetResponseValueType> {
        const itemList = await this.alarmRepostiroy.getRepository().find();

        return {
            itemList,
        };
    }

    public async post(body: AlarmPostBodyDto): Promise<AlarmPostResponseValueType> {
        if (body.alarmTime === undefined) {
            throw new Error('alarm time is undefined');
        }

        const alarm = await this.alarmRepostiroy.create(body.toAlarmCreateCommand);

        return alarm;
    }
}

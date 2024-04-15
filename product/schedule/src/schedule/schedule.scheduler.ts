import { Injectable } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlarmStrategy } from './strategy/alarm.strategy';
import { NonActionStrategy } from './strategy/post-load-strategy';
import { MessageProducer } from '@root/message-queue/msgProducer';

@Injectable()
export class Scheduler {
    constructor(private readonly scheduleService: ScheduleService, private readonly messageProducer: MessageProducer) {}

    @Cron(CronExpression.EVERY_MINUTE, { name: 'ALARM' })
    public async alarm() {
        await this.scheduleService.loadStatData(new AlarmStrategy(new NonActionStrategy(), this.messageProducer));
    }
}

import { MessageProducer } from '@root/message-queue/msgProducer';
import { AbstractDataLoadStrategy } from './dataLoad.strategy';
import { AbstractPostLoadStrategy } from './post-load-strategy';
import { AlarmRepository } from '@root/pg/repository/alarm';
import { Between, DataSource } from 'typeorm';
import { AlarmEntity } from '@root/pg/entity/alarm';

export class AlarmStrategy extends AbstractDataLoadStrategy {
    constructor(postLoadStrategy: AbstractPostLoadStrategy, private readonly messageProducer: MessageProducer) {
        super('ALARM', postLoadStrategy);
    }

    public override async computeAndSave(dataSource: DataSource, postLoadStrategy: AbstractPostLoadStrategy) {
        const alarmRepository = new AlarmRepository({ dataSource });
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const alarmList = await alarmRepository.getRepository().find({
            where: {
                alarmTime: Between(startOfToday, endOfToday),
            },
        });

        if (alarmList.length > 0) {
            await this.produceMessage(alarmList);
        }

        await postLoadStrategy.exec(alarmRepository);
    }

    private async produceMessage(alarmList: AlarmEntity[]) {
        for (const alarm of alarmList) {
            await this.messageProducer.send(JSON.stringify(alarm));
        }
    }
}

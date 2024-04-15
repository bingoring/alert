import { Module } from '@nestjs/common';
import { MessageProducer, PulsarClientFactory, PulsarProduceAdapter, TopicNameMap } from '@root/message-queue/index';
import { ScheduleService } from './schedule.service';
import { Scheduler } from './schedule.scheduler';

@Module({
    providers: [
        Scheduler,
        ScheduleService,
        {
            provide: MessageProducer,
            useFactory: () => {
                const pulsarProduceAdapter = new PulsarProduceAdapter(
                    PulsarClientFactory.create({ pulsarUrl: env.pulsar.url, password: env.pulsar.passwd }),
                    TopicNameMap.alarmTopic
                );
                return new MessageProducer(pulsarProduceAdapter);
            },
        },
    ],
})
export class ScheduleModule {}

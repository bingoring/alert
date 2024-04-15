import { Module } from '@nestjs/common';
import { PulsarClientFactory, PulsarConsumeAdapter, SubscriptionNameMap } from '@root/message-queue/mq-adapter';
import { TopicNameMap } from '@root/message-queue/topic.type';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
import { MessageConsumer } from '@root/message-queue/msgConsumer';

@Module({
    controllers: [SseController],
    providers: [
        SseService,
        {
            provide: MessageConsumer,
            useFactory: () => {
                const pulsarConsumeAdapter = new PulsarConsumeAdapter(
                    PulsarClientFactory.create({ pulsarUrl: env.pulsar.url, password: env.pulsar.passwd }),
                    {
                        topic: TopicNameMap.alarmTopic,
                        subscription: SubscriptionNameMap.sseSubscription,
                        subscriptionType: 'Shared',
                        receiverQueueSize: 1,
                    }
                );
                return new MessageConsumer(pulsarConsumeAdapter);
            },
        },
    ],
})
export class SseModule {}

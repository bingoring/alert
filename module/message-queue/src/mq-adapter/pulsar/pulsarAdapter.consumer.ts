import { Client, Consumer, ConsumerConfig } from 'pulsar-client';
import { AbstractMqConsumeAdapter } from '../mqAdapter.consumer';
import { ConsumerOptionType, PulsarConsumerAckStyleType } from './consumer.type';

export class PulsarConsumeAdapter extends AbstractMqConsumeAdapter {
    private consumer?: Consumer;
    private readonly ackStyle: PulsarConsumerAckStyleType;
    private readonly option: ConsumerConfig;

    constructor(private readonly pulsarClient: Client, option: ConsumerOptionType) {
        super();
        this.ackStyle = option.ackStyle ?? 'AFTER_CALLBACK';
        this.option = { ...option };
    }

    public async subscribe(msgCallback: (receivedMsg: string) => void | Promise<void>): Promise<void> {
        if (this.consumer !== undefined) {
            await this.consumer.unsubscribe();
            this.consumer = undefined;
        }

        this.consumer = await this.pulsarClient.subscribe({
            receiverQueueSize: 1000,
            ...this.option,
            listener: async (message, consumer) => {
                const msg = message.getData().toString();
                if (this.ackStyle === 'AFTER_CALLBACK') {
                    await msgCallback(msg);
                    await consumer.acknowledgeId(message.getMessageId());
                } else {
                    await consumer.acknowledgeId(message.getMessageId());
                    await msgCallback(msg);
                }
            },
        });
    }
}

import { AbstractMqConsumeAdapter } from './mq-adapter';

export class MessageConsumer {
    constructor(private mqConsumeAdapter: AbstractMqConsumeAdapter) {}

    public async subscribe(msgCallback: (receivedMsg: string) => void | Promise<void>): Promise<void> {
        await this.mqConsumeAdapter.subscribe(msgCallback);
    }

    public setMqConsumerAdapter(mqConsumerAdapter: AbstractMqConsumeAdapter) {
        this.mqConsumeAdapter = mqConsumerAdapter;
    }
}

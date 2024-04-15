import { AbstractMqProduceAdapter } from './mq-adapter';
import { AbstractRetryStrategy, ExpBackoffRetryStrategy } from '@root/common/util/retry-strategy';

export class MessageProducer {
    constructor(
        private mqProduceAdapter: AbstractMqProduceAdapter,
        private readonly retryStrategy: AbstractRetryStrategy = new ExpBackoffRetryStrategy()
    ) {}

    public async send(...msgList: string[]): Promise<void> {
        await this.retryStrategy.execPromiseLogic(async () => {
            await this.mqProduceAdapter.send(...msgList);
        });
    }

    public setMqProducerAdapter(mqProducerAdapter: AbstractMqProduceAdapter): void {
        this.mqProduceAdapter = mqProducerAdapter;
    }
}

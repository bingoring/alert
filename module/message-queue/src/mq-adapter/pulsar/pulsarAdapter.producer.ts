import { Client, Producer } from 'pulsar-client';
import { AbstractMqProduceAdapter } from '../mqAdapter.producer';
import { TopicNameType } from '../..';
import { SendOptionType } from './producer.type';
import { MqProducerAdapterSendMsgException } from '../exception';

export class PulsarProduceAdapter extends AbstractMqProduceAdapter {
    constructor(
        private readonly pulsarClient: Client,
        private readonly topic: TopicNameType,
        private readonly option: SendOptionType = {}
    ) {
        super();
    }

    public override async send(...msgList: string[]): Promise<void> {
        await this.wrapWithProducerContext(async (producer) => {
            for await (const msg of msgList) {
                await producer.send({ data: Buffer.from(msg), ...this.option });
            }
        });
    }

    private async wrapWithProducerContext(callback: (producer: Producer) => Promise<void>): Promise<void> {
        let producer: Producer | undefined = undefined;
        try {
            producer = await this.pulsarClient.createProducer({ topic: this.topic });
            await callback(producer);
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            throw new MqProducerAdapterSendMsgException(PulsarProduceAdapter.name, errMsg);
        } finally {
            if (producer === undefined) {
                return;
            }
            await producer.close();
        }
    }
}

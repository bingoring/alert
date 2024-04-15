import { AbstractMqProduceAdapter } from '../mqAdapter.producer';
import { InMemoryMQClient } from './inMemoryMQClient';

export class InMemoryProduceAdapter extends AbstractMqProduceAdapter {
    constructor(private readonly inMemoryMQClient: InMemoryMQClient, private readonly topic: string) {
        super();
    }

    public override async send(...msgList: string[]): Promise<void> {
        msgList.forEach((msg) => this.inMemoryMQClient.send({ topic: this.topic, data: msg }));
    }
}

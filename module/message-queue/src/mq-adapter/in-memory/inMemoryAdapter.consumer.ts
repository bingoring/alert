import { AbstractMqConsumeAdapter } from '../mqAdapter.consumer';
import { InMemoryMQClient } from './inMemoryMQClient';

export class InMemoryConsumeAdapter extends AbstractMqConsumeAdapter {
    constructor(private readonly inMemoryMQClient: InMemoryMQClient, private readonly topic: string) {
        super();
    }

    public override async subscribe(msgCallback: (msg: string) => void | Promise<void>): Promise<void> {
        this.inMemoryMQClient.subscribe({
            topic: this.topic,
            listener: async (data) => {
                await msgCallback(data);
            },
        });
    }
}

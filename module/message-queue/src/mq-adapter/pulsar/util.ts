import { AuthenticationToken, Client } from 'pulsar-client';
import { TopicNameMap } from '../../topic.type';

export class PulsarClientFactory {
    public static create(option: { pulsarUrl: string; password?: string }): Client {
        const authToken =
            option.password !== undefined ? new AuthenticationToken({ token: option.password }) : undefined;
        return new Client({ serviceUrl: option.pulsarUrl, operationTimeoutSeconds: 5, authentication: authToken });
    }
}

export class PulsarHealthChecker {
    constructor(private readonly pulsarUrl: string, private readonly password?: string) {}

    public async isHealthy(topic?: string): Promise<boolean> {
        const pulsarClient = PulsarClientFactory.create({ pulsarUrl: this.pulsarUrl, password: this.password });
        try {
            const tmpProducer = await pulsarClient.createProducer({ topic: topic ?? TopicNameMap.cloudLogTopic });
            return tmpProducer.isConnected();
        } catch (err) {
            log.error(err);
            return false;
        } finally {
            await pulsarClient.close();
        }
    }
}

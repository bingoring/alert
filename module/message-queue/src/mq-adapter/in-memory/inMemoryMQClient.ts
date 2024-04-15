import { ReplaySubject } from 'rxjs';

export class InMemoryMQClient {
    private readonly pipelineByTopic: Record<string, ReplaySubject<string>> = {};

    public send({ topic, data }: { topic: string; data: string }): void {
        this.prepareTopic(topic);
        this.pipelineByTopic[topic].next(data);
    }

    public subscribe({ topic, listener }: { topic: string; listener: (data: string) => void }): void {
        this.prepareTopic(topic);
        this.pipelineByTopic[topic].subscribe({
            next: (data) => {
                listener(data);
            },
        });
    }

    private prepareTopic(topic: string): void {
        if (topic in this.pipelineByTopic) {
            return;
        }
        this.pipelineByTopic[topic] = new ReplaySubject<string>(Infinity);
    }
}

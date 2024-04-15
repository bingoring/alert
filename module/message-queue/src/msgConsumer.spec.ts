import { MessageConsumer } from './msgConsumer';
import { InMemoryConsumeAdapter, InMemoryMQClient, InMemoryProduceAdapter } from './mq-adapter/in-memory';
import { MessageProducer } from './msgProducer';

describe('MsgConsumer Test', () => {
    describe('subscribe', () => {
        test('OK', async () => {
            const inMemoryMQClient = new InMemoryMQClient();

            const inMemoryConsumeAdapter = new InMemoryConsumeAdapter(inMemoryMQClient, 'test');
            const mqConsumer = new MessageConsumer(inMemoryConsumeAdapter);

            const inMemoryProduceAdapter = new InMemoryProduceAdapter(inMemoryMQClient, 'test');
            const mqProducer = new MessageProducer(inMemoryProduceAdapter);

            const testMsgList = ['dsanuwnuw', 'dmnruvnun', 'zxcnjuqsd'];
            const testResultList: string[] = [];

            mqConsumer.subscribe(((msg) => {
                testResultList.push(msg);
            }) as (msg: string) => Promise<void>);

            for await (const msg of testMsgList) {
                await mqProducer.send(msg);
            }

            testMsgList.forEach((msg) => {
                expect(testMsgList).toContain(msg);
            });
        });
    });
});

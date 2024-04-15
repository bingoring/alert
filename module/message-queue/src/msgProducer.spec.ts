import { MessageProducer } from './msgProducer';
import { InMemoryProduceAdapter } from './mq-adapter/in-memory';
import { InMemoryMQClient } from './mq-adapter/in-memory/inMemoryMQClient';

describe('MessageProducer Test', () => {
    describe('send', () => {
        test('OK', async () => {
            const producerSpy = jest.spyOn(MessageProducer.prototype, 'send');
            const inMemoryProduceAdapter = new InMemoryProduceAdapter(new InMemoryMQClient(), 'test');
            const msgProducer = new MessageProducer(inMemoryProduceAdapter);

            const testMsgList = ['scdvvjnwv', 'oqneouwnvulv', 'akjnvinv'];
            const testResultList: string[] = [];

            for await (const msg of testMsgList) {
                await msgProducer.send(msg);
            }

            testResultList.forEach((msg) => {
                expect(producerSpy).toBeCalledWith(msg);
            });
        });
    });
});

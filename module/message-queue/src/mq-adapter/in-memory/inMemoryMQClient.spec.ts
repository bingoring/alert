import { InMemoryMQClient } from './inMemoryMQClient';

describe('InMemoryMQClient Test', () => {
    describe('subscribe & send', () => {
        test('sub -> send sequence is work successfully', () => {
            const inMemoryMQClient = new InMemoryMQClient();
            const targetTopic = 'test-topic';

            const resultList: string[] = [];

            inMemoryMQClient.subscribe({ topic: targetTopic, listener: (data) => resultList.push(data) });

            const testDataList = ['neqvuiwnvoudnf', 'ncidvnsdjkca', 'scnsdkvnskh'];

            testDataList.forEach((data) => inMemoryMQClient.send({ topic: targetTopic, data }));

            testDataList.forEach((data) => {
                expect(resultList).toContain(data);
            });
        });
    });

    test('send -> sub sequence is work successfully', () => {
        const inMemoryMQClient = new InMemoryMQClient();
        const targetTopic = 'test-topic';

        const resultList: string[] = [];

        const testDataList = ['neqvuiwnvoudnf', 'ncidvnsdjkca', 'scnsdkvnskh'];

        testDataList.forEach((data) => inMemoryMQClient.send({ topic: targetTopic, data }));

        inMemoryMQClient.subscribe({ topic: targetTopic, listener: (data) => resultList.push(data) });

        testDataList.forEach((data) => {
            expect(resultList).toContain(data);
        });
    });
});

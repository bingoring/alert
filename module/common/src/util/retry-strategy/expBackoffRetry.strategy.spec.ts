import { ExpBackoffRetryStrategy } from './expBackoffRetry.strategy';
class DummyObjectForTest {
    public exec(): Promise<void> {
        return new Promise<void>((resolve) => resolve());
    }
}

describe('ExponentialBackoffRetryStrategy Test', () => {
    let dummyObject: DummyObjectForTest;
    let expBackoffRetryStrategy: ExpBackoffRetryStrategy;

    let spyExec: jest.SpyInstance;

    beforeEach(() => {
        dummyObject = new DummyObjectForTest();
        expBackoffRetryStrategy = new ExpBackoffRetryStrategy();

        spyExec = jest.spyOn(dummyObject, 'exec');
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    describe('execPromiseLogic', () => {
        test('logic exec successfully, retry logic is not work', async () => {
            await expBackoffRetryStrategy.execPromiseLogic<void>(async () => {
                await dummyObject.exec();
            });

            expect(spyExec).toHaveBeenCalledTimes(1);
        });

        test('logic fail temporarily at first time, retry logic is work', async () => {
            spyExec.mockImplementationOnce(async () => {
                throw new Error();
            });

            await expBackoffRetryStrategy.execPromiseLogic<void>(async () => {
                await dummyObject.exec();
            });

            expect(spyExec).toHaveBeenCalledTimes(2);
        });

        test('logic consistently fail, retry logic finally throw error', async () => {
            const errMsg = 'test-msg';
            spyExec.mockImplementation(async () => {
                throw new Error(errMsg);
            });
            jest.useFakeTimers();

            expBackoffRetryStrategy
                .execPromiseLogic(async () => {
                    await dummyObject.exec();
                })
                .catch((err) => {
                    expect(err).toStrictEqual(new Error(errMsg));
                });
            await jest.advanceTimersByTimeAsync(60 * 60 * 1000);

            expect(spyExec).toHaveBeenCalledTimes(ExpBackoffRetryStrategy.DefaultRetryLimit + 1);
        });
    });
});

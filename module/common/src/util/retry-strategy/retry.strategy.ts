export abstract class AbstractRetryStrategy {
    public abstract execPromiseLogic<T>(promiseLogic: () => Promise<T>): Promise<T>;
}

import { AbstractRetryStrategy } from './retry.strategy';

export class NonRetryStrategy extends AbstractRetryStrategy {
    public override async execPromiseLogic<T>(promiseLogic: () => Promise<T>): Promise<T> {
        return promiseLogic();
    }
}

import { AbstractRetryStrategy } from './retry.strategy';
import { sleep } from '@root/common/util';

export type ExpBackoffRetryOptionsType = {
    initBackoffMs?: number;
    retryLimit?: number;
};

export class ExpBackoffRetryStrategy extends AbstractRetryStrategy {
    private readonly initBackoffMs: number;
    private readonly retryLimit: number;

    public static readonly DefaultInitBackoffMs = 50;
    public static readonly DefaultRetryLimit = 10;

    constructor(options?: ExpBackoffRetryOptionsType) {
        super();
        this.initBackoffMs = options?.initBackoffMs ?? ExpBackoffRetryStrategy.DefaultInitBackoffMs;
        this.retryLimit = options?.retryLimit ?? ExpBackoffRetryStrategy.DefaultRetryLimit;
    }

    public override async execPromiseLogic<T>(promiseLogic: () => Promise<T>, retryCnt = 0): Promise<T> {
        try {
            return await promiseLogic();
        } catch (err) {
            if (retryCnt >= this.retryLimit) {
                throw err;
            }
            await sleep(this.initBackoffMs * 2 ** retryCnt);
            return this.execPromiseLogic<T>(promiseLogic, retryCnt + 1);
        }
    }
}

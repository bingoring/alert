import { DataSource } from 'typeorm';
import { AbstractPostLoadStrategy } from './post-load-strategy';
import { LoadDashboardDataException } from '../exception/exception';

export abstract class AbstractDataLoadStrategy {
    constructor(private readonly targetName: string, private readonly postLoadStrategy: AbstractPostLoadStrategy) {}
    public async exec(dataSource: DataSource): Promise<void> {
        try {
            await this.computeAndSave(dataSource, this.postLoadStrategy);
            log.debug(`Statistics Data Store succeed. (target: ${this.targetName})`);
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            throw new LoadDashboardDataException(this.targetName, errMsg);
        }
    }

    protected abstract computeAndSave(
        dataSource: DataSource,
        postLoadStrategy: AbstractPostLoadStrategy
    ): Promise<void>;
}

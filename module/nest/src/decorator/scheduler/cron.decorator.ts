import { Cron as NestCron } from '@nestjs/schedule';
import { parseExpression } from 'cron-parser';
import { ScheduleTaskRepository } from '@root/pg/repository/server/scheduleTask.repository';
import { ScheduleTaskEntity } from '@root/pg/entity/server/scheduleTask.entity';
import { PGDataSourceConnection } from '@root/pg/connection/connection';
import { v4 } from 'uuid';
import { ValueNotFoundError } from '@root/pg/error/value.error';
import { DataSource } from 'typeorm';
export { CronExpression } from '@nestjs/schedule';

class ConditionalCronGuard {
    private readonly connection: PGDataSourceConnection;
    private readonly serverId: string;
    private dataSource: DataSource | undefined;
    private static instance: ConditionalCronGuard;

    constructor(serverId: string) {
        this.serverId = serverId;
        this.connection = PGDataSourceConnection.getInstance();
    }

    private async getDataSource() {
        if (this.dataSource === undefined) {
            this.dataSource = await this.connection.getDataSource(this.connection.DefaultTenantId);
        }

        return this.dataSource;
    }

    public async canActivate(task: string, cycleMs: number): Promise<boolean> {
        const dataSource = await this.getDataSource();
        const entityManager = dataSource.createEntityManager();

        try {
            const isActivate = await entityManager.transaction(async (transactionalEntityManager) => {
                const updatedAt = new Date(new Date().getTime() - cycleMs + 1000);
                const queryBuilder = transactionalEntityManager
                    .createQueryBuilder()
                    .update(ScheduleTaskEntity)
                    .set({ lastTaskServer: this.serverId })
                    .where('(updatedAt <= :updatedAt or updatedAt is null) and task = :task', {
                        updatedAt,
                        task,
                    });

                const updatedCount = await queryBuilder.execute();

                return (updatedCount.affected ?? 0) > 0;
            });

            return isActivate;
        } catch (e) {
            if (e instanceof Error) {
                log.error(`[CRON] ${e.message} (tenantId: ${dataSource.driver.schema})`);
            } else {
                log.error(`Cron Error: ${e}`);
            }

            return false;
        }
    }

    public async initialize(task: string) {
        const dataSource = await this.getDataSource();
        const repository = ScheduleTaskRepository.createInstance({ dataSource });

        try {
            await repository.findOne({ where: { task } });
        } catch (e) {
            if (e instanceof ValueNotFoundError) {
                await repository.create({ task });
            }

            throw e;
        }
    }

    public static getInstance() {
        if (this.instance === undefined) {
            this.instance = new this(v4());
        }

        return this.instance;
    }
}

export const Cron = (expression: string, options: CronParamType) => {
    const interval = parseExpression(expression);
    const nextRunTimeInMs = interval.next().getTime();
    const prevRunTimeInMs = interval.prev().getTime();

    const cycleMs = nextRunTimeInMs - prevRunTimeInMs;

    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any) {
            if (globalThis.env === undefined) {
                return;
            }

            const guard = ConditionalCronGuard.getInstance();
            await guard.initialize(options.task);
            const isCanActivate = await guard.canActivate(options.task, cycleMs);
            if (isCanActivate) {
                return originalMethod.apply(this, args);
            }
        };

        NestCron(expression)(target, key, descriptor);
    };
};

interface CronParamType {
    task: Uppercase<string>;
}

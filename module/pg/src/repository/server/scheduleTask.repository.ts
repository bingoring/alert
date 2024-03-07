import { ScheduleTaskEntity } from '@root/pg/entity/server/scheduleTask.entity';
import { RepositoryOptionType } from '../abstract.type';
import { AbstractEntityRepository } from '../abstractEntity.repository';

export class ScheduleTaskRepository extends AbstractEntityRepository<ScheduleTaskEntity> {
    constructor(options: RepositoryOptionType) {
        super(ScheduleTaskEntity, options);
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

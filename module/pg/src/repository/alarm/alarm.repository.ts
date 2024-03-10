import { AbstractEntityRepository } from '../abstractEntity.repository';
import { RepositoryOptionType } from '../abstract.type';
import { AlarmEntity } from '@root/pg/entity/alarm';

export class AlarmRepository extends AbstractEntityRepository<AlarmEntity> {
    constructor(options: RepositoryOptionType) {
        super(AlarmEntity, options);
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

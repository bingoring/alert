import { GroupEntity } from '@root/pg/entity/user/group.entity';
import { AbstractEntityRepository } from '../abstractEntity.repository';
import { RepositoryOptionType } from '../abstract.type';

export class GroupRepository extends AbstractEntityRepository<GroupEntity> {
    constructor(options: RepositoryOptionType) {
        super(GroupEntity, options);
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

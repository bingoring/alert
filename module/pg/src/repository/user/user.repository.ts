import { AbstractEntityRepository } from '../abstractEntity.repository';
import { RepositoryOptionType } from '../abstract.type';
import { UserEntity } from '@root/pg/entity/user/user.entity';

export class UserRepository extends AbstractEntityRepository<UserEntity> {
    constructor(options: RepositoryOptionType) {
        super(UserEntity, options);
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

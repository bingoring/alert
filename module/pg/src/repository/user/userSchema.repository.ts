import { AbstractEntityRepository } from '../abstractEntity.repository';
import { RepositoryOptionType } from '../abstract.type';
import { UserSchemaEntity } from '@root/pg/entity/user/userSchema.entity';

export class UserSchemaRepository extends AbstractEntityRepository<UserSchemaEntity> {
    constructor(options: RepositoryOptionType) {
        super(UserSchemaEntity, options);
    }

    public async findAll(): Promise<UserSchemaEntity[]> {
        return this.getRepository().find();
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

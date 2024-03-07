import { AbstractEntityRepository } from '../abstractEntity.repository';
import { RepositoryOptionType } from '../abstract.type';
import { OrganizationSchemaEntity } from '@root/pg/entity/user/organizationSchema.entity';

export class OrganizationSchemaRepository extends AbstractEntityRepository<OrganizationSchemaEntity> {
    constructor(options: RepositoryOptionType) {
        super(OrganizationSchemaEntity, options);
    }

    public async getAllTenantId(): Promise<string[]> {
        const resultList = (await this.createQueryBuilder('org_schema')
            .select('org_schema.schema_name', 'tenant')
            .getRawMany()) as { tenant: string }[];

        return resultList.map((item) => item.tenant);
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

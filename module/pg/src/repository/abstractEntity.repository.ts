import { DeepPartial, EntityTarget, FindOneOptions, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { CriteriaType, RepositoryOptionType } from './abstract.type';
import { AbstractRepository } from './abstract.repository';
import { ValueNotFoundError } from '../error/value.error';
export abstract class AbstractEntityRepository<Entity extends ObjectLiteral> extends AbstractRepository {
    protected readonly entityClass: EntityTarget<Entity>;

    constructor(entityClass: EntityTarget<Entity>, options: RepositoryOptionType) {
        super(options);
        this.entityClass = entityClass;
    }

    public getRepository() {
        if (this.queryRunner !== undefined) {
            return this.queryRunner.manager.getRepository(this.entityClass);
        }
        const dataSource = this.getDataSource();
        return dataSource.getRepository(this.entityClass);
    }

    public createQueryBuilder(alias?: string) {
        return this.getRepository().createQueryBuilder(
            alias !== undefined && alias !== '' ? alias : (this.entityClass as any).name
        );
    }

    public async findOne(options: FindOneOptions<Entity>) {
        const repository = this.getRepository();
        const value = await repository.findOne(options);

        if (value === null) {
            throw new ValueNotFoundError();
        }

        return value;
    }

    public async create(entity: DeepPartial<Entity>) {
        const repository = this.getRepository();
        const newEntity = repository.create(entity);
        return repository.save(newEntity);
    }

    public async createMany(entityList: DeepPartial<Entity>[]) {
        const repository = this.getRepository();
        const newEntityList = repository.create(entityList);
        return repository.save(newEntityList);
    }

    public async partialFind({
        where,
        selectList,
    }: {
        where?: FindOptionsWhere<Entity>;
        selectList?: Array<keyof DeepPartial<Entity>>;
    }) {
        const repository = this.getRepository();
        const alias = (this.entityClass as any).name;
        const queryBuilder = repository.createQueryBuilder(alias);

        selectList?.forEach((property, index) => {
            queryBuilder.addSelect(`${alias}.${property as string}`, `property${index}`);
        });

        if (where !== undefined) {
            queryBuilder.where(where);
        }

        const rawDataList = await queryBuilder.getRawMany();
        const resultList: Partial<Entity>[] = rawDataList.map((row) => {
            if (selectList === undefined) {
                return row;
            }
            return selectList.reduce((prev, cur, index) => {
                prev[cur] = row[`property${index}`];
                return prev;
            }, {} as Partial<Entity>);
        });

        return resultList;
    }

    public async partialUpdate(criteria: CriteriaType<Entity>, partialEntity: DeepPartial<Entity>) {
        const repository = this.getRepository();

        const removeUndefinedPartialEntity = {} as DeepPartial<Entity>;

        for (const key of Object.keys(partialEntity) as (keyof DeepPartial<Entity>)[]) {
            if (partialEntity[key] !== undefined) {
                removeUndefinedPartialEntity[key] = partialEntity[key] as any;
            }
        }

        return repository.update(criteria, partialEntity);
    }
}

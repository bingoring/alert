import { FindManyOptions, FindOptionsWhere, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { AbstractEntityPaginationRepository } from './abstractEntityPagination.repository';

export abstract class AbstractEntityOffsetPagination<
    Entity extends ObjectLiteral
> extends AbstractEntityPaginationRepository<Entity> {
    public async getPagination(
        options: Omit<IPaginationOptions, 'route' | 'routingLabels'>,
        searchOptions?: FindOptionsWhere<Entity> | FindManyOptions<Entity>
    ) {
        const repository = this.getRepository();
        const result = await paginate<Entity>(repository, options, searchOptions);

        return {
            itemList: result.items,
            meta: result.meta,
        };
    }

    public async getPaginationFromQueryBuilder(
        queryBuilder: SelectQueryBuilder<Entity>,
        options: Omit<IPaginationOptions, 'route' | 'routingLabels'>
    ) {
        const result = await paginate<Entity>(queryBuilder, options);

        return {
            itemList: result.items,
            meta: result.meta,
        };
    }
}

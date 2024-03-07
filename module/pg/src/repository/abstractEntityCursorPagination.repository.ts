import { EntityTarget, ObjectLiteral, ObjectType } from 'typeorm';
import { CursorRepositoryDefaultOptionType, CursorRepositoryOptionType, CursorTypeOptionType } from './abstract.type';
import { buildPaginator } from '../pagination/cursor';
import { AbstractEntityPaginationRepository } from './abstractEntityPagination.repository';

export abstract class AbstractEntityCursorPagination<
    Entity extends ObjectLiteral
> extends AbstractEntityPaginationRepository<Entity> {
    private readonly cursorOptionType: CursorRepositoryDefaultOptionType<Entity>;

    constructor(entityClass: EntityTarget<Entity>, options: CursorRepositoryOptionType<Entity>) {
        super(entityClass, options);
        this.cursorOptionType = {
            paginationKeyList: options.paginationKeyList,
        };
    }

    public async getPagination(option: CursorTypeOptionType<Entity>) {
        const alias = option.queryBuilder?.alias ?? `${(this.entityClass as any).name}`;
        const queryBuilder = option.queryBuilder ?? this.getRepository().createQueryBuilder(alias);
        const nextPaginator = buildPaginator({
            entity: this.entityClass as ObjectType<Entity>,
            paginationKeys: this.cursorOptionType.paginationKeyList,
            alias,
            query: {
                limit: option.limit,
                order: option.order ?? 'ASC',
                beforeCursor: 'beforeCursor' in option ? option.beforeCursor : undefined,
                afterCursor: 'afterCursor' in option ? option.afterCursor : undefined,
            },
        });

        const result = await nextPaginator.paginate(queryBuilder);
        const cursor = {
            afterCursor: result.cursor.afterCursor ?? undefined,
            beforeCursor: result.cursor.beforeCursor ?? undefined,
        };

        return {
            itemList: result.data,
            cursor,
        };
    }
}

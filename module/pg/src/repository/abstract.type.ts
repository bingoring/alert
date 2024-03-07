import { DataSource, FindOptionsWhere, ObjectId, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

export type RepositoryOptionType = RepositoryEntityOptionType &
    (RepositoryDataSourceOptionType | RepositoryTenantOptionType);

interface RepositoryDataSourceOptionType {
    dataSource: DataSource;
}

interface RepositoryTenantOptionType {
    tenantId: string;
}

interface RepositoryEntityOptionType {
    entityList?: BaseDataSourceOptions['entities'];
}

export type CursorRepositoryOptionType<Entity extends ObjectLiteral> = RepositoryOptionType &
    CursorRepositoryDefaultOptionType<Entity>;

export type CursorRepositoryDefaultOptionType<Entity extends ObjectLiteral> = {
    paginationKeyList: Extract<keyof Entity, string>[];
};

export type CursorTypeOptionType<Entity extends ObjectLiteral> = {
    limit: number;
    order?: 'ASC' | 'DESC';
    queryBuilder?: SelectQueryBuilder<Entity>;
} & (
    | {
          beforeCursor?: string;
      }
    | {
          afterCursor?: string;
      }
);

export type CursorOptionType = {
    limit: number;
    order?: 'ASC' | 'DESC';
    beforeCursor?: string;
    afterCursor?: string;
};

export type CriteriaType<Entity extends ObjectLiteral> =
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectId
    | ObjectId[]
    | FindOptionsWhere<Entity>;

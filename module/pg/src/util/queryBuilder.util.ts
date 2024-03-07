import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { timeToUlid } from '@root/common/util/ulid';
import { AbstractEntityRepository } from '../repository/abstractEntity.repository';
import { LogicalOperatorMap, SearchFilterType, SortColumnType } from '@root/nest/dto/filterSort.dto';
import { getComparisonOperator, getFilterValue } from './filter.util';

export class CustomQueryBuilder<Entity extends ObjectLiteral, Column = keyof Entity> {
    private queryBuilder: SelectQueryBuilder<Entity>;
    private readonly alias: string;

    constructor(queryBuilder: SelectQueryBuilder<Entity>) {
        this.queryBuilder = queryBuilder;
        this.alias = queryBuilder.alias;
    }

    public toFrom(id: Column, query: { to?: string; from?: string }) {
        const entityId = this.toColumn(id);

        if (query.to !== undefined) {
            this.andWhere(`${this.alias}.${entityId} <= :to`, { to: timeToUlid(query.to).slice(0, 10) });
        }

        if (query.from !== undefined) {
            this.andWhere(`${this.alias}.${entityId} >= :from`, { from: timeToUlid(query.from).slice(0, 10) });
        }

        return this;
    }

    public toFromWithDate(id: Column, query: { to?: string; from?: string }) {
        const entityId = this.toColumn(id);

        if (query.to !== undefined) {
            this.andWhere(`${this.alias}.${entityId} <= :to`, { to: query.to });
        }

        if (query.from !== undefined) {
            this.andWhere(`${this.alias}.${entityId} >= :from`, { from: query.from });
        }

        return this;
    }

    public truncDate(alias: string) {
        this.queryBuilder = this.queryBuilder.select(`DATE_TRUNC(\'day\', "created_at")`, `${alias}`);
        return this;
    }

    public maxDataFromColumn(selectColumnList: Column[]) {
        for (const selectColumn of selectColumnList) {
            const columnAlias = `"${this.alias}"."${this.toColumn(selectColumn)}"`;
            this.queryBuilder = this.queryBuilder.addSelect(`MAX(${columnAlias})`, `${selectColumn}`);
        }
        return this;
    }

    public groupByColumn(alias: string) {
        this.queryBuilder = this.queryBuilder.groupBy(this.toColumn(alias));
        return this;
    }

    public referenceDate(referenceDate?: string, orderBy: 'ASC' | 'DESC' = 'ASC') {
        if (referenceDate === undefined) {
            return this;
        }

        const startDate = new Date(referenceDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(referenceDate);
        endDate.setHours(23, 59, 59, 999);

        this.andWhere(`"${this.alias}".created_at >= :startDate`, {
            startDate,
        });

        this.andWhere(`"${this.alias}".created_at <= :endDate`, {
            endDate,
        });
        this.queryBuilder = this.queryBuilder.orderBy('created_at', orderBy);

        return this;
    }

    public groupByCount(column: Column, originColumn?: string) {
        const columnAlias = `"${this.alias}"."${originColumn ?? this.toColumn(column)}"`;

        this.queryBuilder = this.queryBuilder.select(columnAlias).addSelect(`COUNT(*) AS "count"`).groupBy(columnAlias);

        return this;
    }

    public searchKeyWord(relatedKeyList: Column[], searchKeyWord: string | undefined) {
        if (searchKeyWord === undefined) {
            return this;
        }

        const query = (relatedKeyList as string[])
            .map((relatedKey) => {
                if (!relatedKey.includes('.')) {
                    return `${this.alias}.${relatedKey} ILIKE :searchKeyWord`;
                }
                const columnList = relatedKey.split('.');
                return `${this.alias}.${this.toColumn(columnList[0])} ->> '${this.toColumn(
                    columnList[1]
                )}' ILIKE :searchKeyWord`;
            })
            .join(' or ');

        this.andWhere(`(${query})`, { searchKeyWord: `%${searchKeyWord}%` });

        return this;
    }

    public ifAndWhere(id: Column, data: string | undefined | number) {
        const entityId = this.toColumn(id);

        if (data !== undefined) {
            const rand = `K_${Date.now() % 1000000}`;
            this.andWhere(`${this.alias}.${entityId} = :${rand}`, { [rand]: data });
        }

        return this;
    }

    public ifJsonInclude(key: Column, data: any[] | undefined) {
        if ((data ?? []).length > 0) {
            const rand = `K_${Date.now() % 1000000}`;
            this.andWhere(`${this.alias}.${key} @> :${rand}`, { [rand]: JSON.stringify(data) });
        }

        return this;
    }

    public ifJsonObjInclude(key: Column, field: string, data: string) {
        this.andWhere(`:data = ANY("${this.alias}"."${key}" ->> '${field}')`, { data });
        return this;
    }

    private toColumn(column: unknown) {
        if (typeof column !== 'string') {
            throw new Error('column type error');
        }

        return column.replace(/[A-Z]/g, (v) => `_${v}`).toLowerCase();
    }

    private andWhere(where: string, data: any) {
        this.queryBuilder = this.queryBuilder.andWhere(where, data);
    }

    public getQueryBuilder() {
        return this.queryBuilder;
    }

    public searchFilter(enableColumn: Record<string, string>, searchFilterList?: SearchFilterType[]) {
        if (searchFilterList === undefined || searchFilterList.length === 0) {
            return this;
        }

        for (const searchFilter of searchFilterList) {
            const rand = `K_${Date.now() % 1000000}`;

            const column = enableColumn[searchFilter.column];
            if (column === undefined) {
                continue;
            }

            const operation = getComparisonOperator(searchFilter.comparisonOperator);
            const columnQuery = (() => {
                if (!column.includes('.')) {
                    return this.toColumn(column);
                }
                const columnList = column.split('.');
                return `${this.toColumn(columnList[0])} ->> '${this.toColumn(columnList[1])}'`;
            })();

            const where = `${this.alias}.${columnQuery} ${operation} :${rand}`;

            const data = { [rand]: getFilterValue(searchFilter) };

            if (searchFilter.logicalOperator === LogicalOperatorMap.or) {
                this.queryBuilder.orWhere(where, data);
            } else {
                this.queryBuilder.andWhere(where, data);
            }
        }

        return this;
    }

    public sort(enableColumn: Record<string, string>, sortList?: SortColumnType[]) {
        if (sortList === undefined || sortList.length === 0) {
            return this;
        }

        for (const { column, sort } of sortList) {
            const tableColumn = enableColumn[column];
            if (tableColumn === undefined) {
                continue;
            }

            this.queryBuilder.addOrderBy(`${this.alias}.${this.toColumn(tableColumn)}`, sort);
        }

        return this;
    }

    public static createInstance<Entity extends ObjectLiteral>(
        queryBuilder: SelectQueryBuilder<Entity>
    ): CustomQueryBuilder<Entity>;
    public static createInstance<Entity extends ObjectLiteral>(
        repository: AbstractEntityRepository<Entity>
    ): CustomQueryBuilder<Entity>;
    public static createInstance<Entity extends ObjectLiteral>(
        obj: SelectQueryBuilder<Entity> | AbstractEntityRepository<Entity>
    ) {
        if (obj instanceof AbstractEntityRepository) {
            return new this(obj.createQueryBuilder());
        }

        return new this(obj);
    }
}

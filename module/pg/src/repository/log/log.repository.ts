import type { RepositoryOptionType } from '../abstract.type';
import { AuditLogEntity } from '@root/pg/entity/log/auditLog.entity';
import { AbstractEntityCursorPagination } from '../abstractEntityCursorPagination.repository';
import { AuditLogFindOptionType } from '@root/pg/type/repository/auditLog.type';
import { CustomQueryBuilder } from '@root/pg/util/queryBuilder.util';

export class AuditLogRepository extends AbstractEntityCursorPagination<AuditLogEntity> {
    private readonly enableColumn = {
        type: 'type',
        level: 'level',
        category: 'category',
        ipAddr: 'ipAddr',
    };

    constructor(options: RepositoryOptionType) {
        super(AuditLogEntity, { ...options, paginationKeyList: ['auditLogId'] });
    }

    public async find(options: AuditLogFindOptionType) {
        const queryBuilder = CustomQueryBuilder.createInstance(this.createQueryBuilder())
            .toFrom('auditLogId', { to: options.to, from: options.from })
            .searchKeyWord(['content', 'category', 'loginId', 'ipAddr'], options.searchKeyWord)
            .searchFilter(this.enableColumn, options.searchFilterList)
            .sort(this.enableColumn, options.sortList)
            .getQueryBuilder();

        return await this.getPagination({
            afterCursor: options.afterCursor,
            beforeCursor: options.beforeCursor,
            queryBuilder,
            limit: options.limit,
            order: options.sort,
        });
    }

    public static createInstance(options: RepositoryOptionType) {
        return new this(options);
    }
}

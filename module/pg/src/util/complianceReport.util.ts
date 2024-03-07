import { SelectQueryBuilder } from 'typeorm';
import { CustomQueryBuilder } from './queryBuilder.util';
import {
    ComplianceReportRequirementStatisticsGetType,
    PolicyResultSeverityType,
} from '@root/nest/type/complianceReport/complianceReport.type';

export function getPolicyResultJoinSubQuery({
    qb,
    to,
    from,
    referenceDate,
    targetIdList,
}: {
    qb: SelectQueryBuilder<any>;
    to?: string;
    from?: string;
    referenceDate?: string;
    targetIdList?: string[];
}) {
    qb = qb
        .select(['pr_sub.policy_id', 'pr_sub.severity as severity', 'COUNT(pr_sub.policy_result_id) as count'])
        .from('policy_result', 'pr_sub');

    let queryBuilder = (() => {
        if (referenceDate !== undefined) {
            return qb.where('created_at < :referenceDate and (deleted_at > :referenceDate or deleted_at IS NULL)', {
                referenceDate,
            });
        } else {
            const customQueryBuilder = CustomQueryBuilder.createInstance(qb);
            return customQueryBuilder
                .toFrom('policyResultId', {
                    to,
                    from,
                })
                .getQueryBuilder();
        }
    })();

    queryBuilder = queryBuilder.where('pr_sub.severity is not null');

    if ((targetIdList ?? []).length > 0) {
        queryBuilder = queryBuilder.andWhere('pr_sub.target_id IN (:...targetIdList)', { targetIdList });
    }

    if (targetIdList?.length === 0) {
        queryBuilder = queryBuilder.andWhere('pr_sub.target_id IS NULL');
    }

    queryBuilder = queryBuilder.groupBy('pr_sub.policy_id').addGroupBy('pr_sub.severity');

    return queryBuilder;
}

export function processStatisticsResult(rawResultList: ComplianceReportRequirementStatisticsGetType[]) {
    const result = {
        severity: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            pass: 0,
        },
    };

    rawResultList.forEach((item) => {
        if (item.severity !== null && item.count !== null) {
            result.severity[item.severity.toLowerCase() as keyof PolicyResultSeverityType] += Number(item.count);
        }
    });

    return result;
}

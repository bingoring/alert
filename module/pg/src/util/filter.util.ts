import { ComparisonOperatorMap, ComparisonOperatorType, SearchFilterType } from '@root/nest/dto/filterSort.dto';

export function getComparisonOperator(comparisonOperator: ComparisonOperatorType) {
    switch (comparisonOperator) {
        case ComparisonOperatorMap.equal:
            return '=';
        case ComparisonOperatorMap.notEqual:
            return '!=';
        case ComparisonOperatorMap.contain:
            return 'ilike';
        case ComparisonOperatorMap.notContain:
            return 'not ilike';
        case ComparisonOperatorMap.lessThan:
            return '<=';
        case ComparisonOperatorMap.moreThan:
            return '>=';
        default:
            return '=';
    }
}

export function performOperation(v1: string | number, v2: string | number, operator: string) {
    switch (operator) {
        case '=':
            return v1 === v2;
        case '!=':
            return v1 !== v2;
        case 'ilike':
            return String(v1).includes(String(v2));
        case 'not ilike':
            return !String(v1).includes(String(v2));
        case '<=':
            return v1 <= v2;
        case '>=':
            return v1 >= v2;
        default:
            return v1 === v2;
    }
}

export function getFilterValue(searchFilter: SearchFilterType) {
    if (
        searchFilter.comparisonOperator === ComparisonOperatorMap.contain ||
        searchFilter.comparisonOperator === ComparisonOperatorMap.notContain
    ) {
        return `%${searchFilter.value}%`;
    }

    return searchFilter.value;
}

export function toColumn(column: unknown) {
    if (typeof column !== 'string') {
        throw new Error('column type error');
    }

    return column.replace(/[A-Z]/g, (v) => `_${v}`).toLowerCase();
}

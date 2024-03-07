import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ValueOfType } from '@root/common/type/utility.type';

export const LogicalOperatorMap = {
    and: 'AND',
    or: 'OR',
} as const;
export const LogicalOperatorTypeList = Object.values(LogicalOperatorMap);
export type LogicalOperatorType = ValueOfType<typeof LogicalOperatorMap>;

export const ComparisonOperatorMap = {
    equal: 'EQUAL',
    notEqual: 'NOT_EQUAL',
    contain: 'CONTAIN',
    notContain: 'NOT_CONTAIN',
    lessThan: 'LESS_THAN',
    moreThan: 'MORE_THAN',
};
export const ComparisonOperatorTypeList = Object.values(ComparisonOperatorMap);
export type ComparisonOperatorType = ValueOfType<typeof ComparisonOperatorMap>;

export class SearchFilterType {
    @ApiProperty({ enum: LogicalOperatorTypeList })
    @IsString()
    logicalOperator!: LogicalOperatorType;

    @ApiProperty({ enum: ComparisonOperatorTypeList })
    @IsString()
    comparisonOperator!: ComparisonOperatorType;

    @ApiProperty()
    @IsString()
    column!: string;

    @ApiProperty()
    @IsString()
    value!: string;
}

export const SortMap = {
    desc: 'DESC',
    asc: 'ASC',
} as const;

export type SortType = ValueOfType<typeof SortMap>;

export class SortColumnType {
    @IsString()
    column!: string;

    @IsString()
    sort!: SortType;
}

export class FilterSortDto {
    @ApiProperty({
        required: false,
        type: String,
        description:
            'logicalOperator: AND | OR, comparisonOperator: EQUAL | NOT_EQUAL | CONTAIN | NOT_CONTAIN, column: string, value: string',
    })
    @IsOptional()
    @Type(() => SearchFilterType)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
    })
    @ValidateNested({ each: true })
    searchFilterList?: SearchFilterType[];

    @ApiProperty({
        required: false,
        type: String,
        description: 'sort: DESC | ASC, column: string',
    })
    @IsOptional()
    @Type(() => SortColumnType)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
    })
    @ValidateNested({ each: true })
    sortList?: SortColumnType[];
}

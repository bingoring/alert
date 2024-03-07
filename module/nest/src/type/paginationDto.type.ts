import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ClassConstructor, Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { FilterSortDto } from '../dto/filterSort.dto';

export class CursorQueryDto extends FilterSortDto {
    @ApiProperty({ type: Number, required: false, minimum: 1, maximum: 100, default: 10 })
    @Transform(({ value }) => {
        if (value < 1) {
            return 1;
        }
        if (value > 100) {
            return 100;
        }

        return value;
    })
    @Type(() => Number)
    @IsNumber()
    limit = 10;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    afterCursor?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    beforeCursor?: string;

    @ApiProperty({ enum: ['ASC', 'DESC'] })
    @IsEnum(['ASC', 'DESC'])
    sort!: 'ASC' | 'DESC';

    @ApiProperty({ required: false, minLength: 2 })
    @MinLength(2)
    @IsString()
    @IsOptional()
    searchKeyWord?: string;
}

class CursorResponseValueCursorDto {
    @ApiProperty({ required: false })
    afterCursor?: string;

    @ApiProperty({ required: false })
    beforeCursor?: string;
}

export abstract class AbstractCursorResponseValueDto {
    @ApiProperty({ type: CursorResponseValueCursorDto })
    cursor!: CursorResponseValueCursorDto;

    abstract itemList: any[];
}

export class OffsetQueryDto extends FilterSortDto {
    @ApiProperty({ type: Number, required: false, minimum: 1, maximum: 100, default: 10 })
    @Type(() => Number)
    @IsNumber()
    @Transform(({ value }) => {
        if (value < 1) {
            return 1;
        }
        if (value > 100) {
            return 100;
        }

        return value;
    })
    limit = 10;

    @ApiProperty({ type: Number, required: false, minimum: 1, default: 1 })
    @Type(() => Number)
    @IsNumber()
    @Transform(({ value }) => {
        if (value < 1) {
            return 1;
        }

        return value;
    })
    page = 1;

    @ApiProperty({ required: false, minLength: 2 })
    @MinLength(2)
    @IsString()
    @IsOptional()
    searchKeyWord?: string;
}

class OffsetResponseValueMetaDto {
    @ApiProperty()
    currentPage!: number;

    @ApiProperty()
    itemCount!: number;

    @ApiProperty({ required: false })
    totalItems?: number;

    @ApiProperty()
    itemsPerPage!: number;

    @ApiProperty({ required: false })
    totalPages?: number;
}

export abstract class AbstractOffsetResponseValueDto<T = any> {
    @ApiProperty({ type: OffsetResponseValueMetaDto })
    meta!: OffsetResponseValueMetaDto;

    abstract itemList: T[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function RemoveOffsetType<T extends OffsetQueryDto>(cls: ClassConstructor<T>) {
    return OmitType(cls, ['limit', 'page', 'sortList']);
}

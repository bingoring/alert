import { AbstractOffsetResponseValueDto, OffsetQueryDto } from '@root/nest/type/paginationDto.type';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StatisticsQueryDto extends PickType(OffsetQueryDto, ['limit', 'page']) {
    @ApiProperty()
    @IsString()
    to!: string;

    @ApiProperty()
    @IsString()
    from!: string;
}

export abstract class AbstractStatisticsResponseValueDto<T = any> extends AbstractOffsetResponseValueDto<T> {
    @ApiProperty({ required: false })
    lastUpdatedAt?: string;
}

export class StatisticsCountRateDto {
    @ApiProperty({ type: Number })
    count!: number;

    @ApiProperty({ type: Number })
    rate!: number;
}

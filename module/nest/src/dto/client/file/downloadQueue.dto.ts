import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { AbstractOffsetResponseValueDto, OffsetQueryDto } from '@root/nest/type/paginationDto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClientDownloadQueueGetQueryDto extends OffsetQueryDto {}

export class ClientDownloadQueueDto {
    @ApiProperty()
    @IsString()
    fileId!: string;

    @ApiProperty()
    @IsString()
    fileName!: string;

    @ApiProperty()
    @IsString()
    fileCategory!: string;

    @ApiProperty()
    @IsString()
    status!: string;

    @ApiProperty()
    @IsString()
    refUrl!: string;

    @ApiProperty()
    @IsString()
    createdAt!: string;

    @ApiProperty()
    @IsString()
    deletedAt!: string;
}

export class ClientDownloadQueueGetResponseValueDto extends AbstractOffsetResponseValueDto {
    @ApiProperty({ type: ClientDownloadQueueDto, isArray: true })
    itemList!: ClientDownloadQueueDto[];
}

export class ClientDownloadQueueGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: ClientDownloadQueueGetResponseValueDto })
    value!: ClientDownloadQueueGetResponseValueDto;
}

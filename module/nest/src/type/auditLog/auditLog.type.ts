import { ApiProperty } from '@nestjs/swagger';
import { AbstractCursorResponseValueDto } from '../paginationDto.type';
import { IsObject } from 'class-validator';

export class AuditLogGetResponseValueItemDto {
    @ApiProperty()
    auditLogId!: string;

    @ApiProperty()
    content!: string;

    @ApiProperty()
    type!: string;

    @ApiProperty()
    level!: string;

    @ApiProperty()
    category!: string;

    @ApiProperty()
    createdAt!: string;

    @ApiProperty()
    ipAddr!: string;

    @ApiProperty()
    loginId!: string;
}

export class AuditLogGetResponseValueDto extends AbstractCursorResponseValueDto {
    @ApiProperty({ type: AuditLogGetResponseValueItemDto, isArray: true })
    itemList!: AuditLogGetResponseValueItemDto[];
}

export class AuditLogDetailGetResponseValueDto extends AuditLogGetResponseValueItemDto {
    @ApiProperty()
    @IsObject()
    origin!: any;
}

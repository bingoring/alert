import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AuditDto {
    @ApiProperty()
    @IsOptional()
    createdBy?: string;

    @ApiProperty()
    createdAt!: string;

    @ApiProperty()
    @IsOptional()
    updatedBy?: string;

    @ApiProperty()
    updatedAt!: string;
}

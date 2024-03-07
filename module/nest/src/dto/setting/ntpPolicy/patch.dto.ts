import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SettingNtpPolicyPatchBodyDto {
    @ApiProperty()
    @IsString()
    timezone!: string;

    @ApiProperty()
    @IsString()
    usageType!: string;

    @ApiProperty()
    @IsString()
    domain!: string;
}

export class SettingNtpPolicyPatchResponseDto extends AbstractGatewayResponse {}

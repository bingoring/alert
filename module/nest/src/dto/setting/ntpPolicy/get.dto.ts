import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SettingNtpPolicyGetQueryDto {}

class SettingNtpPolicyGetResponseValueDto {
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

export class SettingNtpPolicyGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: SettingNtpPolicyGetResponseValueDto })
    value!: SettingNtpPolicyGetResponseValueDto;
}

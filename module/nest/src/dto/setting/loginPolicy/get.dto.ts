import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { SettingLoginPolicyItemdto } from '@root/nest/type/dto/setting/loginPolicy.type';
import { ApiProperty } from '@nestjs/swagger';

export class SettingLoginPolicyGetQueryDto {}

export class SettingLoginPolicyGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: SettingLoginPolicyItemdto })
    value!: SettingLoginPolicyItemdto;
}

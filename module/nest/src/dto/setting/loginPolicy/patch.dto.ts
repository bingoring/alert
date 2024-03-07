import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { SettingLoginPolicyItemdto } from '@root/nest/type/dto/setting/loginPolicy.type';

export class SettingLoginPolicyPatchBodyDto extends SettingLoginPolicyItemdto {}

export class SettingLoginPolicyPatchResponseDto extends AbstractGatewayResponse {}

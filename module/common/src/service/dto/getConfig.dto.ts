import { ConfigType } from '@root/common/type';
import { AbstractBaseResponse } from '@root/nest/constant/response.constant';
export class GetConfigResponse extends AbstractBaseResponse {
    configData?: ConfigType;
}

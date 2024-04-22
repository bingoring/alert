import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { AlarmEntity } from '@root/pg/entity/alarm';

export class AlarmGetBodyDto {}

export class AlarmGetResponseValueItemType extends AlarmEntity {}

export class AlarmGetResponseValueType {
    @ApiProperty({ type: AlarmGetResponseValueItemType, isArray: true })
    itemList!: AlarmGetResponseValueItemType[];
}

export class AlarmGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: AlarmGetResponseValueType })
    value!: AlarmGetResponseValueType;
}

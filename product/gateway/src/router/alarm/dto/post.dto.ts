import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AlarmEntity } from '@root/pg/entity/alarm';

export class AlarmPostBodyDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    alarmName?: string;

    @ApiProperty()
    @IsString()
    alarmType!: string;

    @ApiProperty()
    @IsString()
    alarmTime!: string;

    public get toAlarmCreateCommand(): AlarmCreateCommandType {
        return {
            alarmName: this.alarmName,
            alarmType: this.alarmType,
            alarmTime: this.alarmTime,
        };
    }
}

export class AlarmPostResponseValueType extends AlarmEntity {}

export class AlarmPostResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: AlarmPostResponseValueType })
    value!: AlarmPostResponseValueType;
}

export interface AlarmCreateCommandType {
    alarmName?: string;
    alarmType: string;
    alarmTime: string;
}

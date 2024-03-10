import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnterPasswordBodyDto {
    @ApiProperty()
    @IsString()
    password!: string;

    @ApiProperty()
    @IsString()
    token!: string;
}

export class EnterPasswordResponseDto extends AbstractGatewayResponse {}

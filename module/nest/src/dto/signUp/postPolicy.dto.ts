import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpPolicyPostBodyDto {
    @ApiProperty()
    @IsString()
    loginId!: string;
}

export class SignUpPolicyPostResponseDto extends AbstractGatewayResponse {}

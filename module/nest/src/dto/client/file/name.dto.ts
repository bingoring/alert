import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClientFileNameGetQueryDto {
    @ApiProperty()
    @IsString()
    fileId!: string;
}

export class ClientFileNameGetResponseValueDto {
    @ApiProperty()
    fileName!: string;
}

export class ClientFileNameGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: ClientFileNameGetResponseValueDto })
    value!: ClientFileNameGetResponseValueDto;
}

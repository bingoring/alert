import { ApiProperty } from '@nestjs/swagger';
import { AbstractGatewayResponse } from '../constant/response.constant';

export class ExportTableResponseValueDto {
    @ApiProperty()
    fileId!: string;
}

export class ExportTableResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: ExportTableResponseValueDto })
    value!: ExportTableResponseValueDto;
}

import { ApiProperty } from '@nestjs/swagger';
import { HttpStatusCode } from '../constant/httpStatus.constant';
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LogLevelList, LogLevelType } from '@root/log/type';
type ResponseCodeType = typeof HttpStatusCode;
type StatusCodeType = ResponseCodeType[keyof ResponseCodeType];

export abstract class AbstractBaseResponse {
    statusCode!: StatusCodeType;
    message?: string;
}

class ResponseErrorType {
    @ApiProperty()
    @IsEnum([])
    code!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    message?: string;
}

const httpStatusList = Object.values(HttpStatusCode);
export abstract class AbstractGatewayResponse {
    @ApiProperty({ enum: httpStatusList })
    @IsEnum(httpStatusList)
    statusCode!: AbstractBaseResponse['statusCode'];

    @ApiProperty()
    @Type(() => ResponseErrorType)
    error?: ResponseErrorType;
}

export interface GatewayResponseType<T> extends AbstractGatewayResponse {
    value: T;
}

class SseNotiDataType {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsObject()
    @IsOptional()
    attribute?: any;
}

export class SseGatewayResponse {
    @ApiProperty({ enum: LogLevelList })
    @IsEnum(LogLevelList)
    level!: LogLevelType;

    @ApiProperty({ type: String })
    @IsString()
    category!: string;

    @ApiProperty({ type: SseNotiDataType, isArray: true })
    @IsOptional()
    @Type(() => SseNotiDataType)
    dataList?: SseNotiDataType[];

    @ApiProperty({ type: String, isArray: true })
    @IsArray()
    @IsOptional()
    relatedUserIdList?: string[];

    @ApiProperty()
    @IsString()
    tenantId!: string;

    @ApiProperty()
    @IsString()
    loginId!: string;

    @ApiProperty()
    @IsString()
    eventId!: string;
}

// ServiceReturnType 수정
export type ServiceReturnType<ResponseDto extends AbstractGatewayResponse & { value: unknown }> = Promise<
    ResponseDto['value']
>;

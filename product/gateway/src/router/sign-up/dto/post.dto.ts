import { SupportLanguageList, SupportLanguageType } from '@root/common/constant/supportLanguage.constant';
import { AbstractGatewayResponse } from '@root/nest/constant/response.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsObject, IsString, ValidateNested } from 'class-validator';
import { UserEntity } from '@root/pg/entity/user/user.entity';

class SignUpPostBodyCompanyDtoType {
    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    category!: string;

    @ApiProperty()
    @IsString()
    scale!: string;

    @ApiProperty()
    @IsString()
    serviceRegion!: string;
}

export class SignUpPostBodyDto {
    @ApiProperty()
    @IsString()
    familyName!: string;

    @ApiProperty()
    @IsString()
    givenName!: string;

    @ApiProperty()
    @IsString()
    email!: string;

    @ApiProperty()
    @IsString()
    loginId!: string;

    @ApiProperty()
    @IsString()
    country!: string;

    @ApiProperty({ type: SignUpPostBodyCompanyDtoType })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => SignUpPostBodyCompanyDtoType)
    company!: SignUpPostBodyCompanyDtoType;

    @ApiProperty({ enum: SupportLanguageList })
    @IsEnum(SupportLanguageList)
    language!: SupportLanguageType;

    @ApiProperty()
    @IsString()
    password!: string;

    public get toUserCreateCommand(): UserCreateCommandType {
        return {
            familyName: this.familyName,
            givenName: this.givenName,
            email: this.email,
            loginId: this.loginId,
            country: this.country,
            password: this.password,
        };
    }
}

export class SignUpPostResponseValueType extends UserEntity {}

export class SignUpPostResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: SignUpPostResponseValueType })
    value!: SignUpPostResponseValueType;
}

export interface UserCreateCommandType {
    familyName: string;
    givenName: string;
    email: string;
    loginId: string;
    country: string;
    password: string;
}

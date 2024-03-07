import { IsOptional, IsString } from 'class-validator';
import { Request } from 'express';

export interface TokenType {
    loginId?: string;
    maxAge?: number;
    tenantId?: string;
    userId?: string;
    iat?: number;
    exp?: number;
}

// TODO Token 재정의 해야함
export class ApiTokenType {
    @IsString()
    loginId!: string;

    @IsString()
    userId!: string;

    @IsOptional()
    maxAge?: number;

    tenantId!: string;

    @IsOptional()
    iat?: number;

    @IsOptional()
    exp?: number;
}

export type RequestWithTokenType = Request & { token: TokenType };

export interface LogTokenType {
    userId?: string;
    loginId: string;
    tenantId: string;
    ipAddr?: string;
}

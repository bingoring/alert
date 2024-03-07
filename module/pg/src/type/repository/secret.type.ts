import { OffsetQueryDto } from '@root/nest/type/paginationDto.type';

export class SecretFindOptionType extends OffsetQueryDto {
    to?: string;
    from?: string;
    secretId?: string;
}

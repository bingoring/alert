import { OffsetQueryDto } from '@root/nest/type/paginationDto.type';

export class SecretResourceFindOptionType extends OffsetQueryDto {
    secretId?: string;
}

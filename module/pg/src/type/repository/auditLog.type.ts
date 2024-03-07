import { CursorQueryDto } from '@root/nest/type/paginationDto.type';

export class AuditLogFindOptionType extends CursorQueryDto {
    from?: string;
    to?: string;
}

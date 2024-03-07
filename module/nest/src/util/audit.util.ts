import { AuditDto } from '@root/common/type/audit.type';
import { getTime } from '@root/common/util';

export function toAudit<T extends AuditEntityType>(data: T) {
    return {
        createdAt: getTime({ time: data.createdAt }),
        createdBy: data.createdBy,
        updatedAt: getTime({ time: data.updatedAt }),
        updatedBy: data.updatedBy,
    } as AuditDto;
}

interface AuditEntityType {
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

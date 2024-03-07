import { SystemError } from '@root/common/custom-error/error';

export class TenantInvalidError extends SystemError {
    constructor() {
        const message = `Invalid tenantId value.`;
        super(message);
        this.name = 'TenantInvalidError';
    }
}

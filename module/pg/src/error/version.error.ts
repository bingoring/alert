import { SystemError } from '@root/common/custom-error/error';

export class PolicyVersionInvalidError extends SystemError {
    constructor() {
        super(`Invalid policy version.`);
        this.name = 'PolicyVersionInvalidError';
    }
}

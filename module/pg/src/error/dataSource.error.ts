import { SystemError } from '@root/common/custom-error/error';

export class DataSourceNotFoundError extends SystemError {
    constructor() {
        const message = `Not found dataSource`;
        super(message);
        this.name = 'DataSourceNotFoundError';
    }
}

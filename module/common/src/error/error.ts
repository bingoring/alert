import { SystemError } from '../custom-error/error';
import { PublicProviderType } from '../type/provider.type';

export class InvalidRoleArnException extends SystemError {
    constructor(roleArn: string) {
        const message = `Invalid roleArn ${roleArn}`;
        super(message);
        this.name = `InvalidRoleArnException`;
    }
}
export class EncryptionDataNotFoundError extends SystemError {
    constructor() {
        const message = `Cannot find encryption key/salt.`;
        super(message);
        this.name = 'EncryptionDataNotFoundError';
    }
}

export class KeyInfoNotValidError extends SystemError {
    constructor(provider: PublicProviderType, keyInfo: any) {
        if (typeof keyInfo === 'object') {
            keyInfo = JSON.stringify(keyInfo, null, 4);
        }
        const message = `Not valid keyInfo '${keyInfo}' for provider ${provider}`;
        super(message);
        this.name = 'KeyInfoNotValidError';
    }
}

export class LogCollectorRequestFailException extends SystemError {
    constructor(method: string) {
        const message = `${method} request to LogCollector failed.`;
        super(message);
        this.name = `LogCollectorRequestFailException`;
    }
}

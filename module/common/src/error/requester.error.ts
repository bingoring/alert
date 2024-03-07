import { SystemError } from '../custom-error/error';

export class ServerConnectError extends SystemError {
    constructor(url: string) {
        const message = `Failed to connect to ${url}.`;
        super(message);
        this.name = `ServerConnectError`;
    }
}

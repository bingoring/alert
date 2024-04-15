export class LoadDashboardDataException extends Error {
    constructor(targetName: string, parentErrMsg: string) {
        super(`Statistics Data Store failed. (target: ${targetName}, message: ${parentErrMsg})`);
        this.name = 'LoadDashboardDataException';
    }
}

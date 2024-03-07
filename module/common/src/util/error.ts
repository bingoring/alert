export function errorWithCallBack(e: unknown, callBack: (e: Error) => any) {
    if (e instanceof Error) {
        return callBack(e);
    } else {
        return undefined;
    }
}

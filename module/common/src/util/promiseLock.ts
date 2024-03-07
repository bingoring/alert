export class PromiseLock {
    private locked: boolean;
    private readonly waiting: WaitingResolveType[];

    constructor() {
        this.locked = false;
        this.waiting = [];
    }

    public lock(): Promise<UnlockType> {
        const unlock = () => {
            if (this.waiting.length > 0) {
                const nextResolve = this.waiting.shift();
                if (nextResolve !== undefined) {
                    nextResolve(unlock);
                }
            } else {
                this.locked = false;
            }
        };

        if (this.locked) {
            return new Promise((resolve) => this.waiting.push(resolve));
        }

        this.locked = true;
        return new Promise((resolve) => resolve(unlock));
    }

    public static create() {
        return new PromiseLock();
    }
}

interface UnlockType {
    (): void;
}

type WaitingResolveType = (value: UnlockType) => void;

export class ArrayManager {
    public static equal(v1: any[], v2: any[]): boolean {
        if (v1.length !== v2.length) {
            return false;
        }

        for (let i = 0; i < v1.length; i++) {
            if (!ObjectManager.equal(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
}

export class ObjectManager {
    public static notEqual(v1: any, v2: any): boolean {
        return !this.equal(v1, v2);
    }

    public static equal(v1: any, v2: any): boolean {
        const t1 = typeof v1;
        const t2 = typeof v2;

        if (t1 !== t2) {
            return false;
        }

        if (v1 === null || v2 === null) {
            return v1 === v2;
        }

        if (t1 === 'object' && t2 === 'object') {
            const isV1Array = Array.isArray(v1);
            const isV2Array = Array.isArray(v2);
            if (isV1Array !== isV2Array) {
                return false;
            }

            if (isV1Array === true) {
                return ArrayManager.equal(v1, v2);
            } else {
                const v1KeyList = Object.keys(v1).filter((v) => v1[v] !== undefined);
                const v2KeyList = Object.keys(v2).filter((v) => v2[v] !== undefined);

                if (!ArrayManager.equal(v1KeyList.sort(), v2KeyList.sort())) {
                    return false;
                }

                for (const key of v1KeyList) {
                    if (!ObjectManager.equal(v1[key], v2[key])) {
                        return false;
                    }
                }
            }
        } else {
            return v1 === v2;
        }

        return true;
    }
}

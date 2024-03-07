import { isArray } from 'class-validator';

export class MockRedis implements RedisMockType {
    private readonly hash: Record<string, Record<string, string>>;
    private readonly string: Record<string, string>;
    private readonly list: Record<string, string[]>;
    private readonly redisSet: Record<string, Set<string>>;

    constructor() {
        this.hash = {};
        this.string = {};
        this.list = {};
        this.redisSet = {};
    }

    public async hget(key: string, field: string): Promise<string | null> {
        const fields = this.hash[key];
        if (!fields) {
            return null;
        }
        return fields[field] || null;
    }

    public async hgetall(key: string): Promise<Record<string, string>> {
        return this.hash[key];
    }

    public async hset(key: string, field: string, value: string): Promise<boolean> {
        if (!this.hash[key]) {
            this.hash[key] = {};
        }
        this.hash[key][field] = value;
        return true;
    }

    public async hdel(key: string, field: string): Promise<boolean> {
        const fields = this.hash[key];
        if (!fields) {
            return false;
        }
        const isDeleted = delete fields[field];
        if (Object.keys(fields).length === 0) {
            delete this.hash[key];
        }
        return isDeleted;
    }

    public async set(key: string, value: string): Promise<boolean> {
        this.string[key] = value;
        return true;
    }

    public async get(key: string): Promise<string | null> {
        return this.string[key] || null;
    }

    public async del(key: string): Promise<boolean> {
        return delete this.string[key] || delete this.hash[key] || delete this.list[key];
    }

    public async llen(key: string): Promise<number> {
        if (!this.list[key]) {
            return 0;
        }
        return this.list[key].length;
    }

    public async lpush(key: string, value: string): Promise<number> {
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].unshift(value);
        return this.list[key].length;
    }

    public async rpush(key: string, value: string): Promise<number> {
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(value);
        return this.list[key].length;
    }

    public async keys(pattern: string): Promise<string[]> {
        const regex = new RegExp(pattern.replace('*', '.*'));
        const resultList = Object.keys(this.string).filter((key) => regex.test(key));
        return resultList;
    }

    public async lrange(key: string, start: number, end: number): Promise<string[]> {
        if (!this.list[key]) {
            return [];
        }
        return this.list[key].slice(start, end + 1);
    }

    // 실제 RedisClient의 scan 메서드의 인자 변수명 때문
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public async scan(cursor: number, { MATCH }: { MATCH: string }): Promise<{ cursor: number; keys: string[] }> {
        const limit = 10;
        const regex = new RegExp(MATCH.replace('*', '.*'));
        const resultList: string[] = [];
        const keyList = [...Object.keys(this.string), ...Object.keys(this.hash), ...Object.keys(this.list)];
        let newCursor = cursor;

        for (let i = cursor; i < keyList.length && resultList.length < limit; i++) {
            if (regex.test(keyList[i])) {
                resultList.push(keyList[i]);
            }
            newCursor = i + 1;
        }

        return { cursor: newCursor === keyList.length ? 0 : newCursor, keys: resultList };
    }

    public async sadd(key: string, members: string | string[]) {
        let cnt = 0;
        if (this.redisSet[key] === undefined) {
            this.redisSet[key] = new Set();
        }
        if (isArray(members)) {
            members.forEach((member) => {
                this.redisSet[key].has(member) === false ? cnt++ : undefined;
                this.redisSet[key].add(member);
            });
            return cnt;
        }
        this.redisSet[key].add(members);
        this.redisSet[key].has(members) === false ? cnt++ : undefined;
        return cnt;
    }

    public async scard(key: string) {
        return this.redisSet[key].size;
    }
}
interface RedisMockType {
    hget: (key: string, field: string) => Promise<string | null>;
    hgetall: (key: string) => Promise<Record<string, string>>;
    hset: (key: string, field: string, value: string) => Promise<boolean>;
    hdel: (key: string, field: string) => Promise<boolean>;
    set: (key: string, value: string) => Promise<boolean>;
    get: (key: string) => Promise<string | null>;
    del: (key: string) => Promise<boolean>;
    llen: (key: string) => Promise<number>;
    lpush: (key: string, value: string) => Promise<number>;
    rpush: (key: string, value: string) => Promise<number>;
    keys: (pattern: string) => Promise<string[]>;
    scan: (cursor: number, { MATCH }: { MATCH: string }) => Promise<{ cursor: number; keys: string[] }>;
    sadd: (key: string, members: string | Array<string>) => Promise<number>;
    scard: (key: string) => Promise<number>;
}

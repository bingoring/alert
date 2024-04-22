import { Redis } from 'ioredis';
import * as msgpack from 'msgpack-lite';

export class MsgPackRedis extends Redis {
    public override async set(key: string, value: any) {
        const serializedValue = msgpack.encode(value);
        return await super.set(key, serializedValue);
    }

    public override async get<T>(key: string) {
        const serializedValue = await super.get(key);
        if (!serializedValue) {
            return null;
        }
        const bufferValue = Buffer.from(serializedValue, 'binary');
        return msgpack.decode(bufferValue) as T;
    }
}

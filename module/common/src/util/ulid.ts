import { ulid } from 'ulid';

export function timeToUlid(time: string | number) {
    const date = new Date(time);

    return ulid(date.getTime());
}

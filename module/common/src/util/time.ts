import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TimeOptionType } from '../type/time.type';

export function getTime(option?: TimeOptionType) {
    dayjs.extend(utc);

    try {
        const time = (() => {
            if (option?.time === undefined || option.time instanceof Date) {
                return dayjs(option?.time);
            }
            const isoTimeString = new Date(option?.time).toISOString();
            return dayjs(isoTimeString);
        })();
        if (option?.after !== undefined) {
            time.add(option.after, 'day');
        }
        return time.utc(false).format(option?.format ?? 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
        log.error(e);
        throw e;
    }
}

export function sleep(millisecond: number) {
    return new Promise((r) => setTimeout(r, millisecond));
}

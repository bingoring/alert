import { getTime } from './time';
describe('time module test', () => {
    it('should be return time', () => {
        const time = getTime();
        expect(time).not.toBeNull();
    });

    it('should be return time', () => {
        const time = getTime({ time: '2023-04-17T06:53:52.291Z' });
        expect(time).toEqual('2023-04-17 06:53:52');
    });
});

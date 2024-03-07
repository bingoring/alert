import { initConfig } from '@root/common/config/init';
import { DefaultConfig } from '../type';
import { ServerNameMap } from '../type/server.type';
describe('test initConfig module', () => {
    it('should be return DefaultConfig', async () => {
        globalThis.serverName = ServerNameMap.api;
        const config = await initConfig();
        expect(config).toStrictEqual(DefaultConfig);
        expect(env).toStrictEqual(DefaultConfig);
    });
});

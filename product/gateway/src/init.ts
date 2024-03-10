import { initConfig } from '@root/common/config/init';
import { initRedis } from '@root/common/redis';
import { ServerNameMap } from '@root/common/type/server.type';
import { bootstrapLogger, initLogger } from '@root/log/init';
import { initializeEntities } from './migration/main';

export async function initService() {
    globalThis.serverName = ServerNameMap.gateway;

    bootstrapLogger(serverName);
    await initConfig();
    initLogger(serverName, env.logLevel);
    await initRedis();

    await initializeEntities();
}

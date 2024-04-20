import path from 'path';
import { readFileSync, readdirSync } from 'fs';
import { ConfigType, decryptKeyList } from '../type';
import { dataDecrypt } from '../util/crypto';
import { EncryptKeyType } from '../type/crypto.type';
import { ConfigService } from '../service/config.service';
import { sleep } from '../util/time';
import { DefaultConfig, ServerInfoType, processKeyList } from '../type/config.type';
import { ServerNameMap } from '../type/server.type';

export async function initConfig() {
    const localConfig = (() => {
        const configPath = findConfigFile(__dirname);
        if (configPath === undefined) {
            console.debug('config.json file could not be found.');
            return DefaultConfig;
        }

        const initConfig = {
            gateway: DefaultConfig.gateway,
            isConfigUnlimitedRequests: DefaultConfig.isConfigUnlimitedRequests,
        };
        try {
            const config = JSON.parse(readFileSync(configPath).toString()) as ConfigType;
            if (config?.encrypt !== undefined) {
                decryptKey(config, config.encrypt);
            }

            return makeUrl({ ...initConfig, ...config });
        } catch (e) {
            console.error(e);
            return initConfig;
        }
    })();

    const apiConfig = await (async () => {
        if (serverName !== ServerNameMap.gateway) {
            const Second = 1000;
            const url = `http://${localConfig?.gateway?.host}:${localConfig?.gateway?.port}`;
            let count = 1;
            while (count <= 10 || localConfig.isConfigUnlimitedRequests) {
                console.debug(`env is requested (${count++})`);
                const configFromApi = await ConfigService.createInstance(url).get();
                if (configFromApi !== undefined) {
                    console.info('env request successful');
                    return configFromApi;
                }
                await sleep(Second);
            }
        }
    })();

    globalThis.env = { ...DefaultConfig, ...apiConfig, ...localConfig };
    return env;
}

function findConfigFile(currentDir: string): string | undefined {
    const configFile = 'config.json';
    const dirContentList = readdirSync(currentDir);

    if (dirContentList.includes(configFile)) {
        return path.join(currentDir, configFile);
    } else {
        const parent = path.dirname(currentDir);
        if (parent === currentDir) {
            return undefined;
        }
        return findConfigFile(parent);
    }
}

function makeUrl(config: ConfigType) {
    const keyList = Object.keys(config) as Array<keyof ConfigType>;

    for (const key of keyList) {
        if (processKeyList.find((processKey) => key === processKey) === undefined) {
            continue;
        }
        const configItem = config[key] as ServerInfoType;
        (config[key] as ServerInfoType) = {
            ...configItem,
            url: `${configItem.protocol}://${configItem.host}:${configItem.port}`,
        };
    }
    return config;
}

function decryptKey(obj: any, encryptKey: EncryptKeyType) {
    if (typeof obj !== 'object') {
        return;
    }

    for (const key in obj) {
        if (decryptKeyList.includes(key)) {
            obj[key] = dataDecrypt(obj[key], encryptKey);
        } else {
            if (typeof obj[key] === 'object') {
                decryptKey(obj[key], encryptKey);
            }
        }
    }
}

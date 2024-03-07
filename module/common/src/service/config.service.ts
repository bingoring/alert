import { Request } from '../util/request/request';
import { ConfigType } from '../type';
import { GetConfigResponse } from './dto/getConfig.dto';

export class ConfigService {
    private readonly request;
    constructor(url: string) {
        this.request = new Request(url);
    }

    public async get(): Promise<ConfigType | undefined> {
        try {
            const res = await this.request.send<GetConfigResponse>('/config', { method: 'get' });
            return res?.configData;
        } catch (e) {
            log.error(e);
            return undefined;
        }
    }

    public static createInstance(url: string) {
        return new ConfigService(url);
    }
}

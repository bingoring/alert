/* eslint-disable no-var */
import {} from '@root/logger/define/global';
import {} from '@root/log/define/global';

import { ConfigType } from '../type/config.type';
import { Cluster, Redis } from 'ioredis';
import { ServerNameType } from '../type/server.type';

declare global {
    var env: Readonly<ConfigType>;
    var redis: Redis | Cluster;
    var serverName: ServerNameType;
}

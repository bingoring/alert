import { Cluster, NatMap, Redis } from 'ioredis';

export async function initRedis() {
    const errorCodeList = ['ECONNREFUSED', 'EHOSTUNREACH', 'ETIMEDOUT'];

    const client = getClient();

    client.addListener('error', (err: { code: string }) => {
        if (errorCodeList.includes(err.code)) {
            log.error('Failed to connect to redis');
        } else {
            log.error(`Error occurred while using the redis`);
        }
    });

    client.addListener('connect', () => {
        log.debug('Successful connection to redis');
    });

    globalThis.redis = client;
}

function getClient() {
    const nodeList = env.redis.nodeList;

    if (env.redis.isCluster) {
        return new Cluster(
            nodeList.map((v) => ({
                port: v.port,
                host: v.host,
            })),
            {
                natMap: nodeList.reduce<NatMap>((result, v) => {
                    if (v.url !== undefined) {
                        result[v.url] = { port: v.port!, host: v.host! };
                    }
                    return result;
                }, {}),
                redisOptions: {
                    password: env.redis.passwd,
                },
            }
        );
    }

    const [nodeInfo] = nodeList;

    return new Redis({ port: nodeInfo.port, host: nodeInfo.host, password: env.redis.passwd });
}

import { randomInt } from 'crypto';
import { Request } from 'express';

export function getIpAddr(req: Request): string {
    try {
        return (
            ((req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || req.ip) as string
        )
            ?.replace('\\', '')
            ?.split('::ffff:')
            ?.reverse()?.[0];
    } catch {
        return '';
    }
}

export function getDataObject(req: Request): string {
    const contentLength = +(req.headers['content-length'] ?? '0');
    if (contentLength > 10000) {
        return '';
    }

    const query = JSON.parse(JSON.stringify(req.query ?? {}));
    const body = JSON.parse(JSON.stringify(req.body ?? {}));

    const obj = maskingObject({ ...query, ...body });
    const stringObj = JSON.stringify(obj);

    return stringObj.length > 10000 ? stringObj.slice(0, 10000) : stringObj;
}

const maskingKeyList = [
    'passwd',
    'secretKey',
    'newPasswd',
    'password',
    'accessKey',
    'region',
    'subscriptionId',
    'clientId',
    'jsonText',
    'project',
    'zone',
    'osAdminId',
    'osPassword',
    'verion',
    'osAuthUrl',
    'osProject',
    'tokenCode',
    'SAMLResponse',
    'certificate',
    'private_key',
    'private_key_id',
    'project_id',
    'client_email',
    'client_id',
    'auth_uri',
    'token_uri',
    'auth_provider_x509_cert_url',
    'client_x509_cert_url',
    'user',
    'server',
    'protocol',
];

export function maskingObject(obj: any) {
    try {
        for (const [key, value] of Object.entries(obj ?? {})) {
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    obj[key] = value.map((v) => maskingObject(v));
                    continue;
                }
                obj[key] = maskingObject(value);
            } else {
                if (maskingKeyList.includes(key)) {
                    obj[key] = '********';
                }
            }
        }
        return obj;
    } catch (e) {
        return '';
    }
}

export function createRandomPassword() {
    const bigAlphaList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const smaAlphaList = 'abcdefghijklmnopqrstuvwxyz';
    const numList = '0123456789';
    const specList = '@$!%*?&';

    const passSetList = [bigAlphaList, smaAlphaList, numList, specList];
    let passwd = '';

    for (const set of passSetList) {
        for (let i = 0; i < 3; i++) {
            const index = randomInt(0, set.length);
            passwd += set[index];
        }
    }

    const passwdStrList = passwd.split('');

    for (let i = passwdStrList.length - 1; i > 0; i--) {
        const j = randomInt(0, i + 1);
        const tmp = passwdStrList[i];
        passwdStrList[i] = passwdStrList[j];
        passwdStrList[j] = tmp;
    }

    return passwdStrList.join('');
}

// checks if every element of mainlist contains every element of sublist
export function isContainsSublist(mainList: string[], subList: string[]) {
    return subList.every((item) => mainList.includes(item));
}

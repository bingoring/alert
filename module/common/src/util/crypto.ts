import { constants, createCipheriv, createDecipheriv, createHash, pbkdf2Sync, publicEncrypt } from 'crypto';
import { EncryptKeyType } from '../type';
import { existsSync, readFileSync } from 'fs';

function generateDataEncryptionKey(passwd: string, salt: string): Buffer | undefined {
    try {
        const derivedKey = pbkdf2Sync(passwd, salt, 10000, 48, 'sha512');
        return derivedKey;
    } catch (e) {
        log.error(e);
        return undefined;
    }
}

export function dataEncrypt(pt: string | object, encryptData: EncryptKeyType): string {
    try {
        pt = typeof pt === 'object' ? JSON.stringify(pt) : pt;
        const derivedKey = generateDataEncryptionKey(encryptData.key, encryptData.salt);
        if (derivedKey === undefined) {
            return '';
        }

        const iv = derivedKey.slice(0, 16);
        const key = derivedKey.slice(16, 48);

        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const enc = cipher.update(pt);
        const encLast = cipher.final();
        const ct = Buffer.concat([enc, encLast], enc.length + encLast.length);
        return ct.toString('hex');
    } catch (e) {
        log.error(e);
        return '';
    }
}

export function dataDecrypt(ct: string, encryptData: EncryptKeyType): string {
    try {
        if ((ct ?? '').length === 0) {
            return '';
        }
        const derivedKey = generateDataEncryptionKey(encryptData.key, encryptData.salt);
        if (derivedKey === undefined) {
            return '';
        }
        const iv = derivedKey?.slice(0, 16);
        const key = derivedKey?.slice(16, 48);

        const data = Buffer.from(ct ?? '', 'hex');
        const cipher = createDecipheriv('aes-256-ctr', key, iv);
        const dec = cipher.update(data);
        const decLast = cipher.final();
        const pt = Buffer.concat([dec, decLast], dec.length + decLast.length);
        return pt.toString();
    } catch (e) {
        log.error(e);
        return '';
    }
}

export function getEncryptKey(key: string) {
    const buffer = Buffer.from(key);

    const publicKey = (() => {
        if (!existsSync(env.publicKeyPath)) {
            return readFileSync(env.publicKeyPath).toString();
        }
        return createHash('sha512')
            .update(env.encrypt?.key ?? '')
            .digest('hex');
    })();

    return publicEncrypt(
        {
            key: publicKey,
            padding: constants.RSA_PKCS1_PADDING,
        },
        buffer
    );
}

export function getConfigEncKey(key: string) {
    const publicKey = createHash('sha512')
        .update((env.encrypt?.key ?? '') + key)
        .digest('hex');
    return getEncryptKey(publicKey).toString('base64');
}

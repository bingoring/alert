import { PublicProviderType } from '@root/common/type/provider.type';
import { EncryptionDataNotFoundError, KeyInfoNotValidError } from '../error/error';
import { dataDecrypt, dataEncrypt } from '@root/common/util/crypto';
import { KeyType } from '@root/common/type/cloud/key.type';
import { isKeyType } from './typeGuard';

const excludeEncryptList = ['user', 'region'];

export function encryptKeyInfo<Provider extends PublicProviderType>(provider: Provider, keyInfo: KeyType<Provider>) {
    const { encrypt } = env;
    if (encrypt === undefined) {
        throw new EncryptionDataNotFoundError();
    }

    const encryptedKeyInfo = Object.keys(keyInfo).reduce((acc, keyName) => {
        if (provider === 'OCP' || excludeEncryptList.includes(keyName)) {
            return acc;
        }

        const key = keyName as keyof KeyType<Provider>;

        if (typeof keyInfo[key] === 'string' || typeof keyInfo[key] === 'object') {
            acc[keyName] = dataEncrypt(keyInfo[key] as string | object, encrypt);
        }
        return acc;
    }, {} as Record<string, string>);

    return encryptedKeyInfo;
}

export function decryptKeyInfo<Provider extends PublicProviderType>(
    provider: Provider,
    keyInfo: Record<string, string>
): KeyType<Provider> {
    const { encrypt } = env;
    if (encrypt === undefined) {
        throw new EncryptionDataNotFoundError();
    }

    const decryptedKeyInfo = Object.keys(keyInfo).reduce((acc, keyName) => {
        if (provider === 'OCP' || excludeEncryptList.includes(keyName)) {
            acc[keyName] = keyInfo[keyName];
            return acc;
        }

        const key = dataDecrypt(keyInfo[keyName], encrypt);
        if (provider === 'NHN' && key.includes('{')) {
            acc[keyName] = JSON.parse(key);
            return acc;
        }

        acc[keyName] = key;
        return acc;
    }, {} as Record<string, string>);

    if (!isKeyType(provider, decryptedKeyInfo)) {
        throw new KeyInfoNotValidError(provider, decryptedKeyInfo);
    }

    return decryptedKeyInfo;
}

import { dataDecrypt, dataEncrypt } from './crypto';

describe('crypto module test', () => {
    it('should be return cypher text', async () => {
        const result = dataEncrypt(plainText, encrypt);
        expect(result).toEqual(cypherText);
    });

    it('should be return plain text', async () => {
        const result = dataDecrypt(cypherText, encrypt);
        expect(result).toEqual(plainText);
    });

    it('should be return empty string', async () => {
        expect(dataDecrypt('', encrypt)).toEqual('');
        expect(dataEncrypt('', encrypt)).toEqual('');
    });

    const encrypt = {
        key: 'kwu7Sqp1MzC^GgiXd7UcEqE%IAVi50sM8M1iATi1AcSdUnCruH8NJ^6tGng38Cme',
        salt: 'CKks412bOsJIJ7i6PngEfiqtD9eb@VUAUwliN35yMCZKT9nftw5IpuaeGncSf4a',
    };

    const plainText = 'test';
    const cypherText = '130a8569';
});

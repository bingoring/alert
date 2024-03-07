import { extractAccountId, extractRoleName } from './extract';
import { InvalidRoleArnException } from '@root/common/error/error';

describe('util', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('extractRoleName - OK', () => {
        const roleArn = 'arn:aws:iam::12345678910:role/MyRole';
        const result = extractRoleName(roleArn);
        expect(result).toStrictEqual('MyRole');
    });

    test('extractRoleName - Error(Invalid role arn)', async () => {
        const roleArn = 'arn:aws:iam::12345678910:user/MyUser';
        try {
            extractRoleName(roleArn);
        } catch (e) {
            expect(e).toStrictEqual(new InvalidRoleArnException(roleArn));
        }
    });

    test('extractAccountId - OK', () => {
        const roleArn = 'arn:aws:iam::12345678910:role/MyRole';
        const result = extractAccountId(roleArn);
        expect(result).toStrictEqual('12345678910');
    });

    test('extractAccountId - Catch(Invalid role arn)', async () => {
        const roleArn = '';
        try {
            extractAccountId(roleArn);
        } catch (e) {
            expect(e).toStrictEqual(new InvalidRoleArnException(roleArn));
        }
    });
});

import { Request } from './request';
import axios from 'axios';

jest.mock('axios');

describe('Request Test', () => {
    const mockedAxios = axios as jest.MockedFunction<typeof axios>;
    let mockResponse: Record<string, any>;

    let request: Request;

    beforeEach(() => {
        mockResponse = {};

        mockedAxios.mockImplementation(async () => {
            return { data: mockResponse };
        });

        request = new Request('test-domain');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('send', () => {
        test('should be return response data', async () => {
            mockResponse['test-field'] = 'test';

            const result = await request.send('/test-path', { method: 'get' });

            expect(result).toStrictEqual(mockResponse);
        });

        test('if error occur when axios is called, this error is must throwed outside', async () => {
            const errMsg = 'error message for test';
            mockedAxios.mockImplementation(async () => {
                throw new Error(errMsg);
            });

            await expect(request.send('/test-path', { method: 'post', data: {} })).rejects.toThrowError(
                new Error(errMsg)
            );
        });
    });
});

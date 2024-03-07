import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';

export type StatusCodeType = keyof typeof HttpStatusCode;
export type StatusCodeValueType = (typeof HttpStatusCode)[StatusCodeType];

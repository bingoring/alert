import { AbstractGatewayResponse } from '@backend-x/nest/constant/response.constant';

export interface UserServiceOffsetBaseResponseType<T> extends AbstractGatewayResponse {
    value: { itemList: T[]; page: number; size: number; totalItemCount: number; totalPageCount: number };
}

export interface UserServiceOffsetQueryType {
    page?: number;
    size?: number;
    sort?: string | string[];
    searchWord?: string;
}

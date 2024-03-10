import { GatewayResponseType } from '@root/nest/constant/response.constant';
import { AbstractOffsetResponseValueDto } from '@root/nest/type/paginationDto.type';
import { OffsetQueryDto } from '@root/nest/type/paginationDto.type';
import { UserServiceOffsetBaseResponseType, UserServiceOffsetQueryType } from '../type/userService.type';
import { ValueNotFound } from '@root/gateway/constant/error/request/response.error';
import { SearchFilterType, SortColumnType } from '@root/nest/dto/filterSort.dto';

export function toUserOffsetQuery<T extends OffsetQueryDto>(gatewayQuery: T) {
    return {
        ...gatewayQuery,
        page: (gatewayQuery?.page ?? 1) - 1,
        searchWord: gatewayQuery.searchKeyWord,
        size: gatewayQuery.limit,
        searchFilterList: JSON.stringify(gatewayQuery.searchFilterList),
        sort: gatewayQuery.sortList?.map(({ column, sort }) => `${column},${sort}`),
    } as T & UserServiceOffsetQueryType;
}

export function convertSearchFilter(enableColumn?: Record<string, string>, searchFilterList?: SearchFilterType[]) {
    if (enableColumn === undefined || searchFilterList === undefined) {
        return undefined;
    }
    const convertResultList = searchFilterList
        .map((searchFilter) => ({
            ...searchFilter,
            column: enableColumn[searchFilter.column],
        }))
        .filter((searchFilter) => searchFilter.column !== undefined);
    return convertResultList;
}

export function convertSort(enableColumn?: Record<string, string>, sortList?: SortColumnType[]) {
    if (enableColumn === undefined || sortList === undefined) {
        return undefined;
    }
    const convertResultList = sortList
        .map((sortData) => ({
            ...sortData,
            column: enableColumn[sortData.column],
        }))
        .filter((sortData) => sortData.column !== undefined);
    return convertResultList;
}

export function toGatewayOffsetResponse<T>(
    userResponse: UserServiceOffsetBaseResponseType<T>
): GatewayResponseType<AbstractOffsetResponseValueDto<T>> {
    const userValue = userResponse.value;

    if (userValue === undefined) {
        throw new ValueNotFound();
    }

    const value: AbstractOffsetResponseValueDto<T> = {
        itemList: userValue.itemList,
        meta: {
            currentPage: userValue.page,
            itemCount: userValue.size,
            totalPages: userValue.totalPageCount,
            itemsPerPage: (userValue.page / userValue.totalPageCount) * 100,
            totalItems: userValue.totalItemCount,
        },
    };

    return {
        statusCode: userResponse.statusCode,
        error: userResponse.error,
        value,
    };
}

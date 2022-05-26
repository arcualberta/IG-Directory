import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';

export const stateCommon = {
    templateId: null as null | Guid,
    collectionId: null as null | Guid,
    groupId: null as null | Guid,
    stateIdRestrictions: [] as Guid[],
    queryParams: null as null | string,
    offset: 0,
    pageSize: 25,
    queryApiUrl: null as null | string,
    searchText: null as null | string,
    searchResult: {
        first: 0,
        last: 0,
        count: 0,
        items: [] as search.ResultItem[]
    } as search.SearchOutput,
}
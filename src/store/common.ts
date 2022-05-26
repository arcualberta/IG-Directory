import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';

export interface BaseState {
    templateId: null | Guid;
    collectionId: null | Guid;
    groupId: null | Guid;
    stateIdRestrictions: Guid[];
    queryParams: null | string;
    offset: number;
    pageSize: number;
    queryApiUrl: null | string;
    searchText: null | string;
    searchResult: search.SearchOutput;
}

export const baseState: BaseState = {
    templateId: null,
    collectionId: null,
    groupId: null,
    stateIdRestrictions: [],
    queryParams: null,
    offset: 0,
    pageSize: 25,
    queryApiUrl: null,
    searchText: null,
    searchResult: {
        first: 0,
        last: 0,
        count: 0,
        items: [] 
    },
}

export const fetchQuery = (
    templateId: Guid,
    collectionId: Guid,
    groupId: Guid,
    queryModel: search.SolrQuery.QueryModel,
    searchText: string,
    offset: number,
    pageSize: number,
    queryApiUrl: string,
    resultCallback: any
) => {


    const formData = new FormData();

    formData.append("templateId", templateId as any as string);
    formData.append("collectionId", collectionId as any as string);
    formData.append("groupId", groupId as any as string);
    formData.append("query", queryModel?.buildQueryString());
    formData.append("searchText", searchText);

    formData.append("offset", offset.toString());
    formData.append("max", pageSize.toString());

    fetch(queryApiUrl, {
        method: 'POST', // or 'PUT'
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            //console.log("Search Results:\n", JSON.stringify(data));
            resultCallback(JSON.parse(JSON.stringify(data)));
            
        })
        .catch((error) => {
            console.error('Item Load API Error:', error);
        });
}
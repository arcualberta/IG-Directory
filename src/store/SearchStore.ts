import { defineStore } from 'pinia';
import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        templateId: null as null | Guid,
        collectionId: null as null | Guid,
        groupId: null as null | Guid,
        stateIdRestrictions: [] as Guid[],
        queryParams: null as null | string,
        offset: 0,
        pageSize: 25,
        queryModelRetrieverApiUrl: null as null | string,
        queryApiUrl: null as null | string,
        keywordQueryModel: null as null | search.KeywordQueryModel,
        searchText: null as null | string,
        searchResult: {
            first: 0,
            last: 0,
            count: 0,
            items: [] as search.ResultItem[]
        } as search.SearchOutput,
    }),
    getters: {
        resultCount: state => state.searchResult?.items?.length
    },
    actions: {
        fetchQueryModel() {
            if (this.queryModelRetrieverApiUrl)
                fetch(this.queryModelRetrieverApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.keywordQueryModel = data;
                    });
        },
        fetchData() {
            const api = this.queryApiUrl + 'keywordsearch';
            console.log("Item Load API: ", api)

            const formData = new FormData();

            if (this.templateId)
                formData.append("templateId", this.templateId.toString());

            if (this.collectionId)
                formData.append("collectionId", this.collectionId.toString());

            if (this.groupId)
                formData.append("groupId", this.groupId.toString())

            if (this.searchText)
                formData.append("searchText", this.searchText as string);

            formData.append("offset", this.offset.toString());
            formData.append("max", this.pageSize.toString());
            formData.append("queryParams", JSON.stringify(this.keywordQueryModel));


            fetch(api, {
                method: 'POST', // or 'PUT'
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    this.searchResult = data;
                })
                .catch((error) => {
                    console.error('Item Load API Error:', error);
                });
        }
    }
});
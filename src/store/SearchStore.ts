import { defineStore } from 'pinia';

import { search } from '@arcualberta/catfish-ui';

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        queryModelRetrieverApiUrl: null as null | string,
        queryApiUrl: null as null | string,
        keywordQueryModel: null as null | search.KeywordQueryModel,
        freeTextSearchEntries: [] as string[],
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
        }
    }
});
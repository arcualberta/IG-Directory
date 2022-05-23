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
        resultCount: state => state.searchResult?.items?.length,
        selectedKeywords(state): search.Keyword[] {
            const flattenedList: search.Keyword[] = [];
            state.keywordQueryModel?.containers.forEach((container, cIndex) => {
                container.fields.forEach((field, fIndex) => {
                    field.selected.forEach((flag, vIndex) => {
                        if (flag) {
                            flattenedList.push({
                                index: {
                                    containerIndex: cIndex,
                                    fieldIndex: fIndex,
                                    valueIndex: vIndex
                                },
                                value: field.values[vIndex]
                            })
                        }
                    })
                })
            });

            return flattenedList;
        },

        /**
         * Returns the value of the solr field with the name specified by the 
         * second input parameter "solrFieldName" from the item specified by the
         * first input parameter. If the firts input parameter is a number, then
         * retrieves the item at that index from the search reslts stored at the
         * store state */
        getSolrFieldValue: state => (itemOrIndex: search.ResultItem | number, solrFieldName: string) => {

            const item = (typeof itemOrIndex === "number")
                ? state.searchResult?.items[itemOrIndex]
                : itemOrIndex;

            if (item?.solrFields) {
                const index = Object.keys(item.solrFields).indexOf(solrFieldName);
                if (index >= 0)
                    return Object.values(item.solrFields)[index]
            }
            return null;
        },
    },
    actions: {
        fetchQueryModel() {
            console.log("fetchQueryModel");
            if (this.queryModelRetrieverApiUrl)
                fetch(this.queryModelRetrieverApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        //console.log("keywordQueryModel:\n", data);
                        this.keywordQueryModel = data;
                    });
        },
        fetchData() {
            if (this.queryApiUrl) {
                console.log("Item Load API: ", this.queryApiUrl)

                const formData = new FormData();

                if (this.templateId)
                    formData.append("templateId", this.templateId as any as string);

                if (this.collectionId)
                    formData.append("collectionId", this.collectionId as any as string);

                if (this.groupId)
                    formData.append("groupId", this.groupId as any as string)

                if (this.keywordQueryModel)
                    formData.append("queryParams", JSON.stringify(this.keywordQueryModel));

                if (this.searchText)
                    formData.append("searchText", this.searchText);

                formData.append("offset", this.offset.toString());
                formData.append("max", this.pageSize.toString());

                console.log("Store:\n", JSON.stringify(this))
                console.log("FormData:\n", formData)

                fetch(this.queryApiUrl, {
                    method: 'POST', // or 'PUT'
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        //console.log("Search Results:\n", JSON.stringify(data));
                        this.searchResult = JSON.parse(JSON.stringify(data));
                    })
                    .catch((error) => {
                        console.error('Item Load API Error:', error);
                    });
            }
        },
        selectKeyword(payload: search.KeywordIndex) {
            if (this.keywordQueryModel) {
                this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = true;
                this.fetchData();
            }
        },
        unselectKeyword(payload: search.KeywordIndex) {
            if (this.keywordQueryModel) {
                this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = false;
                this.fetchData();
            }
        },
        clearKeywordSelection() {
            this.keywordQueryModel?.containers.forEach(cont => cont.fields.forEach(field => field.selected = new Array(field.values.length).fill(false)))
            this.fetchData();
        },
    }
});
import { defineStore } from 'pinia';
import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';
import { SearchResultFieldMapping } from '../appsettings'

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
        selectedKeywords:[] as search.Keyword[],
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
        getName: () => (item: search.ResultItem) => item?.solrFields?.find(x => x.solrFieldId === SearchResultFieldMapping.NAME)?.fieldContent
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
                        console.log("Search Results:\n", JSON.stringify(data));
                        this.searchResult = data;
                    })
                    .catch((error) => {
                        console.error('Item Load API Error:', error);
                    });
            }
        },
        selectKeyword(payload: search.KeywordIndex) {
            if(this.keywordQueryModel)
                this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = true;
        },
        clearKeywordSelection() {
            this.keywordQueryModel?.containers.forEach(cont => cont.fields.forEach(field => field.selected = new Array(field.values.length).fill(false)))
        },
        setSelectedKeywords(){
            this.selectedKeywords=[] as search.Keyword[];
            this.keywordQueryModel?.containers.forEach((cont: { fields: any[]; }, cIdx:number) =>
                cont.fields.forEach((field, fIdx: number) =>
                    field.values.forEach((val: any, vIdx: number) => {
                        if (this.keywordQueryModel?.
                            containers[cIdx]
                            .fields[fIdx]
                            .selected[vIdx])
                           
                            this.selectedKeywords.push({ index: { containerIndex: cIdx, fieldIndex: fIdx, valueIndex: vIdx }, value: val } as search.Keyword);
                    })
                )
            )  
      },
      addKeyword(cIdx: number, fIdx: number, vIdx: number){
        if (!this.keywordQueryModel?.
            containers[cIdx]
            .fields[fIdx]
            .selected[vIdx]) {
            this.selectKeyword({ containerIndex: cIdx, fieldIndex: fIdx, valueIndex: vIdx } as search.KeywordIndex)
            this.setSelectedKeywords();
            //TO DO 
             //store.dispatch(search.Actions.FRESH_SEARCH);
       }
    },
    removeKeyword(payload: search.KeywordIndex){
        //store.commit(search.Mutations.CLEAR_KEYWORD, index);
        console.log("remove selected keyword: ")
        console.log(JSON.stringify(payload))
        if (this.keywordQueryModel)
            this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = false; 

        this.setSelectedKeywords();

        //TO DO 
             //store.dispatch(search.Actions.FRESH_SEARCH);
    },
  }
});
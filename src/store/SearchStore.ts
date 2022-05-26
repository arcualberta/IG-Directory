import { defineStore } from 'pinia';
import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';

import { stateCommon } from './stateCommon';
import { createSearchQueryModel } from '../helpers/createSearchQueryModel';

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        ...stateCommon,
        solrQueryModel: createSearchQueryModel(),
    //    activeProfile: null as search.ResultItem | null,
    }),
    getters: {
        keywords(): search.SolrQuery.ValueConstraint[] { return (this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint).valueConstraints },
        resultCount: state => state.searchResult?.items?.length,
        selectedKeywords(): search.SolrQuery.ValueConstraint[] {
            return this.keywords.filter(keyword => keyword.selected)
        },
        freeTextField(): search.SolrQuery.ValueConstraint {
            const fieldConstraint = this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "freetext") as search.SolrQuery.FieldConstraint;
            if (fieldConstraint.valueConstraints.length === 0)
                fieldConstraint.valueConstraints.push({} as search.SolrQuery.ValueConstraint);

            return fieldConstraint.valueConstraints[0];
        },
    },
    actions: {
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

                if (this.solrQueryModel) {
                    const queryString = this.solrQueryModel.buildQueryString();
                    formData.append("query", queryString);
                }

                if (this.searchText)
                    formData.append("searchText", this.searchText);

                formData.append("offset", this.offset.toString());
                formData.append("max", this.pageSize.toString());

                //console.log("Store:\n", JSON.stringify(this))
                //console.log("FormData:\n", formData)

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
        selectKeyword(index: number) {
            if (!this.keywords[index].selected) {
                this.keywords[index].selected = true;
                this.fetchData();
            }
        },
        unselectKeyword(index: number) {
            this.selectedKeywords[index].selected = false;
            this.fetchData();
        },
        clearKeywordSelection() {
            this.selectedKeywords.forEach(keyword => keyword.selected = false);
            this.fetchData();
        },
        setFreeTextSearchValue(text: string) {
            if (text?.length > 0) {
                this.freeTextField.selected = true;
                this.freeTextField.value = text;
            }
            else {
                this.freeTextField.selected = false;
                this.freeTextField.value = "";
            }
        },
        //selectKeyword(payload: search.KeywordIndex) {
        //    if (this.keywordQueryModel) {
        //        this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = true;
        //        this.fetchData();
        //    }
        //},
        //unselectKeyword(payload: search.KeywordIndex) {
        //    if (this.keywordQueryModel) {
        //        this.keywordQueryModel.containers[payload.containerIndex].fields[payload.fieldIndex].selected[payload.valueIndex] = false;
        //        this.fetchData();
        //    }
        //},
        //clearKeywordSelection() {
        //    this.keywordQueryModel?.containers.forEach(cont => cont.fields.forEach(field => field.selected = new Array(field.values.length).fill(false)))
        //    this.fetchData();
        //},

    //    setActiveProfile(profileId: Guid) {
    //        this.activeProfile = this.searchResult.items.filter(item => item.id === profileId)[0];
    //        if (!this.activeProfile) {
                
    //            const apiUrl=this.queryApiUrl+ '/' + profileId;
    //            fetch(apiUrl)
    //            .then(response => response.json())
    //                .then(data => 
    //                    this.activeProfile= data
    //                );
    //        }
    //    }
    }
});
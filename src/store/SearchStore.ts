import { defineStore } from 'pinia';
import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';

import { baseState, fetchQuery } from './common';
import { createSearchQueryModel } from '../helpers/createSearchQueryModel';
import { ResultItem } from '@arcualberta/catfish-ui/dist/types/src/lib-components/search';

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        ...baseState,
        solrQueryModel: createSearchQueryModel(),
    }),
    getters: {
        keywords(): search.SolrQuery.ValueConstraint[] { return (this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint).valueConstraints },
        resultCount: state => state.searchResult?.items?.length,
        selectedKeywords(): search.SolrQuery.ValueConstraint[] {
            return this.keywords.filter(keyword => keyword.selected)
        },
    },
    actions: {
        fetchData() {
            fetchQuery(
                this.templateId as Guid,
                this.collectionId as Guid,
                this.groupId as Guid,
                this.solrQueryModel as search.SolrQuery.QueryModel,
                this.searchText as string,
                this.offset,
                this.pageSize,
                this.queryApiUrl as string,
                (result: search.SearchOutput) => { this.searchResult = result; }
            )
        },
        fetchNextPage() {
            fetchQuery(
                this.templateId as Guid,
                this.collectionId as Guid,
                this.groupId as Guid,
                this.solrQueryModel as search.SolrQuery.QueryModel,
                this.searchText as string,
                this.searchResult.last,
                this.pageSize,
                this.queryApiUrl as string,
                (result: search.SearchOutput) => {
                    this.searchResult.items = this.searchResult.items.concat(result.items);
                    this.searchResult.last = result.last

                }
            )
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
            
            //clear searchText
            const fieldConstraint = (this.solrQueryModel.queryConstraints as search.SolrQuery.FieldConstraint[]).find(qc => qc.internalId === "freetext") as search.SolrQuery.FieldConstraint;
            fieldConstraint.valueConstraints[0].value = "";

            this.fetchData();
        },
        ////setFreeTextSearchValue(text: string) {
        ////    if (text?.length > 0) {
        ////        this.freeTextField.selected = true;
        ////        this.freeTextField.value = text;
        ////    }
        ////    else {
        ////        this.freeTextField.selected = false;
        ////        this.freeTextField.value = "";
        ////    }
        ////},
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
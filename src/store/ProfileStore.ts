import { Guid } from 'guid-typescript';
import { defineStore } from 'pinia';

import { search } from '@arcualberta/catfish-ui';

import config from '../appsettings';
import { baseState, fetchQuery } from './common';
import { createProfileQueryModel } from '../helpers/createProfileQueryModel';

interface UserInfo {
    userName: string | null;
    roles: string[] | null;
}

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        ...baseState,
        solrQueryModel: createProfileQueryModel(search.SolrQuery.AggregationOperator.AND),
        defaultQueryModel: createProfileQueryModel(search.SolrQuery.AggregationOperator.OR),
        activeProfile: null as search.ResultItem | null,
        userInfo: null as UserInfo | null,
  }),
    getters: {
        keywordFieldConstratint(): search.SolrQuery.FieldConstraint {
            return this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint;
        },
        keywords(): search.SolrQuery.ValueConstraint[] { return this.keywordFieldConstratint.valueConstraints },
        defaultQueryModelFieldConstratint(): search.SolrQuery.FieldConstraint {
            return this.defaultQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint;
        },

    },
    actions: {
        fetchUserInfo() {
            const api = `${config.dataServiceApiRoot}users/current`
            //console.log(api)

            fetch(api, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.userInfo = data;
                })
                .catch((error) => {
                    console.error('User Info Load API Error:', error);
                });
        },
        signOut() {
            const api = `${config.dataServiceApiRoot}users/logout`

            fetch(api, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.userInfo = data;
                })
                .catch((error) => {
                    console.error('Logout API Error:', error);
                });
        },
        fetchData() {
            if (!this.activeProfile)
                return;

            console.log("ProfileStore.fetchData called")

            let queryModel: search.SolrQuery.QueryModel | null = null;
            if (this.keywords.find(kw => kw.selected)) {
                //At least onekeyword query constraint is enforced. Therefore, use the query model as is
                queryModel = this.solrQueryModel as search.SolrQuery.QueryModel;
            }
            else {
                //No keyword is selected in the keyword list, then we need to limit the search result to individuals who are sharing at least
                //one keyword in the list of keywords available in the keyword list. Otherwise, we will be pulling the entire list of directory
                //entries in the database as related researchers.
                queryModel = this.defaultQueryModel as search.SolrQuery.QueryModel;
            }

            queryModel.excludeIds = [(this.activeProfile as search.ResultItem)?.id];

            fetchQuery(
                this.templateId as Guid,
                this.collectionId as Guid,
                this.groupId as Guid,
                queryModel,
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
        setActiveProfile(profileId: Guid) {
            if (profileId) {
                this.activeProfile = this.searchResult.items.filter(item => item.id === profileId)[0];
                if (!this.activeProfile) {

                    const apiUrl = this.queryApiUrl + '/' + profileId;
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data =>
                            this.activeProfile = data
                        );
                }
            }
            else
                this.activeProfile = null;
        },
        setKeywords(keywordValues: string[]) {
            this.keywordFieldConstratint.valueConstraints = [];
            this.defaultQueryModelFieldConstratint.valueConstraints = [];

            keywordValues?.forEach(val => {
                this.keywordFieldConstratint.valueConstraints.push({
                    selected: false,
                    value: val
                })
                this.defaultQueryModelFieldConstratint.valueConstraints.push({
                    selected: true,
                    value: val
                })
            })
        },
        selectKeyword(index: number) {
            if (!this.keywords[index].selected) {
                this.keywords[index].selected = true;
                this.fetchData();
            }
        },
    }
});
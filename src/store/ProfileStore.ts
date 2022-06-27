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
        solrQueryModel: createProfileQueryModel(),
        activeProfile: null as search.ResultItem | null,
        userInfo: null as UserInfo | null,
  }),
    getters: {
        keywordFieldConstratint(): search.SolrQuery.FieldConstraint {
            return this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint;
        },
        keywords(): search.SolrQuery.ValueConstraint[] { return this.keywordFieldConstratint.valueConstraints },

        getTotalItems():number{
            return this.searchResult.count;
        },
        getFirstItem():number{
            return this.searchResult.first;
        },
        getLastSearchItem():number{
            return this.searchResult.last;
        }
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
            //console.log("ProfileStore.fetchData called")
            fetchQuery(
                this.templateId as Guid,
                this.collectionId as Guid,
                this.groupId as Guid,
                this.solrQueryModel,
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
                this.solrQueryModel,
                this.searchText as string,
                this.searchResult.last,
                this.pageSize,
                this.queryApiUrl as string,
                (result: search.SearchOutput) => {
                    this.searchResult = result;
                    this.searchResult.last = result.last

                }
            )
        },
        setActiveProfile(profileId: Guid) {
            this.activeProfile = this.searchResult.items.filter(item => item.id === profileId)[0];
            if (!this.activeProfile) {

                const apiUrl = this.queryApiUrl + '/' + profileId;
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data =>
                        this.activeProfile = data
                    );
            }
        },
        setKeywords(keywordValues: string[]) {
            this.keywordFieldConstratint.valueConstraints = [];
            keywordValues?.forEach(val => this.keywordFieldConstratint.valueConstraints.push({
                selected: false,
                value: val
            }))
        },
        selectKeyword(index: number) {
            if (!this.keywords[index].selected) {
                this.keywords[index].selected = true;
                this.fetchData();
            }
        },
    }
});
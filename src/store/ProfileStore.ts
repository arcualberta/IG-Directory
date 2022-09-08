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
        profileDeleteStatus: "",
  }),
    getters: {
        keywordFieldConstratint(): search.SolrQuery.FieldConstraint {
            return this.solrQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint;
        },
        keywords(): search.SolrQuery.ValueConstraint[] { return this.keywordFieldConstratint.valueConstraints },
        defaultQueryModelFieldConstratint(): search.SolrQuery.FieldConstraint {
            return this.defaultQueryModel.queryConstraints.find(qc => qc.internalId === "keywords") as search.SolrQuery.FieldConstraint;
        },
        isAdmin(): boolean {
            return this.userInfo?.roles?.includes("SysAdmin") ? true : false;
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
                (result: search.SearchOutput) => { this.searchResult = result; },
                this.isAdmin
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
                },
                this.isAdmin
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
        deleteProfile(profileId: Guid) {
            const api = `${config.dataServiceApiRoot}items/deleteItem/${profileId}`;
            console.log('Item Delete API: ', api)
            fetch(api,
                {
                    method: "post",
                    headers: {
                        //"Content-Type": "multipart/form-data"
                        "encType": "multipart/form-data"
                    }
                }).then(response => {
                    //response.json()
                    console.log(response.status)
                    switch (response.status) {
                        case 200:
                            window.location.href = "/";
                            //alert("TODO: change me to redirect to home page.");
                            break;
                        case 401:
                            this.profileDeleteStatus="Authorization failed."
                            break;
                        case 404:
                            this.profileDeleteStatus ="Item not found."
                            break;
                        case 500:
                            this.profileDeleteStatus ="Internal server error occurred."
                            break;
                        default:
                            this.profileDeleteStatus ="Unknown error occurred."
                            break;
                    }
                })
                //.then(data => {
                //    console.log(JSON.stringify(data));
                //    store.commit(FlattenedFormFiledMutations.REMOVE_FIELD_CONTAINERS);
                //    //store.commit(Mutations.SET_ITEM, data);

                //})
                .catch(error => {
                    console.log("error", error)
                });
            
        },
        changeState(profileId: Guid, buttonName: string) {
            const api = `${config.dataServiceApiRoot}items/changeState/${profileId}/${buttonName}`;
            console.log('Item Status Change API: ', api)
            fetch(api,
                {
                    method: "post",
                    headers: {
                        //"Content-Type": "multipart/form-data"
                        "encType": "multipart/form-data"
                    }
                }).then(response => {
                    //response.json()
                    console.log(response.status)
                    switch (response.status) {
                        case 200:
                            window.location.reload();
                            //alert("TODO: change me to redirect to home page.");
                            break;
                        case 401:
                            this.profileDeleteStatus = "Authorization failed."
                            break;
                        case 404:
                            this.profileDeleteStatus = "Item not found."
                            break;
                        case 500:
                            this.profileDeleteStatus = "Internal server error occurred."
                            break;
                        default:
                            this.profileDeleteStatus = "Unknown error occurred."
                            break;
                    }
                })
                //.then(data => {
                //    console.log(JSON.stringify(data));
                //    store.commit(FlattenedFormFiledMutations.REMOVE_FIELD_CONTAINERS);
                //    //store.commit(Mutations.SET_ITEM, data);

                //})
                .catch(error => {
                    console.log("error", error)
                });

        },
    }
});
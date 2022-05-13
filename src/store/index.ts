import { createStore } from 'vuex'
import { Guid } from 'guid-typescript'


import { common, search } from '@arcualberta/catfish-ui';
import { SearchResultFieldMapping } from '../appsettings'

export default createStore({
    modules: {
        common,
        search
    },
    state: {
        common: common.state,
        search: search.state
    },
    getters: {
        //getProfileName: (state) => (id: Guid) => {
        //    const solrFields = state.search.searchResult?.items?.find(item => item.id === id)?.solrFields;
        //    if (solrFields) {
        //        return solrFields[SearchResultFieldMapping.TITLE] as string[];
        //    }
        //    return fieldValues as unknown as string
        //},
        getProfileUserName() {
            return SearchResultFieldMapping.TITLE
        },
        getTitle: () => (item: any) => item?.solrFields[SearchResultFieldMapping.TITLE],
        getPosition: () => (item: any) => item?.solrFields[SearchResultFieldMapping.POSITION],

    },
    mutations: {
    },
    actions: {
    },
})


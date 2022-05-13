import { createStore } from 'vuex'

import { common, search } from '@arcualberta/catfish-ui';
import { SearchResultFieldMapping } from '../appsettings'

export default createStore({
    modules: {
        common,
        search
    },
    state: {
    },
    getters: {
        getTitle: () => (item: any) => item?.solrFields[SearchResultFieldMapping.TITLE],
        getPosition: () => (item: any) => item?.solrFields[SearchResultFieldMapping.POSITION],
    },
    mutations: {
    },
    actions: {
    },
})


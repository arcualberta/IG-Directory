import { createStore } from 'vuex'

import { searchModule } from '@arcualberta/catfish-ui';

export default createStore({
    state: {
        ...searchModule.state
    },
    getters: {
    },
    mutations: {
        ...searchModule.mutatios
    },
    actions: {
        ...searchModule.actions
    },
    modules: {
        searchModule
    }
})

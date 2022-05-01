import { createStore } from 'vuex'

import { Search } from '@arcualberta/catfish-ui';

export default createStore({
    state: {
        ...Search.State.state
    },
    getters: {
    },
    mutations: {
        ...Search.Mutations.mutations
    },
    actions: {
        ...Search.Actions.actions
    },
    modules: {
    }
})

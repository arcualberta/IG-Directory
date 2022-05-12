import { createStore} from 'vuex'
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
        getProfileUserName() {
            return SearchResultFieldMapping.TITLE
        }
    },
    mutations: {
    },
    actions: {
    },
})


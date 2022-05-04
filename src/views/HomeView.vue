<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <FreeTextSearch />
        <h3>Keyword Query Model</h3>
        {{JSON.stringify(keywordQueryModel)}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import config from '../appsettings';
    import { common, search, FreeTextSearch } from '@arcualberta/catfish-ui';

    export default defineComponent({
        name: 'HomeView',
        modules: {
            common,
            search
        },
        components: {
            FreeTextSearch
        },
        setup() {
            const store = useStore();

            //console.log('config.pageId: ', config.pageId)
            //store.commit('SET_PAGE_ID', config.pageId)
            //store.commit('SET_BLOCK_ID', config.blockId)
            //store.commit('SET_DATA_SERVICE_API_ROOT', config.dataServiceApiRoot)
            //store.commit('SET_PAGE_SERVICE_API_ROOT', config.pageServiceApiRoot)
            //store.commit('SET_SOLR_SERVICE_API_ROOT', config.solrServiceApiRoot)

            store.commit(common.Mutations.SET_PAGE_ID, config.pageId)
            store.commit(common.Mutations.SET_BLOCK_ID, config.blockId)
            store.commit(common.Mutations.SET_DATA_SERVICE_API_ROOT, config.dataServiceApiRoot)
            store.commit(common.Mutations.SET_PAGE_SERVICE_API_ROOT, config.pageServiceApiRoot)
            store.commit(common.Mutations.SET_SOLR_SERVICE_API_ROOT, config.solrServiceApiRoot)
            store.dispatch(search.Actions.INIT_FILTER)
            //onMounted(() => {
            //})
            return {
                keywordQueryModel: computed(() => store.state.keywordQueryModel),
                store
            }
        }
    });
</script>

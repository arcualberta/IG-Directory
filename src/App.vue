<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
    <router-view />
</template>

<script lang="ts">
    import { Guid } from 'guid-typescript'
    import { defineComponent, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { props, search } from '@arcualberta/catfish-ui';
    import config from './appsettings';

    export default defineComponent({
        name: 'App',
        modules: {
            search
        },
        props,
        setup() {
            const pageId = config.pageId as unknown as Guid;
            const blockId = config.blockId as unknown as Guid;
            const dataServiceApiRoot = config.dataServiceApiRoot;
            const pageServiceApiRoot = config.pageServiceApiRoot;
            const solrServiceApiRoot = config.solrServiceApiRoot;

            const store = useStore();

            onMounted(() => {
                if (pageId && blockId) {
                //    store.commit(Search.Mutations.SET_SOURCE, { pageId: pageId, blockId: blockId });
                //    store.commit(Mutations.SET_DATA_SERVICE_API_ROOT, dataServiceApiRoot);
                //    store.commit(Mutations.SET_PAGE_SERVICE_API_ROOT, pageServiceApiRoot);
                //    store.commit(Mutations.SET_SOLR_SERVICE_API_ROOT, solrServiceApiRoot);
                //    store.dispatch(Actions.INIT_FILTER);
                }
            })
        },
    });
</script>


<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

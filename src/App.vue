<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
    <router-view />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from 'vuex';

    import { props/*, common*/ } from '@arcualberta/catfish-ui';
    //import config from './appsettings';

    export default defineComponent({
        name: 'App',
        modules: {
        //    common
        },
        props,
        setup() {
            const store = useStore();

        //    store.commit(common.Mutations.SET_PAGE_ID, config.pageId)
        //    store.commit(common.Mutations.SET_BLOCK_ID, config.blockId)
        //    store.commit(common.Mutations.SET_DATA_SERVICE_API_ROOT, config.dataServiceApiRoot)
        //    store.commit(common.Mutations.SET_PAGE_SERVICE_API_ROOT, config.pageServiceApiRoot)
        //    store.commit(common.Mutations.SET_SOLR_SERVICE_API_ROOT, config.solrServiceApiRoot)

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

<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <FreeTextSearch />
        {{JSON.stringify(keywordQueryModel)}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import common from '@arcualberta/catfish-ui';
    import search from '@arcualberta/catfish-ui';
    import { props } from '@arcualberta/catfish-ui';
    import { FreeTextSearch } from '@arcualberta/catfish-ui/'

    import config from '../appsettings'

    export default defineComponent({
        name: 'HomeView',
        modules: {
            common,
            search
        },
        props,
        components: {
            FreeTextSearch
        },
        setup() {
            const store = useStore();

            //store.commit(common.Mutations.SET_DATA_SERVICE_API_ROOT, config.dataServiceApiRoot)
            store.commit('SET_DATA_SERVICE_API_ROOT', config.dataServiceApiRoot)


            return {
                keywordQueryModel: computed(() => store.state.keywordQueryModel)
            }
        }
    });
</script>

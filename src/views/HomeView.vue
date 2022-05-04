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

    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';

    export default defineComponent({
        name: 'HomeView',
        modules: {
            search
        },
        components: {
            FreeTextSearch
        },
        setup() {
            const store = useStore();

            store.dispatch(search.Actions.INIT_FILTER)

            return {
                keywordQueryModel: computed(() => store.state.keywordQueryModel),
            }
        }
    });
</script>

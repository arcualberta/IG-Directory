<template>
    <div class="Explore">
        <h1>This is an explore page</h1>

        <h2>Search</h2>
        <FreeTextSearch />

        <!--<h3>Explore View State</h3>
        {{JSON.stringify(state)}}-->

        <h3>Search Results</h3>
        {{JSON.stringify(searchResults)}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';

    export default defineComponent({
        name: 'ExploreView',
        modules: {
            search
        },
        components: {
            FreeTextSearch
        },
        setup() {
            const store = useStore();

            onMounted(() => store.dispatch(search.Actions.FRESH_SEARCH))

            return {
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                searchResults: computed(() => store.state.search.searchResult),
            }
        }
    });
</script>
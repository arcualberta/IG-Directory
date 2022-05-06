<template>
    <div class="home-body">
        <h1 class="title">Explore our<br />Researcher Directory.</h1>
        <p class="explore-text">
            Search the Intersections of Gender Researcher Directory using the search bar, or scroll through our interactive keyword below.
        </p>
        <div class="searchbar-rectangle">
            <FreeTextSearch />
        </div>

        <h3>Keyword Query Model</h3>
        {{JSON.stringify(keywordQueryModel)}}

        <h3>Home View State</h3>
        {{JSON.stringify(state)}}

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
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
            }
        }
    });
</script>

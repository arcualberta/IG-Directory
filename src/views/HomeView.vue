<template>
    <div class="home-body">
        <h1 class="title">Explore our<br />Researcher Directory.</h1>
        <p class="explore-text">
            Search the Intersections of Gender Researcher Directory using the search bar, or scroll through our interactive keyword below.
        </p>
        <div class="searchbar-rectangle">
            <FreeTextSearch />
        </div>
        <KeywordList :model="keywordQueryModel" :hexColorList="colorList" />

        <h3>Keyword Query Model</h3>
        {{JSON.stringify(keywordQueryModel)}} <br />
        Result count: {{searchStore.resultCount}} of {{searchStore.searchResult.count}}


        <h3>Search Store</h3>
        {{JSON.stringify(searchStore)}}

        <h3>Profile Store</h3>
        {{JSON.stringify(profileStore)}}

    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { useSearchStore, useProfileStore } from '../store'


    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';
    import KeywordList from "../components/KeywordList.vue"
    import config from '../appsettings';

    export default defineComponent({
        name: 'HomeView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
            KeywordList
        },
        setup() {
            const searchStore = useSearchStore();
            const profileStore = useProfileStore();

            const store = useStore();

            store.dispatch(search.Actions.INIT_FILTER)
           
            return {
                searchStore,
                profileStore,
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                colorList: computed(()=>config.hexColorList)
            }
        }
    });
</script>

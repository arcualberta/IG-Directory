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

    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';

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
           
            return {
                searchStore,
                profileStore,
                keywordQueryModel: computed(() => searchStore.keywordQueryModel),
                colorList: computed(()=>config.hexColorList)
            }
        }
    });
</script>

<template>
    <div class="home-body">
        <h1 class="title">Explore our<br />Researcher Directory.</h1>
        <p class="explore-text">
            Search the Intersections of Gender Researcher Directory using the search bar, or scroll through our interactive keyword below.
        </p>
        <KeywordList :action-link="'explore'" :model="searchStore.keywords" :hexColorList="colorList" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';

    import { useSearchStore } from '../store'

    import { search } from '@arcualberta/catfish-ui';
    import KeywordList from "../components/KeywordList.vue"
    import config from '../appsettings';

    export default defineComponent({
        name: 'HomeView',
        modules: {
            search
        },
        components: {
            KeywordList
        },
        setup() {
            const searchStore = useSearchStore();
           
            return {
                searchStore,
                //keywordQueryModel: computed(() => searchStore.keywordQueryModel),
                colorList: computed(()=>config.hexColorList)
            }
        }
    });
</script>

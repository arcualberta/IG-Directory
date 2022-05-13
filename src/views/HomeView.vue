<template>
    <div class="home-body">
        <h1 class="title">Explore our<br />Researcher Directory.</h1>
        <p class="explore-text">
            Search the Intersections of Gender Researcher Directory using the search bar, or scroll through our interactive keyword below.
        </p>
        <div class="searchbar-rectangle">
            <FreeTextSearch />
        </div>
        <KeywordList   :hexColorList="colorList"  />

        <!-- <KeywordList   :hexColorList="colorList" :listOfKeywords="['keyword1', 'keyword2', 'keyword4', 'keyword5']" />
         -->
         
        <h3>Keyword Query Model</h3>
        {{JSON.stringify(keywordQueryModel)}}

    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

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
            const store = useStore();

            store.dispatch(search.Actions.INIT_FILTER)
            const colorList = config.hexColorList;
            return {
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                colorList
            }
        }
    });
</script>

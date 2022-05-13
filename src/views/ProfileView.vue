<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import KeywordList from "../components/KeywordList.vue"
    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';
    import config from '../appsettings';

    export default defineComponent({
        name: 'ProfileView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
            KeywordList
        },
        setup() {
            const store = useStore();
             store.dispatch(search.Actions.INIT_FILTER);
            onMounted(() => store.dispatch(search.Actions.FRESH_SEARCH))

            return {
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                searchResults: computed(() => store.state.search.searchResult),
                 colorList:computed(()=>config.hexColorList)
            }
        }
    });
</script>
<template>
    
    <div class="Profile">
        <div class="background-grey-researcher">
            <div class="results">
                <img class="results-image" />
                <p class="info-1">
                    <u>Dia Da Costa (she/her)</u>
                    <br>Professor
                    <br>Faculty of Education
                    <br>ddacosta@ualberta.ca
                </p>
                <p>
                    Self-identification
                    <br>
                    Disability: -
                </p>
            </div>
        </div>
        <div class="right-content-researcher">
            <FreeTextSearch />
             <KeywordList :model="keywordQueryModel" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
        <div class="explore-related">

        </div>

    </div>
</template>

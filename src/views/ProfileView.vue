<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useRoute } from 'vue-router'

    import KeywordList from "../components/KeywordList.vue"
    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';
    import config from '../appsettings';
    import { useSearchStore } from '../store'

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

            const searchStore = useSearchStore();
            const keywordQueryModel = computed(() => searchStore.keywordQueryModel);

            const route = useRoute();
            const id = route.params.id;

            return {
                id,
                keywordQueryModel,
                colorList: computed(() => config.hexColorList)
            }
        }
    });
</script>
<template>
    
    <div class="Profile">
        Profile ID: {{id}}
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

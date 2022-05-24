<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useRoute } from 'vue-router'
    import { Guid } from 'guid-typescript';

    import KeywordList from "../components/KeywordList.vue"
    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';
    import config from '../appsettings';
    import { useSearchStore } from '../store'
    import * as itemHelper from '../helpers/itemHelper';

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
            const id = route.params.id as unknown as Guid;
            searchStore.setActiveProfile(id);
            const profile = computed(() => searchStore.activeProfile as search.ResultItem);

            return {
                searchStore,
                profile,
                name: computed(() => itemHelper.getName(profile.value)),
                position: computed(() => itemHelper.getPosition(profile.value)),
                keywords: computed(() => itemHelper.getKeywords(profile.value)),
                keywordQueryModel,
                colorList: computed(() => config.hexColorList)
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
                    <u>{{name}}</u>
                    <br>{{position}}
                    <br>xxxx
                    <br>xxxx
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

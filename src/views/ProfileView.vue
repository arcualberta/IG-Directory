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
                organization: computed(() => itemHelper.getOrganization(profile.value)),
                email: computed(() => itemHelper.getEmail(profile.value)),
                disability: computed(() => itemHelper.getDisability(profile.value)),
                personOfColor: computed(() => itemHelper.getPersonOfColor(profile.value)),
                genderIdentity: computed(() => itemHelper.getGenderIdentity(profile.value)),
                researchQuestion: computed(() => itemHelper.getResearchQuestion(profile.value)),
                additionalKeywords: computed(() => itemHelper.getAdditionalKeywords(profile.value)),
                communityProjects: computed(() => itemHelper.getCommunityProjects(profile.value)),
                externalLinks: computed(() => itemHelper.getLinks(profile.value)),
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
                    <u>{{name}} ({{genderIdentity}})</u>
                    <br>{{position}}
                    <br>{{organization}}
                    <br>{{email}}
                </p>
                <p class="info-2">
                    Self-identification
                    <br>Disability: <span>{{disability}}</span>
                    <br>Race: {{personOfColor}}
                    <br>Gender: 
                </p>
            </div>
            <div class="results-content">
                <p>
                    <u>Research question:</u> {{researchQuestion}}
                </p>
                <br>
                <p>
                    <u>Research keywords:</u> {{additionalKeywords}}
                </p>
                <br>
                <p>
                    <u>Community Projects:</u> {{communityProjects}}
                </p>
                <br>
                <p>
                    <u>Links:</u> {{externalLinks}}
                </p>
            </div>
            <div>
                <button class="contact">Contact me!</button>
            </div>
        </div>
        <div class="right-content-researcher">
            <div>
                <button class="back-to-search">Back to search results</button>
            </div>
            <br>
            <FreeTextSearch />
            <KeywordList :model="keywordQueryModel" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
        <div class="explore-related">

        </div>

    </div>
</template>

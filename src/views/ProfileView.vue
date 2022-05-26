<script lang="ts">
    import { defineComponent, computed, watch, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { Guid } from 'guid-typescript';

    import KeywordList from "../components/KeywordList.vue"
    import { search } from '@arcualberta/catfish-ui';
    import { default as config, SearchResultFieldMapping } from '../appsettings';
    import { useProfileStore } from '../store'
    import * as itemHelper from '../helpers/itemHelper';

    export default defineComponent({
        name: 'ProfileView',
        modules: {
            search
        },
        components: {
            KeywordList
        },
        setup() {

            const profileStore = useProfileStore();

            const route = useRoute();
            const id = route.params.id as unknown as Guid;
            profileStore.setActiveProfile(id);
            const profile = computed(() => profileStore.activeProfile as search.ResultItem);

            watch(() => profile, (oldValue, newValue) => {
                const keywordValues = itemHelper.getStringArrayValue(newValue.value, SearchResultFieldMapping.SIMILARITY_SOURCE);
                profileStore.setKeywords(keywordValues);
            },{ deep: true });

            return {
                profileStore,
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
            <KeywordList :model="profileStore.keywords" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
        <div class="explore-related">
            {{JSON.stringify(profile)}}
        </div>

    </div>
</template>

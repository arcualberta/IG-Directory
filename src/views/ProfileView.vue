<script lang="ts">
    import { defineComponent, computed, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { Guid } from 'guid-typescript';

    import KeywordList from "../components/KeywordList.vue"
    import ExploreRelatedResearchers from "../components/ExploreRelatedResearchers.vue"
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
            KeywordList,
            ExploreRelatedResearchers
        },
        setup() {

            const profileStore = useProfileStore();

            const route = useRoute();
            const router = useRouter();

            const id = route.params.id as unknown as Guid;
            profileStore.setActiveProfile(id);
            const profile = computed(() => profileStore.activeProfile as search.ResultItem);

            const loadKeywords = (profileEntry: search.ResultItem) => {
                const keywordValues = itemHelper.getStringArrayValue(profileEntry, SearchResultFieldMapping.SIMILARITY_SOURCE);
                profileStore.setKeywords(keywordValues);
                profileStore.fetchData();
            }

            watch(() => route.params.id, async newId => {
                profileStore.setActiveProfile(newId as unknown as Guid)
                })
            
            watch(() => profile, (oldValue, newValue) => { loadKeywords(newValue.value) }, { deep: true });
            onMounted(() => { loadKeywords(profile.value) });

            const formatLinks = (content: string): string => {
                const segments = content.split(' ').map(seg =>
                    (seg.startsWith('http://') || seg.startsWith('https://'))
                        ? `<a href='${seg}'>${seg}</a>`
                        : seg)
                return segments.join(' ')
            }

            return {
                id,
                router,
                profileStore,
                profile,
                itemHelper,
                searchResults: computed(() => profileStore.searchResult),
                name: computed(() => itemHelper.getName(profile.value)),
                position: computed(() => itemHelper.getPosition(profile.value)),
                showPosition: computed(() => itemHelper.getShowPosition(profile.value)),
                keywords: computed(() => itemHelper.getKeywords(profile.value)),
                organization: computed(() => itemHelper.getOrganization(profile.value)),
                email: computed(() => itemHelper.getEmail(profile.value)),
                showDisability: computed(() => itemHelper.getShowDisability(profile.value)),
                disability: computed(() => itemHelper.getDisability(profile.value)),
                showRace: computed(() => itemHelper.getShowRace(profile.value)),
                personOfColor: computed(() => itemHelper.getPersonOfColor(profile.value)),
                genderIdentity: computed(() => itemHelper.getGenderIdentity(profile.value)),
                showGenderIdentity: computed(() => itemHelper.getShowGenderIdentity(profile.value)),
                researchQuestion: computed(() => itemHelper.getResearchQuestion(profile.value)),
                //additionalKeywords: computed(() => itemHelper.getAdditionalKeywords(profile.value)),
                communityProjects: computed(() => itemHelper.getCommunityProjects(profile.value)),
                externalLinks: computed(() => itemHelper.getLinks(profile.value)),
                showExternalLinks: computed(() => itemHelper.getShowLinks(profile.value)),
                showPronouns: computed(() => itemHelper.getShowPronouns(profile.value)),
                pronouns: computed(() => itemHelper.getPronouns(profile.value)),
                collaborators: computed(() => itemHelper.getCollaborators(profile.value)),
                consent: computed(() => itemHelper.getConsent(profile.value)),
                gotoProfile: (id: string) => router.push({ path: "/profile/" + id }),
                goToExplore: () => router.push({ path: "/explore/" }),
                colorList: computed(() => config.hexColorList),
                formatLinks,
            }
        }
    });
</script>
<template>
    
    <div class="Profile">
        <div class="background-grey-researcher">
            <div v-if="consent.toLowerCase()==='yes'">
                <div class="results">
                    <img class="results-image" src="../assets/user-profile-icon.jpg" />
                    <p class="info-1">
                        <u>{{name}}<span v-if="showPronouns === 'Yes'"> <span v-if="pronouns">({{pronouns}})</span></span></u>
                        <br><!--<span v-if="ShowPosition==='Yes'">-->{{position}}<!--</span>-->
                        <br>{{organization}}
                        <br>{{email}}
                    </p>
                    <p class="info-2">
                        Self-identification
                        <br><span v-if="showDisability==='Yes'">Disability:  <span v-if="disability">{{disability}}</span><span v-else> -</span></span>
                        <br><span v-if="showRace==='Yes'">Race: <span v-if="personOfColor">{{personOfColor}}</span><span v-else> -</span></span>
                        <br><span v-if="showGenderIdentity==='Yes'">Gender: <span v-if="genderIdentity">{{genderIdentity}}</span><span v-else> -</span></span>
                    </p>
                </div>
                <div class="results-content">
                    <p>
                        <u>Research question:</u> <span v-if="researchQuestion">{{researchQuestion}}</span><span v-else> -</span>
                    </p>
                    <br>
                    <p>
                        <u>Research keywords:</u> <span v-if="keywords?.length>0">{{keywords.join(", ")}}</span><span v-else> -</span>
                    </p>
                    <br>
                    <p>
                        <u>Community Projects:</u> <span v-if="communityProjects">{{communityProjects}}</span><span v-else> -</span>
                    </p>
                    <br>
                    <p>
                        <!--<span v-if="showExternalLinks==='Yes'">-->
                            <u>Links: </u>
                            <span style="margin-right: 5px;" v-for="(link,idx) in externalLinks" v-html="formatLinks(link)" :key="idx"></span>
                        <!--</span>-->
                    </p>
                    <br>
                    <p>
                        <u>Collaborators:</u> <span v-if="collaborators">{{collaborators}}</span><span v-else> -</span>
                    </p>
                </div>
                <div>
                    <!--<a class="contact" href="mailto:{{email}}">Contact me!</a>-->
                    <div class="contact" onclick="location.href ='mailto:{{email}}';">Contact me!</div>
                </div>
            </div>
            <div v-else >
                <div class="results">
                    <img class="results-image" src="../assets/user-profile-icon.jpg" />
                    <p class="info-1">
                    <u>{{name}}<span v-if="showPronouns === 'Yes'" /> </u>
                    </p>
                </div>
                <div class="alert-panel panel-red">
                    This directory entry is not publicly visible
                </div>
                
            </div>

        </div>
        <div class="right-content-researcher">
            <div>
                <button class="back-to-search" @click="goToExplore()">Back to search results</button>
            </div>
            <br>
            <KeywordList :model="profileStore.keywords" :custom-store="profileStore" :toggle="true" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
        <div class="explore-related">
            <div class="related-title">Explore related researchers </div>
            <div class="related-scroll">
                    <ExploreRelatedResearchers v-for="item in searchResults.items" :key="item" :model="item" />
            </div>
            
            <!--{{JSON.stringify(searchResults.items)}}-->
        </div>

    </div>
</template>

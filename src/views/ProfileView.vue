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
        methods: {
            goToExplore() {
                this.$router.push('/explore');
            },
            gotoProfile(id: Guid) {
                this.$router.push('/profile/' + id)
            }
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
                profileStore.fetchData();
            },{ deep: true });

            return {
                profileStore,
                profile,
                itemHelper,
                searchResults: computed(() => profileStore.searchResult),
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
                pronouns: computed(() => itemHelper.getPronouns(profile.value)),
                collaborators: computed(() => itemHelper.getCollaborators(profile.value)),
                colorList: computed(() => config.hexColorList)
                
            }
        }
    });
</script>
<template>
    
    <div class="Profile">
        <div class="background-grey-researcher">
            <div class="results">
                <img class="results-image" src="../assets/user-profile-icon.jpg"/>
                <p class="info-1">
                    <u>{{name}} <span v-if="pronouns">({{pronouns}})</span></u>
                    <br>{{position}}
                    <br>{{organization}}
                    <br>{{email}}
                </p>
                <p class="info-2">
                    Self-identification
                    <br>Disability: <span v-if="disability">{{disability}}</span><span v-else> -</span>
                    <br>Race: <span v-if="personOfColor">{{personOfColor}}</span><span v-else> -</span>
                    <br>Gender: <span v-if="genderIdentity">{{genderIdentity}}</span><span v-else> -</span>
                </p>
            </div>
            <div class="results-content">
                <p>
                    <u>Research question:</u> <span v-if="researchQuestion">{{researchQuestion}}</span><span v-else> -</span>
                </p>
                <br>
                <p>
                    <u>Research keywords:</u> <span v-if="additionalKeywords">{{additionalKeywords}}</span><span v-else> -</span>
                </p>
                <br>
                <p>
                    <u>Community Projects:</u> <span v-if="communityProjects">{{communityProjects}}</span><span v-else> -</span>
                </p>
                <br>
                <p>
                    <u>Links:</u> <span v-if="externalLinks">{{externalLinks}}</span><span v-else> -</span>
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
        <div class="right-content-researcher">
            <div>
                <button class="back-to-search" @click="goToExplore()">Back to search results</button>
                
            </div>
            <br>
            <KeywordList :model="profileStore.keywords" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
        <div class="explore-related">
            <div class="related-title">Explore related researchers </div>
            <div class="related-scroll">
                <div v-for="item in searchResults.items" :key="item" class="related">
                    <img class="related-image" src="../assets/user-profile-icon.jpg"/>
                    <div class="related-results">
                        <a @click="gotoProfile(item.id)">{{itemHelper.getName(item)}}</a> <span v-if=itemHelper.getPronouns(item)>({{itemHelper.getPronouns(item)}})</span>
                        <br />
                        <span v-if=itemHelper.getPosition(item)>{{itemHelper.getPosition(item)}}</span>
                        <br />
                        <span v-if=itemHelper.getOrganization(item)>{{itemHelper.getOrganization(item)}}</span>
                        <br />
                        <span v-if=itemHelper.getEmail(item)>{{itemHelper.getEmail(item)}}</span>
                    </div>
                </div>
            </div>
            
            <!--{{JSON.stringify(searchResults.items)}}-->
        </div>

    </div>
</template>

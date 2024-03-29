<template>
    <button class="question-button" type="button" ><img class="question-icon" @click="TogglePopup()" src="../assets/icon-awesome-question-circle@1x.png" /></button>
    <PopupContainer v-if="questionPopupTrigger" :TogglePopup="() => TogglePopup()">
        <div v-html="questionPopupContent"></div>

    </PopupContainer>
    <div class="left-content">
        <button class="reset-text" @click="clearFilter(); searchStore.clearKeywordSelection()">RESET</button>
        <div class="filter-results-text">Filter results by:</div>
        <div class="dropdown">
            <button class="filter-dropdown">Position</button>
            <FilterPanel :options="positionOptions" />
        </div>
        <div class="dropdown">
            <button class="filter-dropdown">Faculty</button>
            <FilterPanel :options="facultyOptions" />
        </div>
        <div class="dropdown">
            <button class="filter-dropdown">Self Identification</button>
            <FilterPanel :option-groups="[disability, genderIdentity, ethnicity]" :option-group-names="['Disability', 'Gender identity', 'Ethnicity']" class="wide-panel" />
        </div>
        <br />
        <div class="filters">
            <div v-for="(keyword, index) in selectedKeywords" :key="keyword">
                <span class="filter1-text">{{keyword.value}}</span>
                <span class="xremove" @click="searchStore.unselectKeyword(index)">X</span>
            </div>
        </div>

        <div class="background-grey">
            <span v-if="searchResults.count>0">
                <ProfileListEntry v-for="item in searchResults?.items" :key="item.id" :model="item" />
            </span >
            <span v-else>
                <NoDataFound />
            </span>
            <div style="text-align:center; margin:10px;">
                {{searchResults.first}} to {{searchResults.last}} of {{searchResults.count}}
                <a  v-if="searchResults?.last < searchResults?.count" href="#" @click="searchStore.fetchNextPage()">load more ...</a>
            </div>

        </div>
        
        <div class="right-content">
            <KeywordList :model="searchStore.keywords" :hexColorList="colorList" :className="'keywordContainerSmall'" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted, ref } from 'vue';
    import { useSearchStore } from '../store'

    import KeywordList from "../components/KeywordList.vue"
    import ProfileListEntry from '../components/ProfileListEntry.vue'
    import NoDataFound from '../components/NoDataFound.vue'
    import FilterPanel from '../components/FilterPanel.vue'
    import PopupContainer from '../components/PopupContainer.vue'
    import config from '../appsettings';
  
    import { search } from '@arcualberta/catfish-ui';


    export default defineComponent({
        name: 'ExploreView',
        modules: {
            search
        },
        components: {
            KeywordList,
            ProfileListEntry,
            NoDataFound,
            FilterPanel,
            PopupContainer
        },
        setup() {
            const searchStore = useSearchStore();
            const questionPopupTrigger = ref(false);
            const searchResults = computed(() => searchStore.searchResult)

            onMounted(() => {
                //console.log("ExploreView.onMounted")
                if (searchResults.value?.items?.length === 0)
                    searchStore.fetchData();
            })


            var posOptions: search.SolrQuery.ValueConstraint[] = (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "positions") as search.SolrQuery.FieldConstraint).valueConstraints;
            var facOptions: search.SolrQuery.ValueConstraint[] = (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "faculties") as search.SolrQuery.FieldConstraint).valueConstraints;
            var disabilityOptions = (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:disability") as search.SolrQuery.FieldConstraint).valueConstraints;
            var giOptions = (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:genderIdentity") as search.SolrQuery.FieldConstraint).valueConstraints;
            var ethnicityOptions= (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:ethnicity") as search.SolrQuery.FieldConstraint).valueConstraints;

            const clearFilter= () => {

                
             //   console.log("before reset" + JSON.stringify(posOptions));

                posOptions.forEach(op => op.selected = false);
                facOptions.forEach(op => op.selected = false);
                disabilityOptions.forEach(op => op.selected = false);
                giOptions.forEach(op => op.selected = false);
                ethnicityOptions.forEach(op => op.selected = false);

              //  console.log("after reset" + JSON.stringify(posOptions));

                //update interface
                const chkBoxes = Array.from(document.getElementsByTagName("input"));
                chkBoxes.forEach(chk => {
                    if (chk.type === 'checkbox')
                        chk.checked = false
                 })
               
            }

           const positionOptions = computed(() => posOptions);
            const facultyOptions = computed(() => facOptions);
            const disability = computed(() => disabilityOptions);
            const genderIdentity = computed(() => giOptions);
            const ethnicity = computed(() => ethnicityOptions);
            return {
                searchStore,
                searchResults,
                PopupContainer,
                NoDataFound,
                questionPopupTrigger,
                TogglePopup: () => (questionPopupTrigger.value = !questionPopupTrigger.value),
                selectedKeywords: computed(() => searchStore.selectedKeywords),
                positionOptions, //: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "positions") as search.SolrQuery.FieldConstraint).valueConstraints),
                facultyOptions,//: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "faculties") as search.SolrQuery.FieldConstraint).valueConstraints),
                disability,//: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:disability") as search.SolrQuery.FieldConstraint).valueConstraints),
                genderIdentity,//: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:genderIdentity") as search.SolrQuery.FieldConstraint).valueConstraints),
                ethnicity,//: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "selfIdentification:ethnicity") as search.SolrQuery.FieldConstraint).valueConstraints),
                colorList: computed(() => config.hexColorList),
                questionPopupContent: computed(() => config.questionPopupContent),
                clearFilter
            }
        }
    });
</script>

<style scoped>
    #app{
        background-color:#fff !important;
    }
    .explore{
        width: 100%;
    }
    .items{
        width: 50%;
        float: left;
    }
    .searchSection{
        width:30%;
        float: left;
        margin-top:20px;
    }
    .selectedKeywords{
       width: 15%;
       float: left;
        margin-top: 50px;
        padding:5px;
    }

    .grey-BG {
        background-color: #ececec;
        border-radius: 30px;
        height: 500px;
        position: relative;
        width: 500px;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
        display: inline-block;
        overflow-y: scroll;
    }

    .fa-times {
        margin-left: 5px;
        font-size: medium;
    }
     .content{
         max-height: 105px;
         overflow: auto;
     }
    .selectedKeyword {
        background-color: #ffdc0e;
        border-radius: 50px;
        position: relative;
        margin: 5px;
        padding: 5px;
        overflow-wrap: break-word;
        display: inline-block;
        font-size: medium;
    }

    .xremove{
        font-size:smaller;
        cursor: pointer;
    }
    .xremove:hover{
        color: red;
    }

    .contentList::-webkit-scrollbar {
        width: 7px;
        height: 5px;
        overflow-y: scroll;
        background-color: transparent;
    }

    .contentList::-webkit-scrollbar-track {
        background-color: transparent;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.02);
    }

    .contentList::-webkit-scrollbar-thumb {
        background-color: grey;
        border-radius: 10px;
        /* border: 1px solid Green;*/
    }

    .contentList::-webkit-scrollbar-track-piece:end {
        margin-bottom: 75px;
    }

    .contentList::-webkit-scrollbar-track-piece:start {
        margin-top: 175px;
    }
</style>

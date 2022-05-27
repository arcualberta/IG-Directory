<template>
     <div class="explore">
        <div class="items">
            <div class="selectedKeywords">
                <b>Selected Keywords</b>
               
                <div v-for="(keyword, index) in selectedKeywords" :key="keyword" >
                    <span class="selectedKeyword">{{keyword.value}}</span> 
                    <span class="xremove" @click="searchStore.unselectKeyword(index)">X</span>
                </div>
               
            </div>

            <div class="background-grey">
                <ProfileListEntry v-for="item in searchResults?.items" :key="item.id" :model="item" />
            </div>
        </div>
        <div class="searchSection">
            <KeywordList :model="searchStore.keywords" :hexColorList="colorList" :className="'keywordContainerSmall'" />\
            <br />
            <h3>Positions</h3>
            <FilterPanel :model="positionOptions" />
            <h3>Faculties</h3>
            <FilterPanel :model="facultyOptions" />
        </div> 
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted, watch } from 'vue';
    import { useSearchStore } from '../store'

    import KeywordList from "../components/KeywordList.vue"
    import ProfileListEntry from '../components/ProfileListEntry.vue'
    import FilterPanel from '../components/FilterPanel.vue'
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
            FilterPanel
        },
        setup() {
            const searchStore = useSearchStore();

            const searchResults = computed(() => searchStore.searchResult)

            onMounted(() => {
                //console.log("ExploreView.onMounted")
                if (searchResults.value?.items?.length === 0)
                    searchStore.fetchData();
            })

            return {
                searchStore,
                searchResults,
                selectedKeywords: computed(() => searchStore.selectedKeywords),
                positionOptions: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "positions") as search.SolrQuery.FieldConstraint).valueConstraints),
                facultyOptions: computed(() => (searchStore.solrQueryModel.queryConstraints.find(qc => qc.internalId === "faculties") as search.SolrQuery.FieldConstraint).valueConstraints),
                colorList: computed(() => config.hexColorList),
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

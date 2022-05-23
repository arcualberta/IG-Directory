<template>
     <div class="explore">
        <div class="items">
            <div class="selectedKeywords">
                <b>Selected Keywords</b>
               
                <div v-for="keyword in selectedKeywords" :key="keyword.index.valueIndex" >
                   
                    <span class="selectedKeyword">{{keyword.value}}</span> 
                    <!--  <span class="xremove" @click="removeKeyword(keyword.index)">X</span> -->
                    <span class="xremove" @click="searchStore.removeKeyword(keyword.index)">X</span>
                </div>
               
            </div>

            <div class="grey-BG contentList">
                <ProfileListEntry v-for="item in searchResults?.items" :key="item.id" :model="item" />
            </div>
        </div>
        <div class="searchSection">
          <FreeTextSearch />
          <KeywordList :model="keywordQueryModel" runAction="addKeyword" :hexColorList="colorList" :className="'keywordContainerSmall'" />
      
        </div> 
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted, watch } from 'vue';
    import { useSearchStore } from '../store'

    import KeywordList from "../components/KeywordList.vue"
    import ProfileListEntry from '../components/ProfileListEntry.vue'
    import config from '../appsettings';
  
    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';


    export default defineComponent({
        name: 'ExploreView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
            KeywordList,
            ProfileListEntry
        },
        setup() {
            const searchStore = useSearchStore();

            const keywordQueryModel = computed(() => searchStore.keywordQueryModel);

            watch(() => keywordQueryModel.value, (newValue) => {
                //console.log(newValue, " watch value changed")
                if (newValue)
                    searchStore.fetchData();
            });

            onMounted(() => {
                //console.log("ExploreView.onMounted")
                if (searchStore.keywordQueryModel)
                    searchStore.fetchData();
            })

            return {
                searchStore,
                searchResults: computed(() => searchStore.searchResult),
                keywordQueryModel,
                selectedKeywords: computed(() => searchStore.selectedKeywords),
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
        width: 67%;
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

<template>
<!--
    <div class="Explore">
        <h1>This is an explore page</h1>

        <h2>Search</h2>
        <FreeTextSearch />

        <h3>Search Results</h3>
        <div v-for="item in searchResults?.items" :key="item.id">
            <div class="entry-title">{{item.title}}</div>
            {{JSON.stringify(item)}}
            <hr />
        </div>
    </div> 
-->
     <div class="explore">
         <div class="items">
             <div class="selectedKeywords">
                 <b>Selected Keywords</b>

                 <!--<div v-for="keyword in selectedKeywords" :key="keyword.index.containerIndex + '_' + keyword.index.valueIndex" >
            <span class="selectedKeyword">{{keyword.value}}</span>
            <span class="xremove" @click="removeKeyword(keyword.index)">X</span>
        </div>-->

             </div>

             <div class="grey-BG contentList">

                 <div v-for="item in searchResults?.items" :key="item.id">
                     <div class="item">
                         <div class="itemProfile">

                             <img class="profileImg" src="../assets/user-profile-icon.jpg" />

                             <div class="profileInfo">
                                 <span class="item-title">
                                     <a href="#">{{name(item)}}</a>
                                 </span>
                                 {{position(item)}}
                                 <div class="content">{{item.content}}</div>
                             </div>

                         </div>
                     </div>
                 </div>
             </div>
             {{JSON.stringify(searchStore)}}
         </div>
        <div class="searchSection">
          <FreeTextSearch />
          <KeywordList :model="keywordQueryModel" runAction="addKeyword" :hexColorList="colorList" :className="'keywordContainerSmall'" />
      
        </div> 
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';

    import { useSearchStore } from '../store'



    import { useStore } from 'vuex';
    import KeywordList from "../components/KeywordList.vue"
    import config from '../appsettings';
  
    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';
    //import { ResultItem } from '@arcualberta/catfish-ui/dist/types/src/lib-components/search';


    export default defineComponent({
        name: 'ExploreView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
            KeywordList
        },
        setup() {
            const searchStore = useSearchStore();

            searchStore.fetchData();

            ////const store = useStore();
            ////  store.dispatch(search.Actions.INIT_FILTER)
            ////onMounted(() => store.dispatch(search.Actions.FRESH_SEARCH))
            ////const keywordQueryModel= computed(() => store.state.search.keywordQueryModel);
            
            const isKeywordSelected = (containerIndex: number, fieldIndex: number, valueIndex: number) => {
                return searchStore.keywordQueryModel?.
                    containers[containerIndex]
                    .fields[fieldIndex]
                    .selected[valueIndex];
            };
             
               const selectedKeywords= computed(() => {
                   const ret = [] as search.Keyword[];
                   searchStore.keywordQueryModel?.containers.forEach((cont: { fields: any[]; }, cIdx:number) =>
                        cont.fields.forEach((field, fIdx: number) =>
                            field.values.forEach((val: any, vIdx: number) => {
                                if (isKeywordSelected(cIdx, fIdx, vIdx))
                                    ret.push({ index: { containerIndex: cIdx, fieldIndex: fIdx, valueIndex: vIdx }, value: val } as search.Keyword);
                            })
                        )
                    )
                    return ret;
                })

            return {
                searchStore,
                keywordQueryModel: computed(() => searchStore.keywordQueryModel),
                searchResults: computed(() => searchStore.searchResult),
                name: (item: search.ResultItem) => searchStore.getName(item),
                colorList:computed(()=>config.hexColorList),
            //    removeKeyword: (index: search.KeywordIndex) => {
            //        store.commit(search.Mutations.CLEAR_KEYWORD, index);
            //        store.dispatch(search.Actions.FRESH_SEARCH);
            //    },
                
            }
        }
    });
</script>

<style scoped>
    .item{
        padding: 15px;
    }
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
    
    .item_rofile{
        width: 80%;
    }
    .profileInfo {
        margin-left: 10px;
        display: inline-block;
       
        width:70%;
        float: right;
    }

    .profileImg {
        width: 120px;
        height: 120px;
        margin-left: 5px;
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

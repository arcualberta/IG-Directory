<template>
<h3>Search Results</h3>
<div> {{JSON.stringify(searchResults)}}</div>
  <!--  <div class="Explore">
        <h1>This is an explore page</h1>

        <h2>Search</h2>
        <FreeTextSearch />

        <h3>Search Results</h3>
        <div v-for="item in searchResults?.items" :key="item.id">
            <div class="entry-title">{{item.title}}</div>
            {{JSON.stringify(item)}}
            <hr />
        </div>
    </div> -->
     <div class="explore">
        <div class="items">
            <div class="selectedKeywords">
                <b>Selected Keywords</b>
                <!--
                <div v-for="keyword in selectedKeywords" :key="keyword.index.containerIndex + '_' + keyword.index.valueIndex" >
                    <span class="selectedKeyword">{{keyword.value}}</span> 
                    <i class="fa fa-remove" @click="removeKeyword(keyword.index)"></i>
                </div>
                -->
            </div>

            <div class="grey-BG contentList">
                
                <div v-for="item in searchResults?.items" :key="item.id">

                    <div class="item">
                        <div class="itemProfile">
                           
                            <img class="profileImg" src="../assets/user-profile-icon.jpg" />
                            
                             <div class="profileInfo">
                                <span class="item-title">
                                    <a href="#">{{item.title}}</a>
                                </span>
                                {{item.subtitle}}
                                <div class="content">{{item.content}}</div>
                            </div>
                           
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <div class="searchSection">
          <FreeTextSearch />
           
            <!--
            <KeywordPanel :hexColorList="hexColorList" :className="'keywordContainerSmall'" />
        -->
        </div> 
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';

    export default defineComponent({
        name: 'ExploreView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
        },
        setup() {
            const store = useStore();

            onMounted(() => store.dispatch(search.Actions.FRESH_SEARCH))

            return {
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                searchResults: computed(() => store.state.search.searchResult),
                
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
        width:15%;
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

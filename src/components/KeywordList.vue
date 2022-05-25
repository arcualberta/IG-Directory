<script lang="ts">
   // import { Guid } from 'guid-typescript'
    import { defineComponent, onMounted, computed, PropType, onUpdated} from "vue";
    import {useRouter} from 'vue-router'
    
    import { search} from '@arcualberta/catfish-ui';
    import { useSearchStore } from '../store'

    export default defineComponent({
        name: "KeywordList",
        modules: {
            search
        },
        props: {
            model:{
                //type: null as PropType<search.KeywordQueryModel> | null,
                type: null as PropType<search.SolrQuery.FieldConstraint> | null,
                required: true
            },
            hexColorList: {
                type: null as PropType<string> | null,
                required: false
            },
             actionLink: {
                type: null as PropType<string> | null,
                required: false,
                default: null
            },
            className: {
                type: null as PropType<string> | null,
                required: false,
                default: null
            }
        },
        setup(p) {
            const router = useRouter();
            const searchStore=useSearchStore();

            let hexColors = p.hexColorList ? p.hexColorList?.split(',').map(function (c) {
                return c.trim();
            }) : null;
            onMounted(()=>{ 
                const btns = Array.from(document.getElementsByClassName(`dir-keyword-button`)); 
                let length = hexColors ? hexColors.length : 0;
                let i = 0;
                btns.forEach((b) => {
                    if (hexColors !== null) {
                        let color = hexColors ? hexColors[i] : "";
                        b.setAttribute("style", "background-color: " + color);
                        i++
                        i = i <= length - 1 ? i : 0;

                    } else {

                        let color = "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)";
                        b.setAttribute("style", "background-color: " + color);
                    }

                });  
            })
            onUpdated(()=>{ 
                const btns = Array.from(document.getElementsByClassName(`dir-keyword-button`)); 
                let length = hexColors ? hexColors.length : 0;
                let i = 0;
                btns.forEach((b) => {
                    if (hexColors !== null) {
                        let color = hexColors ? hexColors[i] : "";
                        b.setAttribute("style", "background-color: " + color);
                        i++
                        i = i <= length - 1 ? i : 0;

                    } else {

                        let color = "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)";
                        b.setAttribute("style", "background-color: " + color);
                    }
                });  
            })

            return {
                router,
                searchStore,
                //filterByKeyword: (cIndex: number, fIndex: number, vIndex: number) => {
                //    searchStore.selectKeyword({ containerIndex: cIndex, fieldIndex: fIndex, valueIndex: vIndex } as search.KeywordIndex)

                //    console.log("Action Link: ", p.actionLink)
                //    if (p.actionLink)
                //        router.push("/" + p.actionLink);
                //},
                filterByKeyword: (index: number) => {
                    searchStore.selectKeyword(index)
                    console.log("Action Link: ", p.actionLink)
                    if (p.actionLink)
                        router.push("/" + p.actionLink);
                },

                keywordQueryModel: computed(() => searchStore.keywordQueryModel),
                keywords: computed(() => p.model),
            }
        },
    });
</script>

<template>
    <!--<div v-for="(container, cIdx) in keywordQueryModel?.containers" :key="container">
        <div v-for="(field, fIdx) in container.fields" :key="field"   :class="className? 'row ' + className : 'row keywordContainer'">
            <span v-for="(value, vIdx) in field.values" :key="value" class="dir-keyword">
                <button @click="filterByKeyword(cIdx, fIdx, vIdx)" class="dir-keyword-button" ref="dirBtn">{{ value }}</button>
            </span>
        </div>
    </div>-->
    <div class="input-group dir-text-search">
        <input type="text" class="form-control rounded" placeholder="searchText" aria-label="Search" aria-describedby="search-addon">
    </div>
    <div class="row keywordContainer">
        <span v-for="(keyword, index) in keywords" :key="keyword" class="dir-keyword">
            <button @click="filterByKeyword(index)" class="dir-keyword-button" ref="dirBtn">{{ keyword.value }}</button>
        </span>
    </div>

</template>

<style scoped>
    .keywordContainer {
        overflow-x: scroll;
        overflow-y: visible;
        white-space: nowrap;
        position: relative;
        display: inline-block;
        height: 120px;
        width: 100%;
        scroll-behavior: smooth;
        align-content: center;
    }

    .dir-keyword {
        display: inline-block;
        margin-top: 15px;
        margin-right: 5px;
    }

    .dir-keyword-button {
        position: relative;
        color: Black;
        font-size: 0.80em;
        text-align: center;
        border-radius: 60px;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 10px;
        padding-right: 10px;
        max-width: 150px;
        white-space: normal;
        border: none;
    }

        .dir-keyword-button:focus {
            background-color: yellow;
        }

        .dir-keyword-button:hover {
            transform: scale(1.2);
            z-index: 100;
            opacity: 90%;
            text-decoration: underline;
        }


    /* Works on Chrome, Edge, and Safari */
    .keywordContainer::-webkit-scrollbar, .keywordContainerSmall::-webkit-scrollbar {
        width: 12px;
        height: 5px;
        overflow-x: scroll;
        background-color: transparent;
    }

    .keywordContainer::-webkit-scrollbar-track, .keywordContainerSmall::-webkit-scrollbar-track {
        background-color: transparent;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.05);
    }

    .keywordContainer::-webkit-scrollbar-thumb, .keywordContainerSmall::-webkit-scrollbar-thumb {
        background-color: grey;
        border-radius: 10px;
        /* border: 1px solid Green;*/
    }

    .keywordContainer::-webkit-scrollbar-track-piece:end, .keywordContainerSmall::-webkit-scrollbar-track-piece:end {
        margin-right: 75px;
    }

    .keywordContainer::-webkit-scrollbar-track-piece:start, .keywordContainerSmall::-webkit-scrollbar-track-piece:start {
        margin-left: 175px;
    }

    /* smaller version*/
    .keywordContainerSmall {
        overflow-x: scroll;
        overflow-y: visible;
        white-space: nowrap;
        position: relative;
        display: inline-block;
        height: 75px;
        width: 100%;
        scroll-behavior: smooth;
        align-content: center;
    }
    .keywordContainerSmall > .dir-keyword {
            display: inline-block;
            margin-top: 15px;
            margin-right: 5px;
            font-size: medium;
        }

   .keywordContainerSmall > .dir-keyword > .dir-keyword-button {
                position: relative;
                color: Black;
                font-size: 0.80em;
                text-align: center;
                border-radius: 60px;
                padding-top: 15px;
                padding-bottom: 15px;
                padding-left: 10px;
                padding-right: 10px;
                max-width: 150px;
                white-space: normal;
            }
</style>
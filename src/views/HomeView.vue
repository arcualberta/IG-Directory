<template>
    <button class="info-rectangle" @click="TogglePopup()">Info</button>
    <PopupContainer v-if="popupTrigger" :TogglePopup ="() => TogglePopup()">
        <div v-html="popupContent">
        </div>
        
    </PopupContainer>
    <div class="home-body">
        <h1 class="title">Explore our<br />Researcher Directory.</h1>
        <p class="explore-text">
            Search the Intersections of Gender Researcher Directory using the search bar, or scroll through our interactive keyword below.
        </p>
        <KeywordList :action-link="'explore'" :model="searchStore.keywords" :hexColorList="colorList" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';

    import { useSearchStore } from '../store'

    import { search } from '@arcualberta/catfish-ui';
    import KeywordList from "../components/KeywordList.vue" 
    import PopupContainer from "../components/PopupContainer.vue"
    import config from '../appsettings';

    export default defineComponent({
        name: 'HomeView',
        modules: {
            search
        },
        components: {
            KeywordList,
            PopupContainer,
        },
        setup() {
            const searchStore = useSearchStore();
            const popupTrigger = ref(false);
            //const TogglePopup = (trigger) => { popupTrigger.value[trigger] = !popupTrigger.value[trigger] };
            return {
                searchStore,
                PopupContainer,
                popupTrigger,
                TogglePopup: () => ( popupTrigger.value = !popupTrigger.value ),
                //keywordQueryModel: computed(() => searchStore.keywordQueryModel),
                colorList: computed(() => config.hexColorList),
                popupContent: computed(() => config.infoPopupContent)
            }
        }
    });
</script>

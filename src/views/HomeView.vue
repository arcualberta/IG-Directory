<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <FreeTextSearch />
        {{JSON.stringify(keywordQueryModel)}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { props } from '@arcualberta/catfish-ui';
    import FreeTextSearch from '@arcualberta/catfish-ui/src/lib-components/search/components/FreeTextSearch.vue'

    export default defineComponent({
        name: 'HomeView',
        props,
        components: {
            FreeTextSearch
        },
        setup() {
            const store = useStore();


            return {
                keywordQueryModel: computed(() => store.state.keywordQueryModel)
            }
        }
    });
</script>

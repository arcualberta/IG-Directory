<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        {{JSON.stringify(keywordQueryModel)}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { props } from '@arcualberta/catfish-ui';
    import { State } from '@arcualberta/catfish-ui/dist/types/src/lib-components/search/state';

    export default defineComponent({
        name: 'HomeView',
        props,
        components: {
        },
        setup() {
            const store = useStore();


            return {
                keywordQueryModel: computed(() => (store.state as State).keywordQueryModel)
            }
        }
    });
</script>

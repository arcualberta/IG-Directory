<template>
    <div class="Join">
        <h1>This is join page</h1>
        <FormSubmission :model="formStore.form" />
    </div>
</template>


<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';

    import { FormSubmission } from '@arcualberta/catfish-ui';

    import {useFormStore} from '../store';
    import { entity } from '@arcualberta/catfish-ui';
  

    export default defineComponent({
        name: 'HomeView',
        modules: {
       //     form
        },
        components: {
            FormSubmission
        },
        setup() {
            const formStore = useFormStore()
            formStore.fetchData();
            const popupTrigger = ref(false);
            //const TogglePopup = (trigger) => { popupTrigger.value[trigger] = !popupTrigger.value[trigger] };
            return {
                formStore,
            }
        }
    });
</script>

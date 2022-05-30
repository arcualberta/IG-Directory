<template>
    <div class="Join">
        <h1>This is join page</h1>
        <FormSubmission :model="formStore.form" />
    </div>
</template>


<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';

    //import { form, FormSubmission } from '@arcualberta/catfish-ui';
    import * as form from '@/components/form'
    import { default as FormSubmission } from '@/components/form/components/editor/FormSubmission.vue'

    import {useFormStore} from '../store';
  
   
    export default defineComponent({
        name: 'HomeView',
        modules: {
            form
        },
        components: {
            FormSubmission
        },
        setup() {
            const formStore = useFormStore()
            formStore.fetchData();

            return {
                formStore,
            }
        }
    });
</script>

<template>
    <div class="Join">
        <h1>This is join page</h1>
        <FormSubmission :model="formStore.form" />
    </div>
</template>


<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';

    import { form, FormSubmission } from '@arcualberta/catfish-ui';

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

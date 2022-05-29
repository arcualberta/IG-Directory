<template>
    <div class="Join">
        <h1>This is join page</h1>
        <FormSubmission :model="formStore.form" />
    </div>
</template>


<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';

    import { form } from '@arcualberta/catfish-ui';
    //import { FormSubmission } from '@arcualberta/catfish-ui/src/lib-components/form/components/FormSubmission.vue';

    import {useFormStore} from '../store';
  

    export default defineComponent({
        name: 'HomeView',
        modules: {
            form
        },
        components: {
            form.FormSubmission
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

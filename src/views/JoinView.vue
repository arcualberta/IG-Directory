<template>
    <div class="page-body">
        <FormSubmission :model="formStore.form" :pinia-instance="pinia" />
        <button @click="submitForm()">Submit</button>
        <!--{{JSON.stringify(formStore.form)}}-->
    </div>
</template>


<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { getActivePinia } from 'pinia'

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

            const pinia = getActivePinia();

            const submitForm = () => {
                if (form.helpers.validateForm(formStore.form as form.models.FieldContainer)) {
                    console.log('Submitting form ...')
                }
            }
            return {
                formStore,
                submitForm,
                pinia
            }
        }
    });
</script>

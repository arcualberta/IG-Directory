<template>
    <div class="page-body">
        <FormSubmission :model="formStore.form" :pinia-instance="pinia" />
        <button class="submit-button" @click="submitForm()">Submit</button>
        <div v-if="formStore.submissionFailed" class="alert alert-danger">Sorry, the form submission failed.</div>
        <!--{{JSON.stringify(formStore.form)}}-->
    </div>
</template>


<script lang="ts">
    import { defineComponent } from 'vue';
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
                formStore.submitForm();
            ////    if (form.helpers.validateForm(formStore.form as form.models.FieldContainer)) {
            ////        console.log('Submitting form ...')
            ////        formStore.submitForm();
            ////    }
            ////    else
            ////        console.log('Form validation failed ...')
            }
            return {
                formStore,
                submitForm,
                pinia
            }
        }
    });
</script>

<template>
    <div class="page-body">
        <h2 v-if="formStore.isUpdate">Update Profile</h2>
        <h2 v-else>Create Profile</h2>
        <FormSubmission :model="formStore.form" :pinia-instance="pinia" />
        <button class="submit-button" @click="submitForm()">Submit</button>
        <div v-if="formStore.submissionFailed" class="alert alert-danger">Sorry, the form submission failed.</div>
        <!--{{JSON.stringify(formStore.form)}}-->
    </div>
</template>


<script lang="ts">
    import { defineComponent, watch } from 'vue';
    import { getActivePinia } from 'pinia'
    import { useRoute } from 'vue-router'
    import { Guid } from 'guid-typescript';

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

            const pinia = getActivePinia();

            const route = useRoute();
            const id = route.params.id;

            if (id)
                formStore.fetchItem(id as unknown as Guid);
            else
                formStore.fetchForm();

            watch(() => route.params.id, async newId => {
                if (newId)
                    formStore.fetchItem(newId as unknown as Guid);
                else
                    formStore.fetchForm();
            })

            const submitForm = () => {
                if (form.helpers.validateForm(formStore.form as form.models.FieldContainer)) {
                    console.log('Submitting form ...')
                    formStore.submitForm();
                }
                else
                    console.log('Form validation failed ...')
            }
            return {
                formStore,
                submitForm,
                pinia
            }
        }
    });
</script>

<script lang="ts">
    import { defineComponent, PropType, computed } from "vue";

    import * as models from '../../models'
    import * as helpers from '../../helpers'

    import { default as FormField } from './FormField.vue'

    export default defineComponent({
        name: "SubmissionForm",
        props: {
            model: {
                type: null as PropType<models.FieldContainer> | null,
                required: false
            },
        },
        components: {
            FormField,
        },
        setup(p) {

           return{
               name: computed(() => helpers.getFieldName(p.model as models.FieldContainer)),
           }
        },
    });
</script>

<template>
    <h2>{{name}}</h2>
    <FormField v-for="field in model?.fields.$values" :key="field.id" :model="field" />
    <!--{{JSON.stringify(model)}}-->
</template>

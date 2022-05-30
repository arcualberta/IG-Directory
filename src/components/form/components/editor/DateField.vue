<script lang="ts">
    import { defineComponent, PropType } from "vue";
    import * as models from '../../models'

    export default defineComponent({
        name: "DateField",
        props: {
            model: {
                type: null as PropType<models.MonolingualTextField> | null,
                required: false
            },
            isMultivalued:
            {
                type: Boolean,
                required: false,
                default: false
            }
        },
    });
</script>


<template>
    DateField
    <!--<div v-for="val in model?.values?.$values">
        <Text :model="val" :is-multiline="false" :is-rich-text="false" :validation-status="validationStatus" field="date" />
    </div>-->
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue";
    import * as models from '../../models'

    export default defineComponent({
        name: "EmailField",
        props: {
            model: {
                type: null as PropType<models.MonolingualTextField> | null,
                required: true
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
    EmailField
    <div v-for="val in model?.values?.$values" :key="val">
        <Text :model="val" :is-multiline="false" :is-rich-text="false" :validation-status="validationStatus" field="email" />

    </div>
</template>

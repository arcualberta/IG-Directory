<script lang="ts">
    import { defineComponent, PropType } from "vue";
    import * as models from '../../models'

    export default defineComponent({
        name: "CheckboxField",
        props: {
            model: {
                type: null as PropType<models.OptionsField> | null,
                required: false
            },
        },
    });
</script>


<template>
    CheckboxField
</template>

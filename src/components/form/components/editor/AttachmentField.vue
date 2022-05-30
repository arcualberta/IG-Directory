<script lang="ts">
    import { defineComponent, PropType } from "vue";
    import * as models from '../../models'

    export default defineComponent({
        name: "AttachmentField",
        props: {
            model: {
                type: null as PropType<models.AttachmentField> | null,
                required: false
            },
        },
    });
</script>


<template>
    AttachmentField
</template>

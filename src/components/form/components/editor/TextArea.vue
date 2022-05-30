<script lang="ts">
    import { defineComponent, PropType } from "vue";
    import * as models from '../../models'

    export default defineComponent({
        name: "TextArea",
        props: {
            model: {
                type: null as PropType<models.TextField> | null,
                required: false
            },
        },
    });
</script>


<template>
    TextArea
</template>

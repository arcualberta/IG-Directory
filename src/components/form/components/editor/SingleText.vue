<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	
	
	import * as models from '../../models'

    export default defineComponent({
        name: "SingleText",
        props: {
            model: {
                type: null as PropType<models.Text> | null,
                required: true
			},
			
        },
	
    });
</script>

<template>
	<input type="text"  />	
</template>


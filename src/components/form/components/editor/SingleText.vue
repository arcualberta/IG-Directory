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
            isMultiline:{
                type:  null as PropType<boolean> | null,
                require: false,
                default: false
            },
            fieldType:{
                type:  null as PropType<string> | null,
                require: false,
                default: "text"
            }
			
        },
	
    });
</script>

<template>
     <div v-if="isMultiline"  >
        <textarea cols="30" rows="2" />
     </div>
	<div v-else>
        <input v-if="fieldType == 'text'" type="text"  />	
         <input v-else :type="fieldType"  />
    </div>
</template>


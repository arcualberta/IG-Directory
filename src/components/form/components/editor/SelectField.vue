<script lang="ts">
    import { defineComponent, PropType, computed } from 'vue'
     import * as models from '../../models'
   
    export default defineComponent({
		name: "SelectField",
        components: {
            
        },
        props: {
            model: {
                type: Object as PropType<models.OptionsField> | null,
                required: true
           }
        },
        methods: {
           
            getConcatenatedOptionLabels(option: any): string {
                const concatenatedLabels = option.optionText?.values?.$values.map((txt: { value: any; }) => txt.value).join(" / ")
                return concatenatedLabels ? concatenatedLabels : "";
            }
        },
      
    });
</script>

<template>
    <div>
        <select v-model="selected" class="form-control col-md-6">
            <option disabled value="">Please select one</option>
            <option v-for="option in model.options.$values" :id="option.id" :value="option.id" :key="option.id">{{this.getConcatenatedOptionLabels(option)}}</option>
        </select>
       
    </div>
</template>

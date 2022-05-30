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
         methods:{
             getConcatenatedOptionLabels(option: any): string {
                const concatenatedLabels = option.optionText?.values?.$values.map((txt: { value: any; }) => txt.value).join(" / ")
                return concatenatedLabels ? concatenatedLabels : "";
			}
        }
    });
</script>


<template>
      <div v-for="option in model.options.$values" :key="option.id">
        <input type="checkbox" :id="option.id" :value="option.id"  />
        <label :for="option.id"> {{this.getConcatenatedOptionLabels(option)}}</label>
    </div>
</template>

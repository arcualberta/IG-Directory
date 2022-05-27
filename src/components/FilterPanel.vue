<script lang="ts">
    import { defineComponent, PropType } from "vue";

    import { search } from '@arcualberta/catfish-ui';
    import * as itemHelper from '../helpers/itemHelper';
    import { useSearchStore } from '../store'

    export default defineComponent({
        name: "FilterPanel",
        props: {
            options: {
                type: null as PropType<search.SolrQuery.ValueConstraint[]> | null,
                required: false
            },
            optionGroups: {
                type: null as PropType<search.SolrQuery.ValueConstraint[][]> | null,
                required: false
            },
            optionGroupNames: {
                type: null as PropType<string[]> | null,
                required: false
            }

        },
        setup(p) {
            const searchStore = useSearchStore();

            const toggleOption = (option: search.SolrQuery.ValueConstraint) => {
                option.selected = !option.selected;
                searchStore.fetchData();
            }

            return {
                toggleOption,
                itemHelper
            }
        },
    });
</script>

<template>
    <div class="filter-panel">
        <div v-for="(option, index) in options" :key="index">
            <input @click="toggleOption(option)" type="checkbox" /> {{option.value}}
        </div>
        <div v-for="(options, index) in optionGroups" :key="index">
            <div class="group">
                <div>{{optionGroupNames[index]}}</div>
                <div v-for="option in options" :key="option">
                    <input @click="toggleOption(option)" type="checkbox" /> {{option.value}}
                </div>
            </div>
        </div>
    </div>
</template>

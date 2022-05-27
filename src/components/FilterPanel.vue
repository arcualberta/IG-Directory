<script lang="ts">
    import { defineComponent, computed, PropType } from "vue";
    import { Guid } from 'guid-typescript';

    import { search } from '@arcualberta/catfish-ui';
    import * as itemHelper from '../helpers/itemHelper';
    import { useSearchStore } from '../store'

    export default defineComponent({
        name: "FilterPanel",
        props: {
            options: {
                type: null as PropType<search.SolrQuery.ValueConstraint[]> | null,
                required: true
            },

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
    <div class="filter-panel row">
        <div v-for="option in options" :key="option">
            <input @click="toggleOption(option)" type="checkbox" /> {{option.value}}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import { search, FreeTextSearch } from '@arcualberta/catfish-ui';

    export default defineComponent({
        name: 'ProfileView',
        modules: {
            search
        },
        components: {
            FreeTextSearch,
        },
        setup() {
            const store = useStore();

            onMounted(() => store.dispatch(search.Actions.FRESH_SEARCH))

            return {
                state: computed(() => store.state),
                keywordQueryModel: computed(() => store.state.search.keywordQueryModel),
                searchResults: computed(() => store.state.search.searchResult),

            }
        }
    });
</script>
<template>
    <FreeTextSearch />
    <div class="Profile">
        <div class="background-grey-researcher">
            <div class="results">
                <img class="results-image" />
                <p class="info-1">
                    <u>Dia Da Costa (she/her)</u>
                    <br>Professor
                    <br>Faculty of Education
                    <br>ddacosta@ualberta.ca
                </p>
                <p>
                    Self-identification
                    <br>
                    Disability: -
                </p>
            </div>
        </div>
        <div class="right-content-researcher">

        </div>
        <div class="explore-related">

        </div>

    </div>
</template>

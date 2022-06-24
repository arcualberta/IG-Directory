<script lang="ts">
    import { defineComponent, computed, PropType } from "vue";
    import {useRouter} from 'vue-router'
    import { Guid } from 'guid-typescript';
    import { default as config } from '../appsettings';
    import { search} from '@arcualberta/catfish-ui';
    import * as itemHelper from '../helpers/itemHelper';

    export default defineComponent({
        name: "ExploreRelatedResearchers",
        props: {
            model: {
                type: null as PropType<search.ResultItem> | null,
                required: true
            },
        },
        setup(p) {
            const router = useRouter();
            return {
                router,
                name: computed(() => itemHelper.getName(p.model)),
                pronouns: computed(() => itemHelper.getPronouns(p.model)),
                position: computed(() => itemHelper.getPosition(p.model)),
                organization: computed(() => itemHelper.getOrganization(p.model)),
                email: computed(() => itemHelper.getEmail(p.model)),
                imageSource: computed(() => config.dataServiceApiRoot + "items/" + p.model.id + "/" + itemHelper.getDataItemInstanceId(p.model) + "/"
                    + config.dataAttributes.attachmentFieldId + "/" + itemHelper.getFileName(p.model)),
                gotoProfile(id: Guid) {
                    router.push({ path: "/profile/" + id })

                    
                }
            }
        },
    });
</script>

<template>
    <div class="related">
        <img class="related-image" :src="imageSource" />
        <div class="related-results">
            <a class="router-link" @click=gotoProfile(model.id)>{{name}}</a> <span v-if="pronouns">({{pronouns}})</span>
            <br />
            <span v-if="position">{{position}}</span>
            <br />
            <span v-if="organization">{{organization}}</span>
            <br />
            <span v-if="email">{{email}}</span>
        </div>
    </div>
</template>

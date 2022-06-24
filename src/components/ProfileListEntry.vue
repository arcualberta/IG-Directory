<script lang="ts">
    import { defineComponent, computed, PropType } from "vue";
    import {useRouter} from 'vue-router'
    import { Guid } from 'guid-typescript';

    import { search} from '@arcualberta/catfish-ui';
    import * as itemHelper from '../helpers/itemHelper';
    import { default as config } from '../appsettings';
    export default defineComponent({
        name: "ProfileListEntry",
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
                position: computed(() => itemHelper.getPosition(p.model)),
                pronuns: computed(() => itemHelper.getPronouns(p.model)),
                organization: computed(() => itemHelper.getOrganization(p.model)),
                keywords: computed(() => itemHelper.getKeywords(p.model)),
                imageFile: computed(() => itemHelper.getFileName(p.model)),
                imageSource: computed(() => config.dataServiceApiRoot + "items/" + p.model.id + "/" + p.model.rootFormInstaceId + "/"
                    + config.dataAttributes.attachmentFieldId + "/" + itemHelper.getFileName(p.model)),
                gotoProfile(id: Guid) {
                    router.push({ path: "/profile/" + id })
                }
            }
        },
    });
</script>

<template>
    <div class="results">
        <img v-if="imageFile" class="results-image" :src="imageSource" />
        <img v-else class="results-image" src="../assets/user-profile-icon.jpg" />
        <div class="results-name"><a @click="gotoProfile(model.id)">{{name}}<span v-if="pronuns">({{pronuns}})</span></a></div>
        <br />
        <p class="results-description">
            {{position}}
            <br />
            {{organization}}
            <br />
            Keywords: {{keywords.join(", ")}}

        </p>
    </div>
    <!--<div class="item row">
        <div class="itemProfile">

            <img class="profileImg" src="../assets/user-profile-icon.jpg" />

            <div class="profileInfo">
                <div class="item-title router-link"><a @click="gotoProfile(model.id)">{{name}}</a></div>
                <div>{{position}}</div>
                <div>Keywords: {{keywords.join(", ")}}</div>-->
                <!--<div style="border:dashed 1px #808080;margin:4px;">{{JSON.stringify(model)}}</div>-->
            <!--</div>
        </div>
    </div>-->
</template>

<style scoped>
    .item {
        padding: 15px;
    }

    .item_rofile {
        width: 80%;
    }

    .profileInfo {
        margin-left: 10px;
        display: inline-block;
        width: 70%;
        float: right;
    }

    .profileImg {
        width: 120px;
        height: 120px;
        margin-left: 5px;
    }
</style>
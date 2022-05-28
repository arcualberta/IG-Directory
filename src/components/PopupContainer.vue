<template>
    <div class="popup">
        <div class="ui-dialog">
            <button class="popup-close" @click="TogglePopup()">Close</button>
            <slot/>
        </div>
    </div>   
</template>

<script lang="ts">
    export default {
        props: ['TogglePopup']

    }
</script>
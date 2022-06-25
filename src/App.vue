<template>
    <header class="header">
        <router-link to="/">
            <img class="ua-logo" src="./assets/ua-ig-logo.png">
        </router-link>
        <div class="accessibility-dropdown">
            <button class="accessibility-ddbtn" >Accessibility<br> Settings</button>
            <div class="accessibility-ddcontent">
                <button class="accessibility-btn" @click="IncreaseFontSize()">Increase<br> font size</button>
                <button class="accessibility-btn" @click="DecreaseFontSize()">Decrease<br> font size</button>
                <!--<button class="accessibility-btn">Toggle Typeface</button>-->
                <button class="accessibility-btn" @click="HighContrast()">High <br>contrast</button>
                <button class="accessibility-btn" @click="LowContrast()">Low <br>contrast</button>
                <button class="accessibility-btn" @click="blackAndWhite()">Black & <br>white</button>
                <button class="accessibility-btn" @click="reset()">Reset</button>
            </div>
        </div>
    </header>

<div class="background-white" id="appContent">
    <div >
        <nav class="navigationalmenu">
            <router-link to="/" class="navigation-menu-box">Home</router-link>
            <router-link to="/explore" class="navigation-menu-box">Explore</router-link>
            <router-link to="/join" class="navigation-menu-box">Join our directory!</router-link>
            <!--<router-link to="/profile/:id">Profile</router-link>-->
        </nav>
    </div>

    <router-view />

    <!--<h3>App State</h3>
    {{JSON.stringify(state)}}-->
</div>
 <footer>
     <div class="footerLinks">
         <a class="footerLink" href="https://www.ualberta.ca" target="_blank" rel="noopener">University of Alberta </a>
         <a class="footerLink" href="https://www.ualberta.ca/privacy.html" target="_blank" rel="noopener">Privacy</a>
         <a v-if="isLoggedIn" href="#" @click="profileStore.signOut()" class="footerLoginBtn" style="float: right;"> Logout</a>
         <a v-else href="/server/login?ret=/" id="footerLoginBtn" class="footerLoginBtn" style="float: right;"> Login</a>
     </div>
 </footer>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';
    import { Guid } from 'guid-typescript';


    import { useSearchStore, useProfileStore } from './store'

    import config from './appsettings';


    export default defineComponent({
        name: 'App',
        setup() {

            const searchStore = useSearchStore();
            const profileStore = useProfileStore();

            profileStore.fetchUserInfo();

            searchStore.templateId = profileStore.templateId = config.dataAttributes.templateId as unknown as Guid;
            searchStore.collectionId = profileStore.collectionId = Guid.parse(config.dataAttributes.collectionId);
            searchStore.groupId = profileStore.groupId = Guid.parse(config.dataAttributes.groupId);

            searchStore.queryApiUrl = profileStore.queryApiUrl = config.dataServiceApiRoot + 'keywordsearch';

            const blackAndWhiteTrigger = ref(false);
            const contrastValue = ref(1);

            return {
                searchStore,
                profileStore,
                blackAndWhiteTrigger,
                contrastValue,
                IncreaseFontSize: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
                        const fontSize = parseFloat(style);
                        el.style.fontSize = (fontSize + 1) + 'px';
                    }

                },
                DecreaseFontSize: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
                        const fontSize = parseFloat(style);
                        el.style.fontSize = (fontSize - 1) + 'px';
                    }

                },
                HighContrast: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        const style = window.getComputedStyle(el, null).getPropertyValue('filter');
                        contrastValue.value = contrastValue.value + 0.1;
                        el.style.filter = 'contrast(' + contrastValue.value+')';
                        console.log("value", contrastValue.value);
                    }

                },
                LowContrast: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        const style = window.getComputedStyle(el, null).getPropertyValue('filter');
                        contrastValue.value = contrastValue.value - 0.1;
                        el.style.filter = 'contrast(' + contrastValue.value + ')';
                        console.log("value", contrastValue.value);
                    }

                },
                blackAndWhite: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        const style = window.getComputedStyle(el, null).getPropertyValue('filter');
                        if (blackAndWhiteTrigger.value)
                            el.style.filter = 'grayscale(0%)';
                        else
                            el.style.filter = 'grayscale(100%)';

                        blackAndWhiteTrigger.value = !blackAndWhiteTrigger.value
                    }

                },
                reset: () => {
                    const el = document.getElementById('appContent');
                    if (el) {
                        el.style.fontSize = '18px';
                        el.style.filter = 'grayscale(100%)';
                        el.style.filter = 'contrast(1)'
                    }

                },
                isLoggedIn: computed(() => profileStore?.userInfo?.userName?.length && (profileStore?.userInfo?.userName?.length > 0))
            }
        },
    });
</script>


<!--<style lang="scss">
    /*#app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--grey)
    }*/

    /*nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }*/
</style>-->

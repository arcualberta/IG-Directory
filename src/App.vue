<template>
<header class="header">
    <router-link to="/">
        <img class="ua-logo" src="./assets/ua-ig-logo.png">
    </router-link>
   <div class="accessibility-dropdown">
        <button class="accessibility-ddbtn">Accessibility<br> Settings</button>
        <div class="accessibility-ddcontent">
            <a href="#">Increase font size</a>
            <a href="#">Toggle Typeface</a>
            <a href="#">High contrast</a>
             <a href="#">Black & white</a>
        </div>
    </div>
</header>

<div class="background-white">
    <div>
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
         <a href="#" id="footerLoginBtn" style="float: right;"> Login</a>
     </div>
 </footer>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { Guid } from 'guid-typescript';


    import { useSearchStore, useProfileStore } from './store'

    import { common } from '@arcualberta/catfish-ui';
    import config from './appsettings';


    export default defineComponent({
        name: 'App',
        modules: {
            common
        },
        setup() {

            const searchStore = useSearchStore();
            searchStore.templateId = config.dataAttributes.templateId as unknown as Guid,
            searchStore.collectionId = Guid.parse(config.dataAttributes.collectionId)
            searchStore.groupId = Guid.parse(config.dataAttributes.groupId)

            searchStore.queryApiUrl = config.dataServiceApiRoot + 'keywordsearch';

            const profiletore = useProfileStore();
            
            return {
                searchStore,
                profiletore,
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

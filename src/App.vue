<template>
<header>
    <div><a href="/"><img id="uaig-logo" src="./assets/ua-ig-logo.png"></a></div>
   <div class="accessibility-dropdown">
        <button class="accessibility-ddbtn">Accessibility Settings</button>
        <div class="accessibility-ddcontent">
            <a href="#">Increase font size</a>
            <a href="#">Toggle Typeface</a>
            <a href="#">High contrast</a>
             <a href="#">Black & white</a>
        </div>
    </div>
</header>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/explore">Explore</router-link>
        <router-link to="/join">Join</router-link>
        <router-link to="/profile/:id">Profile</router-link>
    </nav>
   

 <router-view />

 <footer>
     <div class="footerLinks">
         <a class="footerLink" href="https://www.ualberta.ca" target="_blank" rel="noopener">University of Alberta </a>
        <a class="footerLink" href="https://www.ualberta.ca/privacy.html" target="_blank" rel="noopener">Privacy</a> 
         <span id="footerLoginBtn" style="float: right;"> Login</span>
     </div>
 </footer>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from 'vuex';

    import { common } from '@arcualberta/catfish-ui';
    import config from './appsettings';

    export default defineComponent({
        name: 'App',
        modules: {
            common
        },
        setup() {
            const store = useStore();

            store.commit(common.Mutations.SET_PAGE_ID, config.pageId)
            store.commit(common.Mutations.SET_BLOCK_ID, config.blockId)
            store.commit(common.Mutations.SET_DATA_SERVICE_API_ROOT, config.dataServiceApiRoot)
            store.commit(common.Mutations.SET_PAGE_SERVICE_API_ROOT, config.pageServiceApiRoot)
            store.commit(common.Mutations.SET_SOLR_SERVICE_API_ROOT, config.solrServiceApiRoot)

        },
    });
</script>


<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--grey)
    }

    nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

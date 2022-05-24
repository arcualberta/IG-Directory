import { search } from '@arcualberta/catfish-ui';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        item: null as null | search.ResultItem,
       
    }),
    getters: {
           
    },
    actions: {
       
    }
});
/*
import { Guid } from 'guid-typescript';
import { defineStore } from 'pinia';

//import { Form } from '@arcualberta/catfish-ui';

import { baseState, fetchQuery } from './common';

export const useFormStore = defineStore('FormStore', {
    state: () => ({
        ...baseState,
        form: null as any | null,
    }),
    actions: {
        fetchData() {

            const api = 'https://catfish-test.artsrn.ualberta.ca/applets/api/itemtemplates/bd35d406-3399-40af-bc72-c7b5813ee9b1/data-form/49a7a1d3-0194-4703-b3d8-747acbf3bbfa';

            fetch(api, {
                method: 'GET', // or 'PUT'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log("Search Results:\n", JSON.stringify(data));
                    this.form = JSON.parse(data);                  
                })
                .catch((error) => {
                    console.error('Item Load API Error:', error);
                });
        },
    }
});
*/

import { defineStore } from 'pinia';
import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';
import { entity } from '@arcualberta/catfish-ui';

import { baseState, fetchQuery } from './common';
import { createSearchQueryModel } from '../helpers/createSearchQueryModel';

export const useFormStore = defineStore('FormStore', {
    state: () => ({
        form: null as FieldContainer | null,
        query: null as search.SolrQuery.QueryModel | null
    }),
    getters: {
    },
    actions: {
        fetchData() {

            const api = 'https://catfish-test.artsrn.ualberta.ca/applets/api/itemtemplates/bd35d406-3399-40af-bc72-c7b5813ee9b1/data-form/49a7a1d3-0194-4703-b3d8-747acbf3bbfa'

            fetch(api, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(JSON.stringify(data))
                    this.form = data;
                })
                .catch((error) => {
                    console.error('Item Load API Error:', error);
                });
        },
    }
});
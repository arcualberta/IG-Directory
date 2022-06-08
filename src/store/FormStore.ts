import { defineStore } from 'pinia';
//import { Guid } from 'guid-typescript';

import { search } from '@arcualberta/catfish-ui';
import { form } from '@arcualberta/catfish-ui';

import config from '../appsettings';

export const useFormStore = defineStore('FormStore', {
    state: () => ({
        form: null as form.models.FieldContainer | null,
        query: null as search.SolrQuery.QueryModel | null,
        submissionFailed: false
    }),
    getters: {
    },
    actions: {
        fetchData() {

            //const api = 'https://catfish-test.artsrn.ualberta.ca/applets/api/itemtemplates/bd35d406-3399-40af-bc72-c7b5813ee9b1/data-form/49a7a1d3-0194-4703-b3d8-747acbf3bbfa'
            const api = `${config.dataServiceApiRoot}itemtemplates/${config.dataAttributes.templateId}/data-form/${config.dataAttributes.formId}`


            fetch(api, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.form = data;
                })
                .catch((error) => {
                    this.submissionFailed = true;
                    console.error('Item Load API Error:', error);
                });
        },
        submitForm() {

            //const api = 'https://catfish-test.artsrn.ualberta.ca/applets/api/itemtemplates/bd35d406-3399-40af-bc72-c7b5813ee9b1/data-form/49a7a1d3-0194-4703-b3d8-747acbf3bbfa'
            const api = `${config.dataServiceApiRoot}items/?itemTemplateId=${config.dataAttributes.templateId}&groupId=${config.dataAttributes.groupId}&collectionId=${config.dataAttributes.collectionId}` //'To the submit-form action on the Items controller PostAsync method';
            ///applets/api/items/?itemTemplateId=${store.state.itemTemplateId}&groupId=${store.state.groupId ? store.state.groupId : ""}&collectionId=${store.state.collectionId}`;

            //Update the following fetch call similar to the Actions.SUBMIT_FORM action on the Catfish.Applets, form-submission actions
            //so that it will pass on the "this.form" in this FormStore and get the response.
            //If the response is successful, redirect the user (router.push) to the JoinConfirmationView view. 
            //If the post cal failed, display "Sibmission failed" near the "Submit" button on the Join Us page.

            const formData = new FormData();
            //Setting the serialized JSON form model to the datamodel variable in formData
            formData.append('datamodel', JSON.stringify(this.form));
            console.log('datamodel - ', JSON.stringify(this.form))

            ////Adding all attachments uploaded to the files variable in formData
            //for (const key in store.state.flattenedFileModels) {
            //    if (store.state.flattenedFileModels[key].length > 0) {
            //        store.state.flattenedFileModels[key].forEach(file => {
            //            console.log("File: ", file.name)
            //            formData.append('files', file);
            //            formData.append('fileKeys', key);
            //        })
            //    }
            //}



            fetch(api,
                {
                    body: formData,
                    method: "post",
                    headers: {
                        "encType": "multipart/form-data"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(JSON.stringify(data))
                    this.submissionFailed = data !== "Success";
                })
                .catch((error) => {
                    this.submissionFailed = true;
                    console.error('Item Load API Error:', error);
                });

        }
    }
});
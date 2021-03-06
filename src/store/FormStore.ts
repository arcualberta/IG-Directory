import { defineStore } from 'pinia';
import router from '../router'
import { search, form } from '@arcualberta/catfish-ui';
import { Guid } from 'guid-typescript';

import config from '../appsettings';
import { FieldContainer } from '@arcualberta/catfish-ui/dist/types/src/lib-components/form/models';


export const useFormStore = defineStore('FormStore', {
    state: () => ({
        form: null as form.models.FieldContainer | null,
        isUpdate: false,
        itemInstanceId: null as Guid | null,
        query: null as search.SolrQuery.QueryModel | null,
        submissionFailed: false,
    }),
    getters: {
    },
    actions: {
        fetchForm() {

            //const api = 'https://catfish-test.artsrn.ualberta.ca/applets/api/itemtemplates/bd35d406-3399-40af-bc72-c7b5813ee9b1/data-form/49a7a1d3-0194-4703-b3d8-747acbf3bbfa'
            const api = `${config.dataServiceApiRoot}itemtemplates/${config.dataAttributes.templateId}/data-form/${config.dataAttributes.formId}`
            //console.log(api)

            fetch(api, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.form = data;
                    this.isUpdate = false;
                    this.itemInstanceId = null;
                })
                .catch((error) => {
                    this.submissionFailed = true;
                    console.error('Item Load API Error:', error);
                });
        },
        fetchItem(id: Guid) {

            const api = `${config.dataServiceApiRoot}items/${id}`
            console.log(api)

            fetch(api, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.form = data.dataContainer.$values[0];
                    this.isUpdate = true;
                    this.itemInstanceId = data.id as unknown as Guid;
                })
                .catch((error) => {
                    this.submissionFailed = true;
                    console.error('Item Load API Error:', error);
                });
        },
        submitForm() {

            const api = this.isUpdate
                ? `${config.dataServiceApiRoot}items/update-form/?itemInstanceId=${this.itemInstanceId}`
                : `${config.dataServiceApiRoot}items/?itemTemplateId=${config.dataAttributes.templateId}&groupId=${config.dataAttributes.groupId}&collectionId=${config.dataAttributes.collectionId}` //'To the submit-form action on the Items controller PostAsync method';

            const formData = new FormData();
            //Setting the serialized JSON form model to the datamodel variable in formData
            formData.append('datamodel', JSON.stringify(this.form));
            console.log('datamodel - ', JSON.stringify(this.form))

            //Adding all attachments uploaded to the files variable in formData
            const fileReferences = form.helpers.getFileReferences(this.form as FieldContainer);
            fileReferences.forEach(fileRef => {
                if (fileRef.file) {
                    formData.append('files', fileRef.file);
                    formData.append('fileKeys', fileRef.fieldId.toString() as unknown as string);
                }
           })

            fetch(api,
                {
                    body: formData,
                    method: this.isUpdate ? "put" : "post",
                    headers: {
                        "encType": "multipart/form-data"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    //console.log(JSON.stringify(data))
                    this.submissionFailed = data !== "Success";
                    router.push({name:'joinConfirmation'})
                })
                .catch((error) => {
                    this.submissionFailed = true;
                    console.error('Item Load API Error:', error);
                });

        }
    }
});
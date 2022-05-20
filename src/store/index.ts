
export { useSearchStore } from './SearchStore';
export { useProfileStore } from './ProfileStore';
//export { useKeywordStore } from './KeywordStore';

/***** DEPRECATED VUEX *****/
import { createStore } from 'vuex'

import { common, search } from '@arcualberta/catfish-ui';
import { SearchResultFieldMapping } from '../appsettings'

export default createStore({
    modules: {
        common,
        search
    },
    state: {
    },
    getters: {
        getPronouns: () => (item: any) => item?.solrFields[SearchResultFieldMapping.PRONOUNS],
        getName: () => (item: any) => item?.solrFields[SearchResultFieldMapping.NAME],
        getEmail: () => (item: any) => item?.solrFields[SearchResultFieldMapping.EMAIL],
        getPosition: () => (item: any) => item?.solrFields[SearchResultFieldMapping.POSITION],
        getOrganization: () => (item: any) => item?.solrFields[SearchResultFieldMapping.ORGANIZATION],
        getPersonOfColor: () => (item: any) => item?.solrFields[SearchResultFieldMapping.PERSON_OF_COLOR],
        getDisability: () => (item: any) => item?.solrFields[SearchResultFieldMapping.DISABILITY],
        getEthnicity: () => (item: any) => item?.solrFields[SearchResultFieldMapping.ETHNICITY],
        getGenderIdentity: () => (item: any) => item?.solrFields[SearchResultFieldMapping.GENDER_IDENTITY],
        getCommunityBasedProjects: () => (item: any) => item?.solrFields[SearchResultFieldMapping.COMMUNITY_BASED_PROJECTS],
        getDisplayOnProfile: () => (item: any) => item?.solrFields[SearchResultFieldMapping.DISPLAY_ON_PROFILE],
        getKeywordReference: () => (item: any) => item?.solrFields[SearchResultFieldMapping.KEYWORDS_REFERENCE],
        getAdditionalKeywords: () => (item: any) => item?.solrFields[SearchResultFieldMapping.ADDITIONAL_KEYWORDS],
        getDescription: () => (item: any) => item?.solrFields[SearchResultFieldMapping.DESCRIPTION],
        getExternalLinks: () => (item: any) => item?.solrFields[SearchResultFieldMapping.EXTERNAL_LINKS],
        getConsent: () => (item: any) => item?.solrFields[SearchResultFieldMapping.CONSENT],
        
        /*isKeywordSelected: (state) => (containerIndex: number, fieldIndex: number, valueIndex: number) => {
            return search.keywordQueryModel?.
                containers[containerIndex]
                .fields[fieldIndex]
                .selected[valueIndex];
        },*/
    },
    mutations: {
    },
    actions: {
    },
})


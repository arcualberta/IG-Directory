import { search } from "@arcualberta/catfish-ui";
import { SearchResultFieldMapping } from '../appsettings';
import config from '../appsettings';

/**
 * Returns the value of a given property from a .
 * Paramters:
 *      - item: the item that contains the name specified by the second parameter
 *      - solrFieldName: the name of the solr field
 */
export function getSolrFieldValue(item: search.ResultItem, solrFieldName: string) {

    if (item?.solrFields) {
        const index = Object.keys(item.solrFields).indexOf(solrFieldName);
        if (index >= 0)
            return Object.values(item.solrFields)[index]
    }
    return null;
}

export function getStringArrayValue(item: search.ResultItem, solrFieldName: string): string[] {
    const val = getSolrFieldValue(item, solrFieldName)
    return val ? val as unknown as string[] : [];
}

export function getConcatenatedStringValue(item: search.ResultItem, solrFieldName: string): string | null {
    return getStringArrayValue(item, solrFieldName).filter(val => !config.dataAttributes.excludeTerms.includes(val)).join(", ");
}

export function getName(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.NAME)
}
export function getPosition(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.POSITION)
}
export function getKeywords(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.KEYWORDS)
}
export function getOrganization(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.ORGANIZATION).join(", ")
}
export function getEmail(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.EMAIL).join(", ")
}
export function getDisability(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.DISABILITY).join(", ")
}
export function getRace(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.RACE).join(", ")
}
export function getGenderIdentity(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.GENDER_IDENTITY).join(", ")
}
export function getResearchQuestion(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.RESEARCH_QUESTION).join(", ")
}
export function getAdditionalKeywords(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.ADDITIONAL_KEYWORDS)?.replaceAll(";",", ")
}
export function getCommunityProjects(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.COMMUNITY_BASED_PROJECTS)
}
export function getLinks(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.EXTERNAL_LINKS);
}
export function getPronouns(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.PRONOUNS)
}
export function getCollaborators(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.COLLABORATORS)
}
export function getShowPronouns(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_PRONOUNS)
}
export function getShowPosition(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_POSITION)
}
export function getShowDisability(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_DISABILITY)
}
export function getShowRace(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_RACE)
}
export function getShowGenderIdentity(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_GENDER_IDENTITY)
}
export function getShowLinks(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.SHOW_EXTERNAL_LINKS)
}
export function getConsent(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.CONSENT)
}
export function getFileName(item: search.ResultItem) {
    return getConcatenatedStringValue(item, SearchResultFieldMapping.FILE_NAME)
}
export function getSimilarityTerms(item: search.ResultItem) {
    return getStringArrayValue(item, SearchResultFieldMapping.SIMILARITY_SOURCE).filter(val => !config.dataAttributes.excludeTerms.includes(val))
}





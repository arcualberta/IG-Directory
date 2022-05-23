import { search } from "@arcualberta/catfish-ui";
import { SearchResultFieldMapping } from '../appsettings';

/**
 * Returns the value of a given property from a .
 * Paramters:
 *      - item: the item that contains the name specified by the second parameter
 *      - solrFieldName: the name of the solr field
 */
export function getSolrFieldValue(item: search.ResultItem, solrFieldName: string) {

    if (item.solrFields) {
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
    return getStringArrayValue(item, solrFieldName).join(", ");
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


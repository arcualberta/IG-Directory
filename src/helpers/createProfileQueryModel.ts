import { search } from '@arcualberta/catfish-ui';
import * as config from '../appsettings';

export const createProfileQueryModel = (keywordAggregator: search.SolrQuery.AggregationOperator) => {

    const queryModel = new search.SolrQuery.QueryModel(search.SolrQuery.AggregationOperator.AND);

    if (!keywordAggregator)
        keywordAggregator = search.SolrQuery.AggregationOperator.AND;

    //Related entries constraint
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.SIMILARITY_SOURCE,
        [],
        keywordAggregator,
        "keywords");

    //Free-text search field
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.FREE_TEXT,
        [],
        search.SolrQuery.AggregationOperator.AND,
        "freetext");


    return queryModel;
}
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
        false,
        keywordAggregator,
        "keywords");

    //Free-text search field
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.FREE_TEXT,
        [],
        false,
        search.SolrQuery.AggregationOperator.AND,
        "freetext");

    //Filtering by visible status values.
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.STATE,
        config.QueryCategoryValues.visibleStates,
        true,
        search.SolrQuery.AggregationOperator.OR,
        "visibleStates");


    return queryModel;
}
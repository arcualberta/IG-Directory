import { search } from '@arcualberta/catfish-ui';
import * as config from '../appsettings';

export const createProfileQueryModel = () => {
    const queryModel = new search.SolrQuery.QueryModel(search.SolrQuery.AggregationOperator.AND);

    //Related entries constraint
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.SIMILARITY_SOURCE,
        [],
        search.SolrQuery.AggregationOperator.AND,
        "keywords");

    //Excluding the active entry from the related list

    //Free-text search field
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.FREE_TEXT,
        [],
        search.SolrQuery.AggregationOperator.AND,
        "freetext");


    return queryModel;
}
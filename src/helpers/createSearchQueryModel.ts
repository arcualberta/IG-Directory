import { search } from '@arcualberta/catfish-ui';
import * as config from '../appsettings';

export const createSearchQueryModel = () => {
    const queryModel = new search.SolrQuery.QueryModel(search.SolrQuery.AggregationOperator.AND);

    //Keyword constraint
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.KEYWORDS,
        config.QueryCategoryValues.Keywords,
        search.SolrQuery.AggregationOperator.AND,
        "keywords");

    //Free-text search field
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.FREE_TEXT,
        [],
        search.SolrQuery.AggregationOperator.AND,
        "freetext");

    //Position constraint
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.POSITION,
        config.QueryCategoryValues.Positions,
        search.SolrQuery.AggregationOperator.OR,
        "positions");

    //Faculty constraint
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.ORGANIZATION,
        config.QueryCategoryValues.Faculties,
        search.SolrQuery.AggregationOperator.OR,
        "faculties");

    //Self-identification constraints - disability
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.DISABILITY,
        config.QueryCategoryValues.SelfIdentification.Disability,
        search.SolrQuery.AggregationOperator.OR,
        "selfIdentification:disability");

    //Self-identification constraints - gender identity
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.GENDER_IDENTITY,
        config.QueryCategoryValues.SelfIdentification.GenderIdentity,
        search.SolrQuery.AggregationOperator.OR,
        "selfIdentification:genderIdentity");

    //Self-identification constraints - ethnicity
    queryModel.appendNewFieldConstraint(
        config.SearchResultFieldMapping.ETHNICITY,
        config.QueryCategoryValues.SelfIdentification.Ethnicity,
        search.SolrQuery.AggregationOperator.OR,
        "selfIdentification:ethnicity");

    return queryModel;
}
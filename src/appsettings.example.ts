export default {
    dataServiceApiRoot: "https://catfish-test.artsrn.ualberta.ca/applets/api/",
    pageServiceApiRoot: "https://catfish-test.artsrn.ualberta.ca/applets/api/",
    solrServiceApiRoot: "https://catfish-test.artsrn.ualberta.ca",
    pageId: "7738c46a-162f-4506-a4c4-fa8a05d3fe41",
    blockId: "47b4a170-5fee-4505-b2d7-f87469d8ada3",
    textAggregatorField: "_all__ts",
    keywordAggregatorField: "_keywords__ss",
    dataAttributes: {
        templateId: "bd35d406-3399-40af-bc72-c7b5813ee9b1",
        formId: "49a7a1d3-0194-4703-b3d8-747acbf3bbfa",
        collectionId: "79e652d7-bc9e-4a96-c76a-e8896825234a",
        groupId: "08fd74b1-2207-4f7f-9a1c-8450ebc535c9",
        permissibleStates: ["e952e454-73f8-4c54-92d9-d11f84ac3985"]
    },
    queryParameters: {
    },
    hexColorList: "#ffdc0e, #ffc740, #fbaf41,  #65bf7f, #00b274, #00b19d, #5175a5",
    infoPopupContent: "<p class='ui-dialog-title'>info</p> <p>Intersections of Gender is committed to using intersectional experience and excellence to build and sustain for the public good and to bring together wide - ranging initiatives to advance knowledge and inspire engaged citizenship around the world. <a href='https://www.ualberta.ca/intersections-gender/index.html'>Learn more about IG</a></p><p>This database features faculty, instructors and students at University of Alberta doing work at the intersections of gender.The database contains profiles for more than 250 researchers.</p>",
    questionPopupContent: "<p class='ui-dialog-title'>How to search</p><p> After using the search bar or interactive keyword search, your search parameters will show up on the left hand side of the screen.You can continue to filter your search by position, faculty, and self - identification.At any point, you can exit out of any given search parameter on the left by clicking on the x.To completely reset your search parameters, click the reset button.</p>"

}

export enum SearchResultFieldMapping {
    PRONOUNS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_69d866ae-94bc-4701-ab72-998a4d8bc070_ts",
    SHOW_PRONOUNS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_65409507-a783-4823-a442-9cbceb98ef14_ts",
    NAME = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_04e54156-f480-41e6-a76a-210456b66499_ts",
    EMAIL = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_4fa650bc-a20b-4a39-b7d6-40728f2461dd_ts",
    POSITION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_016caaba-a0c7-4acc-b0c2-813376b2f32c_ts",
    SHOW_POSITION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_039767df-0849-4557-a917-3b97e4b095dc_ts",
    ORGANIZATION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_98b5b06d-b4e8-4a48-ad2c-7a36b9857064_ts",
    PERSON_OF_COLOR = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_d13046af-fe79-49f8-9eda-77fc5525a611_ts",
    DISABILITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_b7f7b8f0-f2c9-422e-a91d-217fa4c5da8d_ts",
    SHOW_DISABILITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_76a5b848-4512-4ca4-9d2e-3affdf6efc6b_ts",
    RACE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_6d4efd13-6b63-4659-ba6f-0e796d50fac0_ts",
    SHOW_RACE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_4861c888-3d75-48c2-9de1-2388fd7dfb0e_ts",
    ETHNICITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_b2b63066-a17e-45dd-a3ae-a6c1f815de7b_ts",
    SHOW_ETHNICITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_b3034d56-319b-426e-9850-4536db9f503f_ts",
    GENDER_IDENTITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_deffa707-cd34-4f2b-9fcd-2e8c5161f5c9_ts",
    SHOW_GENDER_IDENTITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_69202d56-96ce-4db8-a8b3-a9b7f0b034fd_ts",
    COMMUNITY_BASED_PROJECTS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_f3964ff7-9c8b-4286-a8ab-8020d9fc421a_ts",
    DISPLAY_ON_PROFILE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_172f88ff-7c1e-4a81-aaca-0a5483af8d51_ts",
    KEYWORDS_REFERENCE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_fb7a7395-969b-458e-898b-7cb07efabf33_ts",
    ADDITIONAL_KEYWORDS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_d860b5ef-93c2-4c88-a213-7746873fe104_ts",
    RESEARCH_QUESTION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_0774a8bf-bcf0-4733-8480-85a3b9e1451e_ts",
    EXTERNAL_LINKS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_44f39fe7-f3af-47da-a2b6-f610c2f0eda3_ts",
    SHOW_EXTERNAL_LINKS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_7f1d3c61-0285-4aab-94e5-4a65aa5366bb_ts",
    CONSENT = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_84f22416-34ac-4451-bc59-e403bcd684fa_ts",
    COLLABORATORS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_afb2a6b5-e6ba-406c-90b3-7c10bf4faa73_ts",
    IMAGE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_962b6d6d-e397-4f24-8096-ed1655880af2_ts",
    KEYWORDS = "_keywords__ss",
    FREE_TEXT = "_all__ts",
    SIMILARITY_SOURCE = "_similarity_source__ts",
}

//export enum SearchResultFieldMapping {
//    PRONOUNS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_69d866ae-94bc-4701-ab72-998a4d8bc070_ts",
//    NAME = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_04e54156-f480-41e6-a76a-210456b66499_ts",
//    EMAIL = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_4fa650bc-a20b-4a39-b7d6-40728f2461dd_ss",
//    POSITION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_016caaba-a0c7-4acc-b0c2-813376b2f32c_ts",
//    ORGANIZATION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_98b5b06d-b4e8-4a48-ad2c-7a36b9857064_ts",
//    PERSON_OF_COLOR = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_d13046af-fe79-49f8-9eda-77fc5525a611_ts",
//    DISABILITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_b7f7b8f0-f2c9-422e-a91d-217fa4c5da8d_ts",
//    ETHNICITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_b2b63066-a17e-45dd-a3ae-a6c1f815de7b_ts",
//    GENDER_IDENTITY = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_deffa707-cd34-4f2b-9fcd-2e8c5161f5c9_ts",
//    COMMUNITY_BASED_PROJECTS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_f3964ff7-9c8b-4286-a8ab-8020d9fc421a_ts",
//    DISPLAY_ON_PROFILE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_172f88ff-7c1e-4a81-aaca-0a5483af8d51_ts",
//    KEYWORDS_REFERENCE = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_fb7a7395-969b-458e-898b-7cb07efabf33_ts",
//    ADDITIONAL_KEYWORDS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_d860b5ef-93c2-4c88-a213-7746873fe104_ts",
//    RESEARCH_QUESTION = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_0774a8bf-bcf0-4733-8480-85a3b9e1451e_ts",
//    EXTERNAL_LINKS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_44f39fe7-f3af-47da-a2b6-f610c2f0eda3_ts",
//    CONSENT = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_84f22416-34ac-4451-bc59-e403bcd684fa_ts",
//    COLLABORATORS = "data_49a7a1d3-0194-4703-b3d8-747acbf3bbfa_afb2a6b5-e6ba-406c-90b3-7c10bf4faa73_ts",
//    KEYWORDS = "_keywords__ss",
//    FREE_TEXT = "_all__ts",
//    SIMILARITY_SOURCE = "_similarity_source__ts",
//}

export enum QueryCategories {
    KEYWORDS = "KEYWORDS",
    POSITION = "POSITION",
    FACULTY = "FACULTY",
    SELF_IDENTIFICATION = "SELF_IDENTIFICATION"
}

export const QueryCategoryValues = {
    Keywords: ["Activism", "Age", "Black studies", "Body", "Canada", "Class", "Colonialism", "Culture", " Decolonization", "Disability",
        "Diversity", "Environment", "Ethics", "Family", "Feminism", "Feminist Theory", "Film", "Gender", "Genderqueer", "Government",
        "Health", "History", "Human Rights", "Identity", "Immigration", "Indigenous", "Inequality", " International", "Intersectionality", "Language", "Law", "Literature", "Marginalized population", "Masculinities", "Media", "Mental health", " Mothering",
        "Pedagogy", "Policy", "Politics", "Qualitative", "Research", " Queer", "Quare", "Race", "Relation", "Religion", "Sex", "Sexuality",
        "Science", "Sport", "Social justice", "Transgender", " Two-spirit", "Violence", "Work"],
    Positions: ["Assistant Professor", "Assistant Clinical Professor", "Associate Professor", "Professor"],
    Faculties: ["Faculty of Arts", "Faculty of Education", "Faculty of Native Studies"],
    SelfIdentification: {
        Disability: ["Deaf", "Neurodivergent", "Experiencing disability", "Not living with a disability", "Another"],
        Race: ["Indigenous", "Black", "Person of Colour", "White", "Another"],
        Ethnicity: ["Japanese-American", "European"],
        GenderIdentity: ["Two-Spirit", "Gender non-binary", "Genderfluid", "Transgender", "Woman", "Man", "Another"]
    }
}
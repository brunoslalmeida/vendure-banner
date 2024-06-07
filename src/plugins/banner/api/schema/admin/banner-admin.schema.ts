import gql from 'graphql-tag';

export const bannerAdminApiExtensions = gql`
  input BannerTranslationInput {
    id: ID
    languageCode: LanguageCode!
    localizedName: String
  }

  input CreateBannerInput {
    code: String!
    localizedName: String!
    translations: [BannerTranslationInput!]!
  }

  input UpdateBannerInput {
    id: ID!
    code: String
    localizedName: String
    translations: [BannerTranslationInput!]
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput!): Banner!
    updateBanner(input: UpdateBannerInput!): Banner!
    deleteBanner(id: ID!): DeletionResponse!
  }
`;


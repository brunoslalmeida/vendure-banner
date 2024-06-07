import gql from "graphql-tag";

export const bannerItemAdminApiExtensions = gql`
  input BannerItemTranslationInput {
    id: ID
    languageCode: LanguageCode!
    localizedName: String
  }

  input CreateBannerItemInput {
    code: String!
    localizedName: String!
    start: DateTime!
    end: DateTime
    link: String!
    translations: [BannerItemTranslationInput!]!
  }

  input UpdateBannerItemInput {
    id: ID!
    code: String
    localizedName: String
    start: DateTime
    end: DateTime
    link: String
    translations: [BannerItemTranslationInput!]
  }

  extend type Mutation {
    createBannerItem(input: CreateBannerItemInput!): BannerItem!
    updateBannerItem(input: UpdateBannerItemInput!): BannerItem!
    deleteBannerItem(id: ID!): DeletionResponse!
  }
`;

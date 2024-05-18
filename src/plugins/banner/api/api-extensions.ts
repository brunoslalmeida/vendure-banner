import gql from 'graphql-tag';

const bannerAdminApiExtensions = gql`
  type BannerTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    localizedName: String!
  }

  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    localizedName: String!
    translations: [BannerTranslation!]!
  }

  type BannerList implements PaginatedList {
    items: [Banner!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input BannerListOptions

  extend type Query {
    banner(id: ID!): Banner
    banners(options: BannerListOptions): BannerList!
  }

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
export const adminApiExtensions = gql`
  ${bannerAdminApiExtensions}
`;

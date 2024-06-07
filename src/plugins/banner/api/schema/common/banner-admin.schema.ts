import gql from "graphql-tag";

export const bannerAdminApiExtensions = gql`
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
    items: [BannerItem]
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
`;

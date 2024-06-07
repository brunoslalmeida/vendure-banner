import gql from "graphql-tag";

export const bannerAdminApiExtensions = gql`
  type BannerTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    slug: String!
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

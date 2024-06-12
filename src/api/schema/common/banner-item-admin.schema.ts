import gql from "graphql-tag";

export const bannerItemAdminApiExtensions = gql`
  type BannerItem implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    start: DateTime!
    end: DateTime
    link: String!
    mobile: Asset
    asset: Asset!
    banner: Banner!
  }

  type BannerItemList implements PaginatedList {
    items: [BannerItem!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input BannerItemListOptions

  extend type Query {
    bannerItem(id: ID!): BannerItem
    bannerItems(options: BannerItemListOptions): BannerItemList!
    bannerItemsFromBanner(
      banner: ID!
      options: BannerItemListOptions
    ): BannerItemList!
  }
`;

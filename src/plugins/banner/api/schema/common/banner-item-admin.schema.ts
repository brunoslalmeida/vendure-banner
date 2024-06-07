import gql from "graphql-tag";

export const bannerItemAdminApiExtensions = gql`
  type BannerItemTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    localizedName: String!
  }

  type BannerItem implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    localizedName: String!
    start: DateTime!
    end: DateTime
    link: String!
    mobile: Asset
    asset: Asset!
    translations: [BannerItemTranslation!]!
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
    bannerItemsFromBanner(banner: ID!, options: BannerItemListOptions): BannerItemList!
  }
`;

import gql from "graphql-tag";

export const bannerItemAdminApiExtensions = gql`
  input BannerItemTranslationInput {
    id: ID    
  }

  input CreateBannerItemInput {
    start: DateTime!
    end: DateTime
    link: String!
    asset: ID!
    mobile: ID
    banner: ID!
  }

  input UpdateBannerItemInput {
    id: ID!
    start: DateTime!
    end: DateTime
    link: String!
    asset: ID!
    mobile: ID
    banner: ID!
  }

  extend type Mutation {
    createBannerItem(input: CreateBannerItemInput!): BannerItem!
    updateBannerItem(input: UpdateBannerItemInput!): BannerItem!
    deleteBannerItem(id: ID!): DeletionResponse!
  }
`;

import gql from "graphql-tag";

export const bannerItemAdminApiExtensions = gql`
  input BannerItemTranslationInput {
    id: ID    
  }

  input CreateBannerItemInput {
    start: String!
    end: String
    link: String!
    asset: ID!
    mobile: ID
    banner: ID!
  }

  input UpdateBannerItemInput {
    id: ID!
    start: String!
    end: String
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

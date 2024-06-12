import gql from 'graphql-tag';

export const bannerAdminApiExtensions = gql`
  input BannerTranslationInput {
    id: ID
  }

  input CreateBannerInput {
    slug: String!
  }

  input UpdateBannerInput {
    id: ID!
    slug: String!
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput!): Banner!
    updateBanner(input: UpdateBannerInput!): Banner!
    deleteBanner(id: ID!): DeletionResponse!
    deleteBanners(ids: [ID!]!): DeletionResponse!
  }
`;


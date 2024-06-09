import { graphql } from '../gql';

export const DeleteBanners = graphql(`
  mutation DeleteBanners($input: [ID!]!) {
    deleteBanners(ids: $input){
      result
      message
    }
  }
`);
export const DeleteBanner = graphql(`
  mutation DeleteBanner($input: ID!) {
    deleteBanner(id: $input){
      result
      message
    }
  }
`);
export const CreateBanner = graphql(`
  mutation CreateBanner($input: CreateBannerInput!) {
    createBanner(input: $input) {
      ...Banner
    }
  }
`);
export const UpdateBanner = graphql(`
  mutation UpdateBanner($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
      ...Banner
    }
  }
`);

export const GetBanners = graphql(`
  query GetBanners($options: BannerListOptions) {
    banners(options: $options) {
      items {
        ...Banner
      }
      totalItems
    }
  }
`);

export const GetBanner = graphql(`
  query GetBanner($id: ID!) {
    banner(id: $id) {
      ...Banner
    }
  }
`);

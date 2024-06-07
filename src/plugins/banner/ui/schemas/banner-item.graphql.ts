import { graphql } from '../gql';

export const DeleteBannerItem = graphql(`
  mutation deleteBannerItem($input: ID!) {
    deleteBannerItem(id: $input){
      result
      message
    }
  }
`);
export const CreateBannerItem = graphql(`
  mutation CreateBannerItem($input: CreateBannerItemInput!) {
    createBannerItem(input: $input) {
      ...BannerItem
    }
  }
`);
export const UpdateBannerItem = graphql(`
  mutation UpdateBannerItem($input: UpdateBannerItemInput!) {
    updateBannerItem(input: $input) {
      ...BannerItem
    }
  }
`);

export const GetBannerItems = graphql(`
  query GetBannerItems($options: BannerItemListOptions) {
    bannerItems(options: $options) {
      items {
        ...BannerItem
      }
      totalItems
    }
  }
`);

export const GetBannerItem = graphql(`
  query GetBannerItem($id: ID!) {
    bannerItem(id: $id) {
      ...BannerItem
    }
  }
`);

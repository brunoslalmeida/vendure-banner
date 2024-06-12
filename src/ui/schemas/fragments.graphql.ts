import gql from "graphql-tag";
export const ASSET_FRAGMENT = gql`
  fragment Asset on Asset {
    __typename
    createdAt
    customFields
    fileSize
    focalPoint {
      x
      y
    }
    height
    id
    mimeType
    name
    preview
    source
    type
    updatedAt
    width
    tags {
      ...Tag
    }
  }
`;

export const TAGS_FRAGMENT = gql`
  fragment Tag on Tag {
    id
    createdAt
    updatedAt
    value
  }
`;
export const BANNER_FRAGMENT = gql`
  fragment Banner on Banner {
    id
    slug
    items {
      ...BannerItem
    }
    createdAt
    updatedAt
  }
`;

export const BANNER_ITEM_FRAGMENT = gql`
  fragment BannerItem on BannerItem {
    id
    mobile {
      ...Asset
    }
    asset {
      ...Asset
    }
    end
    link
    start
    banner {
      id
      slug
    }
  }
`;

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation deleteBannerItem($input: ID!) {\n    deleteBannerItem(id: $input){\n      result\n      message\n    }\n  }\n": types.DeleteBannerItemDocument,
    "\n  mutation deleteBannerItems($input: [ID!]!) {\n    deleteBannerItems(ids: $input){\n      result\n      message\n    }\n  }\n": types.DeleteBannerItemsDocument,
    "\n  mutation CreateBannerItem($input: CreateBannerItemInput!) {\n    createBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n": types.CreateBannerItemDocument,
    "\n  mutation UpdateBannerItem($input: UpdateBannerItemInput!) {\n    updateBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n": types.UpdateBannerItemDocument,
    "\n  query GetBannerItems($options: BannerItemListOptions) {\n    bannerItems(options: $options) {\n      items {\n        ...BannerItem\n      }\n      totalItems\n    }\n  }\n": types.GetBannerItemsDocument,
    "\n  query GetBannerItem($id: ID!) {\n    bannerItem(id: $id) {\n      ...BannerItem\n    }\n  }\n": types.GetBannerItemDocument,
    "\n  mutation DeleteBanners($input: [ID!]!) {\n    deleteBanners(ids: $input){\n      result\n      message\n    }\n  }\n": types.DeleteBannersDocument,
    "\n  mutation DeleteBanner($input: ID!) {\n    deleteBanner(id: $input){\n      result\n      message\n    }\n  }\n": types.DeleteBannerDocument,
    "\n  mutation CreateBanner($input: CreateBannerInput!) {\n    createBanner(input: $input) {\n      ...Banner\n    }\n  }\n": types.CreateBannerDocument,
    "\n  mutation UpdateBanner($input: UpdateBannerInput!) {\n    updateBanner(input: $input) {\n      ...Banner\n    }\n  }\n": types.UpdateBannerDocument,
    "\n  query GetBanners($options: BannerListOptions) {\n    banners(options: $options) {\n      items {\n        ...Banner\n      }\n      totalItems\n    }\n  }\n": types.GetBannersDocument,
    "\n  query GetBanner($id: ID!) {\n    banner(id: $id) {\n      ...Banner\n    }\n  }\n": types.GetBannerDocument,
    "\n  fragment Asset on Asset {\n    __typename\n    createdAt\n    customFields\n    fileSize\n    focalPoint {\n      x\n      y\n    }\n    height\n    id\n    mimeType\n    name\n    preview\n    source\n    type\n    updatedAt\n    width\n    tags {\n      ...Tag\n    }\n  }\n": types.AssetFragmentDoc,
    "\n  fragment Tag on Tag {\n    id\n    createdAt\n    updatedAt\n    value\n  }\n": types.TagFragmentDoc,
    "\n  fragment Banner on Banner {\n    id\n    slug\n    items {\n      ...BannerItem\n    }\n    createdAt\n    updatedAt\n  }\n": types.BannerFragmentDoc,
    "\n  fragment BannerItem on BannerItem {\n    id\n    mobile {\n      ...Asset\n    }\n    asset {\n      ...Asset\n    }\n    end\n    link\n    start\n    banner {\n      id\n      slug\n    }\n  }\n": types.BannerItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBannerItem($input: ID!) {\n    deleteBannerItem(id: $input){\n      result\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBannerItem($input: ID!) {\n    deleteBannerItem(id: $input){\n      result\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBannerItems($input: [ID!]!) {\n    deleteBannerItems(ids: $input){\n      result\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBannerItems($input: [ID!]!) {\n    deleteBannerItems(ids: $input){\n      result\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBannerItem($input: CreateBannerItemInput!) {\n    createBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBannerItem($input: CreateBannerItemInput!) {\n    createBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBannerItem($input: UpdateBannerItemInput!) {\n    updateBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBannerItem($input: UpdateBannerItemInput!) {\n    updateBannerItem(input: $input) {\n      ...BannerItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBannerItems($options: BannerItemListOptions) {\n    bannerItems(options: $options) {\n      items {\n        ...BannerItem\n      }\n      totalItems\n    }\n  }\n"): (typeof documents)["\n  query GetBannerItems($options: BannerItemListOptions) {\n    bannerItems(options: $options) {\n      items {\n        ...BannerItem\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBannerItem($id: ID!) {\n    bannerItem(id: $id) {\n      ...BannerItem\n    }\n  }\n"): (typeof documents)["\n  query GetBannerItem($id: ID!) {\n    bannerItem(id: $id) {\n      ...BannerItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBanners($input: [ID!]!) {\n    deleteBanners(ids: $input){\n      result\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBanners($input: [ID!]!) {\n    deleteBanners(ids: $input){\n      result\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBanner($input: ID!) {\n    deleteBanner(id: $input){\n      result\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBanner($input: ID!) {\n    deleteBanner(id: $input){\n      result\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBanner($input: CreateBannerInput!) {\n    createBanner(input: $input) {\n      ...Banner\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBanner($input: CreateBannerInput!) {\n    createBanner(input: $input) {\n      ...Banner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBanner($input: UpdateBannerInput!) {\n    updateBanner(input: $input) {\n      ...Banner\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBanner($input: UpdateBannerInput!) {\n    updateBanner(input: $input) {\n      ...Banner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBanners($options: BannerListOptions) {\n    banners(options: $options) {\n      items {\n        ...Banner\n      }\n      totalItems\n    }\n  }\n"): (typeof documents)["\n  query GetBanners($options: BannerListOptions) {\n    banners(options: $options) {\n      items {\n        ...Banner\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBanner($id: ID!) {\n    banner(id: $id) {\n      ...Banner\n    }\n  }\n"): (typeof documents)["\n  query GetBanner($id: ID!) {\n    banner(id: $id) {\n      ...Banner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Asset on Asset {\n    __typename\n    createdAt\n    customFields\n    fileSize\n    focalPoint {\n      x\n      y\n    }\n    height\n    id\n    mimeType\n    name\n    preview\n    source\n    type\n    updatedAt\n    width\n    tags {\n      ...Tag\n    }\n  }\n"): (typeof documents)["\n  fragment Asset on Asset {\n    __typename\n    createdAt\n    customFields\n    fileSize\n    focalPoint {\n      x\n      y\n    }\n    height\n    id\n    mimeType\n    name\n    preview\n    source\n    type\n    updatedAt\n    width\n    tags {\n      ...Tag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Tag on Tag {\n    id\n    createdAt\n    updatedAt\n    value\n  }\n"): (typeof documents)["\n  fragment Tag on Tag {\n    id\n    createdAt\n    updatedAt\n    value\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Banner on Banner {\n    id\n    slug\n    items {\n      ...BannerItem\n    }\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment Banner on Banner {\n    id\n    slug\n    items {\n      ...BannerItem\n    }\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BannerItem on BannerItem {\n    id\n    mobile {\n      ...Asset\n    }\n    asset {\n      ...Asset\n    }\n    end\n    link\n    start\n    banner {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment BannerItem on BannerItem {\n    id\n    mobile {\n      ...Asset\n    }\n    asset {\n      ...Asset\n    }\n    end\n    link\n    start\n    banner {\n      id\n      slug\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
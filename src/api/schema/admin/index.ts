import gql from "graphql-tag";

import { bannerAdminApiExtensions } from "./banner-admin.schema";
import { bannerItemAdminApiExtensions } from "./banner-item-admin.schema";

import { commonApiExtensions } from "../common";

export const adminApiExtensions = gql`
  ${commonApiExtensions}
  ${bannerAdminApiExtensions}
  ${bannerItemAdminApiExtensions}
`;

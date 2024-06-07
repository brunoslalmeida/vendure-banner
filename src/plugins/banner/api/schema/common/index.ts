import gql from "graphql-tag";

import { bannerAdminApiExtensions } from "./banner-admin.schema";
import { bannerItemAdminApiExtensions } from "./banner-item-admin.schema";

export const commonApiExtensions = gql`
  ${bannerAdminApiExtensions}
  ${bannerItemAdminApiExtensions}
`;

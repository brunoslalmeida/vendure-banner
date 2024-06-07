import { BannerItemCommonResolver, BannerCommonResolver } from "./common";
const commonResolver = [BannerCommonResolver, BannerItemCommonResolver];

import { BannerAdminResolver, BannerItemAdminResolver } from "./admin";

export const adminApiResolver = [
  ...commonResolver,
  BannerAdminResolver,
  BannerItemAdminResolver,
];

export const shopApiResolver = [...commonResolver];

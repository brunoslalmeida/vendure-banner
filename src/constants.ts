import { CrudPermissionDefinition } from "@vendure/core";

export const BANNER_PLUGIN_OPTIONS = Symbol("BANNER_PLUGIN_OPTIONS");
export const loggerCtx = "BannerPlugin";

export const BannerPermission = new CrudPermissionDefinition("Banner");
export const BannerItemPermission = new CrudPermissionDefinition("BannerItem");

export const permissions = [
  BannerPermission,
  BannerItemPermission,
];

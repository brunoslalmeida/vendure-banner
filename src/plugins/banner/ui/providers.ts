import { addNavMenuItem, registerBulkAction } from "@vendure/admin-ui/core";
import { DeleteBannersBulkAction } from "./bulk-actions/remove-banners";

export default [
  registerBulkAction(DeleteBannersBulkAction),
  addNavMenuItem(
    {
      id: "banner",
      label: "Banners",
      routerLink: ["/extensions/banners"],
      icon: "image-gallery",
    },
    "marketing"
  ),
];

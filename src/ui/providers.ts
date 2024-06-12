import { addNavMenuItem, registerBulkAction } from "@vendure/admin-ui/core";
import { DeleteBannersBulkAction, DeleteBannerItemsBulkAction} from "./bulk-actions";

export default [
  registerBulkAction(DeleteBannersBulkAction),
  registerBulkAction(DeleteBannerItemsBulkAction),
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

import { addNavMenuItem } from "@vendure/admin-ui/core";

export default [
  addNavMenuItem(
    {
      id: "banner",
      label: "Banners",
      routerLink: ["/extensions/banner"],
      icon: "image-gallery",
    },
    "marketing"
  ),
];

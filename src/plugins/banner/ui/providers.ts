import { addNavMenuItem } from "@vendure/admin-ui/core";

export default [
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

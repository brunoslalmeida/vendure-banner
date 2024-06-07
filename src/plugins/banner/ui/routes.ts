import { registerRouteComponent } from "@vendure/admin-ui/core";

import { BannerListComponent } from "./components/banner-list/banner-list.component";

export default [
  registerRouteComponent({
    path: "",
    component: BannerListComponent,
    breadcrumb: "Banners",
  }),
];

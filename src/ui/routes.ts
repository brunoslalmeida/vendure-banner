import { registerRouteComponent } from "@vendure/admin-ui/core";

import { BannerListComponent, BannerDetailComponent } from "./components";
import { GetBannerDocument } from "./gql/graphql";

export default [
  registerRouteComponent({
    path: "",
    component: BannerListComponent,
    breadcrumb: "Banners",
  }),
  registerRouteComponent({
    path: ":id",
    component: BannerDetailComponent,
    query: GetBannerDocument,
    entityKey: "banner",
    getBreadcrumbs: (entity) => [
      {
        label: "Banners",
        link: ["/extensions", "banners"],
      },
      {
        label: entity ? `Banner: #${entity?.slug}` : "Novo Banner",
        link: [],
      },
    ],
  }),
];

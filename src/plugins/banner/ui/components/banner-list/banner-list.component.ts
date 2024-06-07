// import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SharedModule, TypedBaseListComponent } from "@vendure/admin-ui/core";

import { GetBannersDocument } from "../../gql/graphql";

@Component({
  templateUrl: "./banner-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule],
})
export class BannerListComponent extends TypedBaseListComponent<
  typeof GetBannersDocument,
  "banners"
> {
  readonly sorts = this.createSortCollection()
    .defaultSort("id", "DESC")
    .addSort({ name: 'id' })
    .addSort({ name: 'slug' })
    .connectToRoute(this.route);

  readonly filters = this.createFilterCollection().addFilter({
    name: 'slug',
    type: { kind: 'text' },
    label: 'Slug',
    filterField: 'slug',
  }).connectToRoute(this.route);

  constructor() {
    super();
    super.configure({
      document: GetBannersDocument,
      getItems: (data) => data.banners,
      setVariables: (skip, take) => ({
        options: {
          skip,
          take,
          filter: {
            slug: {
              contains: this.searchTermControl.value ?? undefined,
            },
            ...this.filters.createFilterInput(),
          },
          sort: this.sorts.createSortInput(),
        },
      }),
      refreshListOnChanges: [
        this.filters.valueChanges,
        this.sorts.valueChanges,
      ],
    });
  }
}

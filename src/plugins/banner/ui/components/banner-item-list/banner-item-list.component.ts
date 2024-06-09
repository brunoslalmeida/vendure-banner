import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  DataService,
  SharedModule,
  NotificationService,
  TypedBaseListComponent,
} from "@vendure/admin-ui/core";
import {
  BannerItem,
  GetBannerItemsDocument,
  UpdateBannerItemDocument,
  UpdateBannerItemInput,
} from "../../gql/graphql";
import { Observable } from "rxjs";
import { marker as t } from "@biesbjerg/ngx-translate-extract-marker";

import { TruncatePipe } from "../../common/truncate";

@Component({
  standalone: true,
  selector: "banner-item-list",
  styleUrls: ["./banner-item-list.component.scss"],
  templateUrl: "./banner-item-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, CommonModule, TruncatePipe],
})
export class BannerItemListComponent
  extends TypedBaseListComponent<typeof GetBannerItemsDocument, "bannerItems">
  implements OnInit, OnDestroy
{
  @Input() id: string;
  @Input() update: EventEmitter<void>;
  @Output() edit = new EventEmitter<BannerItem>();

  ngOnInit() {
    super.ngOnInit();
    this.update.subscribe({
      next: () => {
        this.refresh();
      },
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.update) this.update.unsubscribe();
  }

  readonly filters = this.createFilterCollection()
    .addFilter({
      name: "start",
      type: { kind: "dateRange" },
      label: t("banner.start-at"),
      filterField: "start",
    })
    .addFilter({
      name: "end",
      type: { kind: "dateRange" },
      label: t("banner.end-at"),
      filterField: "end",
    })
    .addFilter({
      name: "link",
      type: { kind: "text" },
      label: "Link",
      filterField: "link",
    })
    .connectToRoute(this.route);

  readonly sorts = this.createSortCollection()
    .defaultSort("id", "DESC")
    .addSort({ name: "start" })
    .addSort({ name: "end" })
    .addSort({ name: "link" })
    .connectToRoute(this.route);

  constructor(
    protected dataService: DataService,
    protected notificationService: NotificationService
  ) {
    super();

    const refreshListOnChanges: Array<Observable<any>> = [
      this.filters.valueChanges,
      this.sorts.valueChanges,
    ];

    super.configure({
      document: GetBannerItemsDocument,
      getItems: (data) => data.bannerItems,
      setVariables: (skip, take) => ({
        options: {
          skip,
          take,
          filter: { ...this.filters.createFilterInput() },
          sort: this.sorts.createSortInput(),
        },
        banner: this.id ?? "",
      }),
      refreshListOnChanges,
    });
  }
  expireItem(item: BannerItem) {
    var date = new Date();
    date.setDate(date.getDate() - 1);

    const input: UpdateBannerItemInput = {
      asset: item.asset.id,
      banner: item.banner.id,
      id: item.id,
      link: item.link,
      start: "" + new Date(item.start).toISOString(),
      end: "" +  date.toISOString(),
      mobile: item.mobile?.id,
    };

    console.log;

    this.dataService.mutate(UpdateBannerItemDocument, { input }).subscribe({
      next: () => {
        this.notificationService.success("banner.messages.banner-item-expired-success");
        this.refresh();
      },
      error: () => {
        this.notificationService.success("banner.messages.banner-item-expired-failure");
      },
    });
  }
  editItem(item: BannerItem) {
    this.edit.emit(item);
  }
}

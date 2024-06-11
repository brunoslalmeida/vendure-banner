import {
  OnInit,
  OnDestroy,
  Component,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  DataService,
  SharedModule,
  NotificationService,
  TypedBaseDetailComponent,
} from "@vendure/admin-ui/core";

import {
  Asset,
  BannerItem,
  CreateBannerDocument,
  CreateBannerInput,
  CreateBannerItemDocument,
  CreateBannerItemInput,
  GetBannerDocument,
  GetBannerQuery,
  UpdateBannerDocument,
  UpdateBannerItemDocument,
} from "../../gql/graphql";

import { BannerItemListComponent } from "../banner-item-list/banner-item-list.component";
import { ImagePickerListComponent } from "../../common";
@Component({
  selector: "banner-detail.component",
  templateUrl: "banner-detail.component.html",
  styleUrls: ["banner-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule, BannerItemListComponent, ImagePickerListComponent],
})
export class BannerDetailComponent
  extends TypedBaseDetailComponent<typeof GetBannerDocument, "banner">
  implements OnInit, OnDestroy
{
  item: BannerItem | undefined;
  asset: Asset[] = [];
  mobile: Asset[] = [];

  detailForm = this.formBuilder.group({
    id: "",
    slug: ["", Validators.required],
  });

  itemsForm = this.formBuilder.group({
    id: "",
    end: "",
    start: ["", Validators.required],
    link: ["", Validators.required],
    mobile: "",
    asset: ["", Validators.required],
  });

  onHttpRequest = false;
  //clear image selection
  clear: EventEmitter<void> = new EventEmitter<void>();
  //update banner-item list
  update: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    protected dataService: DataService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    super();
  }

  saveItem() {
    if (this.hideSubmit(this.itemsForm)) return;

    this.onHttpRequest = true;
    const { id, asset, mobile, end, link, start } = this.itemsForm.value;

    if (!asset || !link || !start) return;

    let input: CreateBannerItemInput = {
      asset,
      link,
      mobile: mobile ? mobile : undefined,
      end: end ? end : undefined,
      start: start,
      banner: this.id,
    };

    if (id === "" || !id) {
      this.dataService.mutate(CreateBannerItemDocument, { input }).subscribe({
        next: () =>
          this.afterSuccess("banner.messages.banner-item-created-success", true),
        error: this.afterFailure,
      });
    } else {
      this.dataService
        .mutate(UpdateBannerItemDocument, { input: { ...input, id } })
        .subscribe({
          next: () =>
            this.afterSuccess(
              "banner.messages.banner-item-updated-success",
              true
            ),
          error: this.afterFailure,
        });
    }
  }

  clearItemForm() {
    this.item = undefined;

    this.itemsForm.patchValue({
      id: "",
      end: "",
      start: "",
      link: "",
    });

    this.asset = [];
    this.mobile = [];

    this.itemsForm.markAsPristine();
    this.changeDetector.markForCheck();

    this.clear.emit();
  }

  setFormValues(entity: NonNullable<GetBannerQuery["banner"]>): void {
    this.detailForm.patchValue({
      id: entity.id,
      slug: entity.slug,
    });
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  ngOnInit(): void {
    this.init();
  }

  saveBanner() {
    if (this.hideSubmit(this.detailForm)) return;

    this.onHttpRequest = true;
    const { id, slug } = this.detailForm.value;

    if (!slug) return;
    const input: CreateBannerInput = {
      slug,
    };

    if (id === "" || !id) {
      this.dataService.mutate(CreateBannerDocument, { input }).subscribe({
        next: (result) => {
          this.afterSuccess("banner.messages.banner-created-success");
          this.router.navigate(["../", result.createBanner.id], {
            relativeTo: this.route,
          });
        },
        error: this.afterFailure,
      });
    } else {
      this.dataService
        .mutate(UpdateBannerDocument, { input: { ...input, id } })
        .subscribe({
          next: () =>
            this.afterSuccess("banner.messages.banner-updated-success"),
          error: this.afterFailure,
        });
    }
  }

  editItem(item: BannerItem) {
    this.item = item;

    this.itemsForm.patchValue({
      id: this.item.id,
      link: this.item.link,
      start: this.item.start,
      end: this.item.end,
      asset: this.item.asset.id,
    });

    if (item.mobile) this.itemsForm.controls.mobile.setValue(item.mobile.id);

    this.asset = [item.asset];
    this.mobile = item.mobile ? [item.mobile] : [];

    this.itemsForm.markAsDirty();
    this.changeDetector.markForCheck();
  }

  afterSuccess(message: string, clear: boolean = false) {
    this.onHttpRequest = false;
    if (clear) this.clearItemForm();

    this.notificationService.success(message);
    this.update.emit(); 
  }

  afterFailure(err: { message: string }) {
    this.onHttpRequest = false;
    this.notificationService.error(err.message);
  }

  hideSubmit(form: FormGroup<any>) {
    return form.invalid || form.pristine || this.onHttpRequest;
  }

  onAsset(assets: Asset[]) {
    this.itemsForm.controls.asset.setValue(
      assets.length > 0 ? assets[0].id : ""
    );
    this.itemsForm.controls.asset.markAsDirty();
    this.changeDetector.markForCheck();
  }

  onMobile(assets: Asset[]) {
    this.itemsForm.controls.mobile.setValue(
      assets.length > 0 ? assets[0].id : ""
    );
    this.itemsForm.controls.mobile.markAsDirty();
    this.changeDetector.markForCheck();
  }
}

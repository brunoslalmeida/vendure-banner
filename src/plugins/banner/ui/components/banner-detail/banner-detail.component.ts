import {
  OnInit,
  OnDestroy,
  Component,
  EventEmitter,   
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
  CreateBannerDocument,
  CreateBannerInput,
  GetBannerDocument,
  GetBannerQuery,
  UpdateBannerDocument,
} from "../../gql/graphql";
import { BannerItemListComponent } from "../banner-item-list/banner-item-list.component";

@Component({
  selector: "banner-detail.component",
  templateUrl: "banner-detail.component.html",
  styleUrls: ["banner-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule, BannerItemListComponent],
})
export class BannerDetailComponent
  extends TypedBaseDetailComponent<typeof GetBannerDocument, "banner">
  implements OnInit, OnDestroy
{
  detailForm = this.formBuilder.group({
    id: "",
    slug: ["", Validators.required],
  });

  onHttpRequest = false;
  update: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    protected dataService: DataService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();
  }

  setFormValues(entity: NonNullable<GetBannerQuery["banner"]>): void {
    this.detailForm.patchValue({
      id: entity.id,
      slug: entity.slug,
    });
  }

  getObjectKeys(arg: Object) {
    if (!arg) return [];
    return Object.keys(arg);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  ngOnInit(): void {
    this.init();
  }

  save() {
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
          next: () => this.afterSuccess("banner.messages.banner-updated-success"),
          error: this.afterFailure,
        });
    }
  }

  afterSuccess(message: string, clear: boolean = false) {
    this.onHttpRequest = false;
    this.notificationService.success(message);
  }

  afterFailure(err: { message: string }) {
    this.onHttpRequest = false;
    this.notificationService.error(err.message);
  }

  hideSubmit(form: FormGroup<any>) {
    return form.invalid || form.pristine || this.onHttpRequest;
  }
}

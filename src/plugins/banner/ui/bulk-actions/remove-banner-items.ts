import { marker as t } from "@biesbjerg/ngx-translate-extract-marker";

import {
  ItemOf,
  DataService,
  BulkAction,
  ModalService,
  NotificationService,
} from "@vendure/admin-ui/core";

import { EMPTY } from "rxjs";
import { switchMap } from "rxjs/operators";

import {
  GetBannerItemsQuery,
  DeleteBannerItemsDocument,
  DeletionResult,
} from "../gql/graphql";
import { BannerListComponent } from "./../components/banner-list/banner-list.component";

export const DeleteBannerItemsBulkAction: BulkAction<
  ItemOf<GetBannerItemsQuery, "bannerItems">,
  BannerListComponent
> = {
  location: "banner-item-list",
  label: t("banner.messages.remove-banner-item"),
  icon: "trash",
  iconClass: "is-danger",
  requiresPermission: (userPermissions) =>
    userPermissions.includes("UpdateBannerItem"),
  onClick: ({ injector, selection, clearSelection, hostComponent }) => {
    const modalService = injector.get(ModalService);
    const dataService = injector.get(DataService);
    const notificationService = injector.get(NotificationService);
    modalService
      .dialog({
        title: t("banner.messages.confirm-bulk-delete-banner-items"),
        translationVars: {
          count: selection.length,
        },
        buttons: [
          { type: "secondary", label: t("common.cancel") },
          { type: "danger", label: t("common.delete"), returnValue: true },
        ],
      })
      .pipe(
        switchMap((response) =>
          response
            ? dataService.mutate(DeleteBannerItemsDocument, {
                input: selection.map((e) => e.id),
              })
            : EMPTY
        )
      )
      .subscribe((result) => {
        const deleted = result.deleteBannerItems;
        const errors: string[] = [];

        if (deleted.result === DeletionResult.DELETED) {
          notificationService.success(
            t("banner.messages.notify-bulk-delete-banner-item-success"),
            {
              count: Number.parseInt("" + deleted.message),
            }
          );
        } else {
          notificationService.error("banner.messages.generic-error");
        }

        hostComponent.refresh();
        clearSelection();
      });
  },
};

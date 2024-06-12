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
  DeletionResult,
  GetBannersQuery,
  DeleteBannersDocument,
} from "../gql/graphql";
import { BannerListComponent } from "../components/banner-list/banner-list.component";

export const DeleteBannersBulkAction: BulkAction<
  ItemOf<GetBannersQuery, "banners">,
  BannerListComponent
> = {
  location: "banner-list",
  label: t("banner.messages.remove-banner"),
  icon: "trash",
  iconClass: "is-danger",
  requiresPermission: (userPermissions) =>
    userPermissions.includes("UpdateBanner"),
  onClick: ({ injector, selection, clearSelection, hostComponent }) => {
    const modalService = injector.get(ModalService);
    const dataService = injector.get(DataService);
    const notificationService = injector.get(NotificationService);
    modalService
      .dialog({
        title: t("banner.messages.confirm-bulk-delete-banners"),
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
            ? dataService.mutate(DeleteBannersDocument, {
                input: selection.map((e) => e.id),
              })
            : EMPTY
        )
      )
      .subscribe((result) => {
        const deleted = result.deleteBanners;

        if (deleted.result === DeletionResult.DELETED) {
          notificationService.success(
            t("banner.messages.notify-bulk-delete-banner-success"),
            {
              count: Number.parseInt("" + deleted.message),
            }
          );
        } else {
          if (!deleted.message) {
            notificationService.error("banner.messages.generic-error");
          } else if (deleted.message?.includes("FOREIGN KEY constraint failed")) {
            notificationService.error("banner.messages.error-contais-banner-item");
          }
        }

        hostComponent.refresh();
        clearSelection();
      });
  },
};

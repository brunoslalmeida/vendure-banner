import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DeletionResponse } from "@vendure/common/lib/generated-types";
import { Allow, Ctx, ID, RequestContext, Transaction } from "@vendure/core";
import { BannerItem } from "../../../entities";
import { BannerItemService } from "../../../services/banner-item.service";
import { BannerItemPermission } from "../../../constants";
import {
  CreateBannerItemInput,
  UpdateBannerItemInput,
} from "../../../generated/generated-admin-types";

@Resolver()
export class BannerItemAdminResolver {
  constructor(private bannerItemService: BannerItemService) {}

  @Mutation()
  @Transaction()
  @Allow(BannerItemPermission.Create)
  async createBannerItem(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: CreateBannerItemInput }
  ): Promise<BannerItem> {
    return this.bannerItemService.create(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerItemPermission.Update)
  async updateBannerItem(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: UpdateBannerItemInput }
  ): Promise<BannerItem> {
    return this.bannerItemService.update(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerItemPermission.Delete)
  async deleteBannerItem(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID }
  ): Promise<DeletionResponse> {
    return this.bannerItemService.delete(ctx, args.id);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerItemPermission.Delete)
  async deleteBannerItems(
    @Ctx() ctx: RequestContext,
    @Args() args: { ids: ID[] }
  ): Promise<DeletionResponse> {
    return this.bannerItemService.deleteMultiple(ctx, args.ids);
  }
}

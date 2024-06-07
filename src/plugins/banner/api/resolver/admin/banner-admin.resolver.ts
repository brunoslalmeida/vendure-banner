import { Args, Mutation, Resolver } from "@nestjs/graphql";
import {
  DeletionResponse,
} from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  ID,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { Banner } from "../../../entities";
import { BannerService } from "../../../services/banner.service";
import { BannerPermission } from "../../../constants";
import { CreateBannerInput, UpdateBannerInput } from "src/generated/generated-admin-types";

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Mutation()
  @Transaction()
  @Allow(BannerPermission.Create)
  async createBanner(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: CreateBannerInput }
  ): Promise<Banner> {
    return this.bannerService.create(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerPermission.Update)
  async updateBanner(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: UpdateBannerInput }
  ): Promise<Banner> {
    return this.bannerService.update(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerPermission.Delete)
  async deleteBanner(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID }
  ): Promise<DeletionResponse> {
    return this.bannerService.delete(ctx, args.id);
  }

  @Mutation()
  @Transaction()
  @Allow(BannerPermission.Delete)
  async deleteBanners(
    @Ctx() ctx: RequestContext,
    @Args() args: { ids: [ID] }
  ): Promise<DeletionResponse> {
    return this.bannerService.deleteMultiple(ctx, args.ids);
  }
}

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
  TranslationInput,
} from "@vendure/core";
import { Banner } from "../../../entities";
import { BannerService } from "../../../services/banner.service";
import { BannerPermission } from "../../../constants";

// These can be replaced by generated types if you set up code generation
interface CreateBannerInput {
  code: string;
  // Define the input fields here
  translations: Array<TranslationInput<Banner>>;
}
interface UpdateBannerInput {
  id: ID;
  code?: string;
  // Define the input fields here
  translations: Array<TranslationInput<Banner>>;
}

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
}

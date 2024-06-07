import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  DeletionResponse,
  Permission,
} from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  ID,
  ListQueryOptions,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
  Transaction,
  TranslationInput,
} from "@vendure/core";
import { BannerItem } from "../../../entities";
import { BannerItemService } from "../../../services/banner-item.service";
import { BannerItemPermission } from "../../../constants";

// These can be replaced by generated types if you set up code generation
interface CreateBannerItemInput {
  code: string;
  start: Date;
  end?: Date;
  link: string;
  // Define the input fields here
  translations: Array<TranslationInput<BannerItem>>;
}
interface UpdateBannerItemInput {
  id: ID;
  code?: string;
  start?: Date;
  end?: Date;
  link?: string;
  // Define the input fields here
  translations: Array<TranslationInput<BannerItem>>;
}

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
}

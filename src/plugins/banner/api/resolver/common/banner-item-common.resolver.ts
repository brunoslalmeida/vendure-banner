import { Args, Query, Resolver } from "@nestjs/graphql";
import {
  Ctx,
  ID,
  ListQueryOptions,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
} from "@vendure/core";
import { BannerItem } from "../../../entities";
import { BannerItemService } from "../../../services/banner-item.service";


@Resolver()
export class BannerItemCommonResolver {
  constructor(private bannerItemService: BannerItemService) {}

  @Query()
  async bannerItem(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID },
    @Relations(BannerItem) relations: RelationPaths<BannerItem>
  ): Promise<BannerItem | null> {
    return this.bannerItemService.findOne(ctx, args.id, relations);
  }

  @Query()
  async bannerItems(
    @Ctx() ctx: RequestContext,
    @Args() args: { options: ListQueryOptions<BannerItem> },
    @Relations(BannerItem) relations: RelationPaths<BannerItem>
  ): Promise<PaginatedList<BannerItem>> {
    return this.bannerItemService.findAll(
      ctx,
      args.options || undefined,
      relations
    );
  }
  
  @Query()
  async bannerItemsFromBanner(
    @Ctx() ctx: RequestContext,
    @Args() args: { banner: ID, options: ListQueryOptions<BannerItem> },
    @Relations(BannerItem) relations: RelationPaths<BannerItem>
  ): Promise<PaginatedList<BannerItem>> {
    return this.bannerItemService.findAllFromBanner(
      ctx,
      args.banner,
      args.options || undefined,
      relations
    );
  }  
}

import { Args, Query, Resolver } from "@nestjs/graphql";
import {
  Ctx,
  ID,
  ListQueryOptions,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
  TranslationInput,
} from "@vendure/core";
import { Banner } from "../../../entities";
import { BannerService } from "../../../services/banner.service";

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
export class BannerCommonResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  async banner(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID },
    @Relations(Banner) relations: RelationPaths<Banner>
  ): Promise<Banner | null> {
    return this.bannerService.findOne(ctx, args.id, relations);
  }

  @Query()
  async banners(
    @Ctx() ctx: RequestContext,
    @Args() args: { options: ListQueryOptions<Banner> },
    @Relations(Banner) relations: RelationPaths<Banner>
  ): Promise<PaginatedList<Banner>> {
    return this.bannerService.findAll(
      ctx,
      args.options || undefined,
      relations
    );
  }
}

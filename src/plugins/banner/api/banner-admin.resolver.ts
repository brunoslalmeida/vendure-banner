import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeletionResponse, Permission } from '@vendure/common/lib/generated-types';
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
    TranslationInput
} from '@vendure/core';
import { Banner } from '../entities/banner.entity';
import { BannerService } from '../services/banner.service';

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

    @Query()
    @Allow(Permission.SuperAdmin)
    async banner(
        @Ctx() ctx: RequestContext,
        @Args() args: { id: ID },
        @Relations(Banner) relations: RelationPaths<Banner>,
    ): Promise<Banner | null> {
        return this.bannerService.findOne(ctx, args.id, relations);
    }

    @Query()
    @Allow(Permission.SuperAdmin)
    async banners(
        @Ctx() ctx: RequestContext,
        @Args() args: { options: ListQueryOptions<Banner> },
        @Relations(Banner) relations: RelationPaths<Banner>,
    ): Promise<PaginatedList<Banner>> {
        return this.bannerService.findAll(ctx, args.options || undefined, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async createBanner(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: CreateBannerInput },
    ): Promise<Banner> {
        return this.bannerService.create(ctx, args.input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async updateBanner(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: UpdateBannerInput },
    ): Promise<Banner> {
        return this.bannerService.update(ctx, args.input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async deleteBanner(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<DeletionResponse> {
        return this.bannerService.delete(ctx, args.id);
    }
}

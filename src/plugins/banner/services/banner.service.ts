import { Inject, Injectable } from '@nestjs/common';
import { DeletionResponse, DeletionResult } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {
    ListQueryBuilder,
    ListQueryOptions,
    RelationPaths,
    RequestContext,
    TransactionalConnection,
    TranslatableSaver,
    Translated,
    TranslationInput,
    TranslatorService,
    assertFound
} from '@vendure/core';
import { BANNER_PLUGIN_OPTIONS } from '../constants';
import { BannerTranslation } from '../entities/banner-translation.entity';
import { Banner } from '../entities/banner.entity';
import { PluginInitOptions } from '../types';

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

@Injectable()
export class BannerService {
    constructor(
        private connection: TransactionalConnection,
        private translatableSaver: TranslatableSaver,
        private listQueryBuilder: ListQueryBuilder,
        private translator: TranslatorService, @Inject(BANNER_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) {}

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Banner>,
        relations?: RelationPaths<Banner>,
    ): Promise<PaginatedList<Translated<Banner>>> {
        return this.listQueryBuilder
            .build(Banner, options, {
                relations,
                ctx,
            }
            ).getManyAndCount().then(([items, totalItems]) => {
                return {
                    items: items.map(item => this.translator.translate(item, ctx)),
                    totalItems,
                }
            }
            );
    }

    findOne(
        ctx: RequestContext,
        id: ID,
        relations?: RelationPaths<Banner>,
    ): Promise<Translated<Banner> | null> {
        return this.connection
            .getRepository(ctx, Banner)
            .findOne({
                where: { id },
                relations,
            }).then(entity => entity && this.translator.translate(entity, ctx));
    }

    async create(ctx: RequestContext, input: CreateBannerInput): Promise<Translated<Banner>> {
        const newEntity = await this.translatableSaver.create({
            ctx,
            input,
            entityType: Banner,
            translationType: BannerTranslation,
            beforeSave: async f => {
                // Any pre-save logic can go here
            },
        });
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateBannerInput): Promise<Translated<Banner>> {
        const updatedEntity = await this.translatableSaver.update({
            ctx,
            input,
            entityType: Banner,
            translationType: BannerTranslation,
            beforeSave: async f => {
                // Any pre-save logic can go here
            },
        });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, Banner, id);
        try {
            await this.connection.getRepository(ctx, Banner).remove(entity);
            return {
                result: DeletionResult.DELETED,
            };
        } catch (e: any) {
            return {
                result: DeletionResult.NOT_DELETED,
                message: e.toString(),
            };
        }
    }
}

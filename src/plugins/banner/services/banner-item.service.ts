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
import { BannerItemTranslation } from '../entities/banner-item-translation.entity';
import { BannerItem } from '../entities/banner-item.entity';
import { PluginInitOptions } from '../types';

// These can be replaced by generated types if you set up code generation
interface CreateBannerItemInput {
    code: string;
    // Define the input fields here
    translations: Array<TranslationInput<BannerItem>>;
}
interface UpdateBannerItemInput {
    id: ID;
    code?: string;
    // Define the input fields here
    translations: Array<TranslationInput<BannerItem>>;
}

@Injectable()
export class BannerItemService {
    constructor(
        private connection: TransactionalConnection,
        private translatableSaver: TranslatableSaver,
        private listQueryBuilder: ListQueryBuilder,
        private translator: TranslatorService, @Inject(BANNER_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) {}

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<BannerItem>,
        relations?: RelationPaths<BannerItem>,
    ): Promise<PaginatedList<Translated<BannerItem>>> {
        return this.listQueryBuilder
            .build(BannerItem, options, {
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
        relations?: RelationPaths<BannerItem>,
    ): Promise<Translated<BannerItem> | null> {
        return this.connection
            .getRepository(ctx, BannerItem)
            .findOne({
                where: { id },
                relations,
            }).then(entity => entity && this.translator.translate(entity, ctx));
    }

    async create(ctx: RequestContext, input: CreateBannerItemInput): Promise<Translated<BannerItem>> {
        const newEntity = await this.translatableSaver.create({
            ctx,
            input,
            entityType: BannerItem,
            translationType: BannerItemTranslation,
            beforeSave: async f => {
                // Any pre-save logic can go here
            },
        });
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateBannerItemInput): Promise<Translated<BannerItem>> {
        const updatedEntity = await this.translatableSaver.update({
            ctx,
            input,
            entityType: BannerItem,
            translationType: BannerItemTranslation,
            beforeSave: async f => {
                // Any pre-save logic can go here
            },
        });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, BannerItem, id);
        try {
            await this.connection.getRepository(ctx, BannerItem).remove(entity);
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

import { Inject, Injectable } from "@nestjs/common";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import { ID, PaginatedList } from "@vendure/common/lib/shared-types";
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
  assertFound,
} from "@vendure/core";
import { BANNER_PLUGIN_OPTIONS } from "../constants";
import { Banner } from "../entities/banner.entity";
import { PluginInitOptions } from "../types";

// These can be replaced by generated types if you set up code generation
interface CreateBannerInput {
  slug: string;
}
interface UpdateBannerInput {
  id: ID;
  slug?: string;
}

@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatableSaver: TranslatableSaver,
    private listQueryBuilder: ListQueryBuilder,
    @Inject(BANNER_PLUGIN_OPTIONS) private options: PluginInitOptions
  ) {}

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Banner>,
    relations?: RelationPaths<Banner>
  ): Promise<PaginatedList<Banner>> {
    return this.listQueryBuilder
      .build(Banner, options, {
        relations,
        ctx,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items: items,
          totalItems,
        };
      });
  }

  findOne(
    ctx: RequestContext,
    id: ID,
    relations?: RelationPaths<Banner>
  ): Promise<Banner | null> {
    return this.connection.getRepository(ctx, Banner).findOne({
      where: { id },
      relations,
    });
  }

  async create(ctx: RequestContext, input: CreateBannerInput): Promise<Banner> {
    const newEntity = await this.connection.getRepository(ctx, Banner).save(input);
    return await assertFound(this.findOne(ctx, newEntity.id));
  }

  async update(ctx: RequestContext, input: UpdateBannerInput): Promise<Banner> {
    const updatedEntity = await this.connection
      .getRepository(ctx, Banner)
      .update(input.id, input);
    return assertFound(this.findOne(ctx, input.id));
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

  async deleteMultiple(
    ctx: RequestContext,
    ids: ID[]
  ): Promise<DeletionResponse> {
    const entities = await this.findAll(ctx, {
      filter: {
        id: {
          in: <string[]>ids,
        },
      },
    });

    try {
      const result = await this.connection
        .getRepository(ctx, Banner)
        .remove(entities.items);
      return {
        result: DeletionResult.DELETED,
        message: "result.length",
      };
    } catch (e: any) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }
}

import { Injectable } from "@nestjs/common";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import { ID, PaginatedList } from "@vendure/common/lib/shared-types";
import {
  Asset,
  ListQueryBuilder,
  ListQueryOptions,
  RelationPaths,
  RequestContext,
  TransactionalConnection,
  assertFound,
} from "@vendure/core";
import { BannerItem } from "../entities/banner-item.entity";
import { Banner } from "../entities";
import {
  CreateBannerItemInput,
  UpdateBannerItemInput,
} from "../generated/generated-admin-types";

@Injectable()
export class BannerItemService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  async findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<BannerItem>,
    relations?: RelationPaths<BannerItem>
  ): Promise<PaginatedList<BannerItem>> {
    const [items, totalItems] = await this.listQueryBuilder
      .build(BannerItem, options, {
        relations,
        ctx,
      })
      .getManyAndCount();
    return {
      items,
      totalItems,
    };
  }

  async findAllFromBanner(
    ctx: RequestContext,
    banner: ID,
    options?: ListQueryOptions<BannerItem>,
    relations?: RelationPaths<BannerItem>
  ): Promise<PaginatedList<BannerItem>> {
    const [items, totalItems] = await this.listQueryBuilder
      .build(BannerItem, options, {
        relations,
        ctx,
        where: {
          banner: {
            id: banner,
          },
        },
      })
      .getManyAndCount();
    return {
      items,
      totalItems,
    };
  }

  findOne(
    ctx: RequestContext,
    id: ID,
    relations?: RelationPaths<BannerItem>
  ): Promise<BannerItem | null> {
    return this.connection.getRepository(ctx, BannerItem).findOne({
      where: { id },
      relations,
    });
  }

  async generateItem(
    ctx: RequestContext,
    input: CreateBannerItemInput & { id?: string }
  ) {
    const { link, start, end } = input;

    const _end = end ? new Date(end) : null;
    const _start = new Date(start);

    let item: BannerItem;

    if (input.id) {
      item = await this.connection.getEntityOrThrow(ctx, BannerItem, input.id);
      item.end = _end;
      item.link = link;
      item.start = _start;
    } else {
      item = new BannerItem({ link, start: _start, end: _end });
    }

    item.mobile = input.mobile
      ? await this.connection.getEntityOrThrow(ctx, Asset, input.mobile)
      : null;

    item.asset = await this.connection.getEntityOrThrow(
      ctx,
      Asset,
      input.asset
    );

    item.banner = await this.connection.getEntityOrThrow(
      ctx,
      Banner,
      input.banner
    );
    return item;
  }
  async create(
    ctx: RequestContext,
    input: CreateBannerItemInput
  ): Promise<BannerItem> {
    const item = await this.generateItem(ctx, input);
    const newEntity = await this.connection
      .getRepository(ctx, BannerItem)
      .save(item);

    return assertFound(
      this.findOne(ctx, newEntity.id, ["asset", "banner", "mobile"])
    );
  }

  async update(
    ctx: RequestContext,
    input: UpdateBannerItemInput
  ): Promise<BannerItem> {
    const item = await this.generateItem(ctx, input);
    const updatedEntity = await this.connection
      .getRepository(ctx, BannerItem)
      .update(item.id, item);
    return assertFound(
      this.findOne(ctx, item.id, ["asset", "mobile", "banner"])
    );
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
        .getRepository(ctx, BannerItem)
        .remove(entities.items);
      return {
        result: DeletionResult.DELETED,
        message: "" + result.length,
      };
    } catch (e: any) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }
}

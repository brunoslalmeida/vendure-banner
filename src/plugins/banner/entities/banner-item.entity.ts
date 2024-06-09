import { Asset, DeepPartial, VendureEntity } from "@vendure/core";
import { Column, Entity, ManyToOne, Index } from "typeorm";

import { Banner } from ".";

@Entity()
export class BannerItem extends VendureEntity {
  constructor(input?: DeepPartial<BannerItem>) {
    super(input);
  }

  @ManyToOne(() => Asset)
  asset: Asset;

  @ManyToOne(() => Asset, { onDelete: "SET NULL", nullable: true })
  mobile?: Asset | null;

  @Index()
  @ManyToOne(() => Banner, (banner) => banner.items)
  banner: Banner;

  @Column({ nullable: false })
  start: Date;

  @Column({ nullable: true, default: null })
  end?: Date;

  @Column({ nullable: false })
  link: string;
}

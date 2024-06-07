import {
  Asset,
  DeepPartial,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, ManyToOne, JoinTable } from "typeorm";

import { Banner } from ".";

@Entity()
export class BannerItem extends VendureEntity  {
  constructor(input?: DeepPartial<BannerItem>) {
    super(input);
  }
  @ManyToOne(() => Asset)
  @JoinTable()
  asset: Asset;

  @ManyToOne(() => Asset)
  @JoinTable()
  mobile: Asset | null;

  @ManyToOne(() => Banner)
  @JoinTable()
  banner: Banner;

  @Column({ nullable: false })
  start: Date;

  @Column({ nullable: true, default: null })
  end?: Date;

  @Column({ nullable: false })
  link: string;
}

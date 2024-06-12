import {
  DeepPartial,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany, JoinTable } from "typeorm";

import { BannerItem } from "./banner-item.entity";

@Entity()
export class Banner extends VendureEntity  {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column({ nullable: false, unique: true })
  slug!: string;

  @OneToMany(() => BannerItem, (entity) => entity.banner)
  items!: BannerItem[];
}

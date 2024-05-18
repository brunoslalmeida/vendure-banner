import {
  ID,
  Asset,
  DeepPartial,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany, ManyToOne, JoinTable } from "typeorm";

import { BannerItemTranslation } from "./banner-item-translation.entity";
import { Banner } from "./banner.entity";

@Entity()
export class BannerItem extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<BannerItem>) {
    super(input);
  }

  @Column()
  code: string;
  localizedName: LocaleString;

  @OneToMany(
    (type) => BannerItemTranslation,
    (translation) => translation.base,
    { eager: true }
  )
  translations: Array<Translation<BannerItem>>;

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

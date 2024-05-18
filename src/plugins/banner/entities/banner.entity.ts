import {
  DeepPartial,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany, JoinTable } from "typeorm";

import { BannerTranslation } from "./banner-translation.entity";
import { BannerItem } from "./banner-item.entity";

@Entity()
export class Banner extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column()
  code: string;
  localizedName: LocaleString;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Banner>>;

  @Column({ nullable: false, unique: true })
  slug: string;

  @OneToMany(() => BannerItem, (entity) => entity.banner)
  @JoinTable()
  items: BannerItem[];
}

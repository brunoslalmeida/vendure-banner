import {
  DeepPartial,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany } from "typeorm";

import { BannerItemTranslation } from "./banner-item-translation.entity";

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
}

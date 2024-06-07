import { LanguageCode } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { Translation, VendureEntity } from '@vendure/core';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { BannerItem } from '.';

@Entity()
export class BannerItemTranslation
    extends VendureEntity
    implements Translation<BannerItem>
{
    constructor(input?: DeepPartial<Translation<BannerItemTranslation>>) {
        super(input);
    }

    @Column('varchar') languageCode: LanguageCode;

    @Column() localizedName: string;

    @Index()
    @ManyToOne(type => BannerItem, base => base.translations, { onDelete: 'CASCADE' })
    base: BannerItem;
}

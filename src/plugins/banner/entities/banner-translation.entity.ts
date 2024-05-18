import { LanguageCode } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { Translation, VendureEntity } from '@vendure/core';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { Banner } from './banner.entity';

@Entity()
export class BannerTranslation
    extends VendureEntity
    implements Translation<Banner>
{
    constructor(input?: DeepPartial<Translation<BannerTranslation>>) {
        super(input);
    }

    @Column('varchar') languageCode: LanguageCode;

    @Column() localizedName: string;

    @Index()
    @ManyToOne(type => Banner, base => base.translations, { onDelete: 'CASCADE' })
    base: Banner;
}

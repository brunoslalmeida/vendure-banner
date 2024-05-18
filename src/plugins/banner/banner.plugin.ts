import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { BANNER_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
import { Banner } from './entities/banner.entity';
import { BannerTranslation } from './entities/banner-translation.entity';
import { BannerItem } from './entities/banner-item.entity';
import { BannerItemTranslation } from './entities/banner-item-translation.entity';
import { BannerService } from './services/banner.service';
import { BannerItemService } from './services/banner-item.service';
import { BannerAdminResolver } from './api/banner-admin.resolver';
import { adminApiExtensions } from './api/api-extensions';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: BANNER_PLUGIN_OPTIONS, useFactory: () => BannerPlugin.options }, BannerService, BannerItemService],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^2.0.0',
    entities: [Banner, BannerTranslation, BannerItem, BannerItemTranslation],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [BannerAdminResolver]
    },
})
export class BannerPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<BannerPlugin> {
        this.options = options;
        return BannerPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'banner-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'banner', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}

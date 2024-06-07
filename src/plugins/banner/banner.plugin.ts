import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { BANNER_PLUGIN_OPTIONS, permissions } from './constants';
import { PluginInitOptions } from './types';

import { BannerService } from './services/banner.service';
import { BannerItemService } from './services/banner-item.service';
import { adminApiExtensions, shopApiExtensions, adminApiResolver, shopApiResolver} from './api';

import {Banner, BannerItem, BannerItemTranslation, BannerTranslation} from './entities'

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: BANNER_PLUGIN_OPTIONS, useFactory: () => BannerPlugin.options }, BannerService, BannerItemService],
    configuration: config => {
        config.authOptions.customPermissions.push(...permissions)
        return config;
    },
    compatibility: '^2.0.0',
    entities: [Banner, BannerTranslation, BannerItem, BannerItemTranslation],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: adminApiResolver
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: shopApiResolver
    }
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

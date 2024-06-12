# Vendure Banner Plugin

This plugin allows you to create Banners to your 

## Getting started
``` shell
npm i @vendure-osct/banner-plugin
```
1. Add the plugin to your `vendure-config.ts`:

```ts
    ...
     plugins: [
      BannerPlugin,
      AdminUiPlugin.init({
        port: 3002,
        route: 'admin',
        app: compileUiExtensions({
          outputPath: path.join(__dirname, '__admin-ui'),
          extensions: [BannerPlugin.ui],
        }),
      }),
    ...
     ]
     ...
```

2. Run a DB migration to add the new custom fields: https://docs.vendure.io/guides/developer-guide/migrations/#migration-workflow
3. Start the server and login to the admin UI and go to `banners`
4. On the Banner List page, click `Create Banner`
5. Add slug and save
6. Add new itens
7. You should the list of items for your banner.

There are two ways to query your banners:

```gql
query Banners($options: BannerListOptions) {
  banners(options: $options) {
    items {
      updatedAt
      slug
      id
      items {
        id
        link
        updatedAt
        start
        mobile {
          Asset
        }
        end
        createdAt
        asset {
          Asset
        }
      }
    }
  }
}
```

1: Filtering by slug

```gql
{
  "options": {
    "filter": {
      "slug": {
        "eq": "slug"
      }
    }
  }
}
```

2: Filtering by id
```gql
{
  "options": {
    "filter": {
      "id": {
        "eq": "slug"
      }
    }
  }
}
```

At the client side, do not forget to check for the end date whithin banner item to filter for expired banners.
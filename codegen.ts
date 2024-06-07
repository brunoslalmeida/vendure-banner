import type { CodegenConfig } from '@graphql-codegen/cli';

const clientConfig = {
    preset: 'client',
    presetConfig: {
        fragmentMasking: false,
    },
} as const;

const config: CodegenConfig = {
    overwrite: true,
    config: {
        strict: true,
        namingConvention: {
            typeNames: 'change-case-all#pascalCase',
            enumValues: 'keep',
        },
        scalars: {
            ID: 'string',
            Money: 'number',
            DateTime: { input: 'Date', output: 'string' },
        },
        maybeValue: 'T',
    },
    generates: {
        'src/generated/generated-admin-types.ts': {
            schema: 'http://localhost:3000/admin-api',
            plugins: ['typescript'],
        },
        'src/generated/generated-shop-types.ts': {
            schema: 'http://localhost:3000/shop-api',
            plugins: ['typescript'],
        },
        
        'src/plugins/banner/ui/gql/': {
            schema: 'http://localhost:3000/admin-api',
            documents: 'src/plugins/banner/ui/schemas/*.graphql.ts',
            ...clientConfig,
        },
    },
};
export default config;
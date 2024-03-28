module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-plugin-import/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'prettier/prettier': 'warn',
        'import/order': [
            'error',
            {
                pathGroupsExcludedImportTypes: ['builtin'],
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
                'newlines-between': 'never',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
    overrides: [
        {
            files: ['./src/**/*.ts', './src/**/*.vue'],
            extends: ['plugin:vue/vue3-recommended'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                sourceType: 'module',
                project: './tsconfig.json',
                extraFileExtensions: ['.vue'],
            },
            plugins: ['@typescript-eslint/eslint-plugin', 'vue'],
            rules: {
                'vue/no-mutating-props': 'error',
                'vue/no-unused-vars': 'off',
                'vue/multi-word-component-names': 'off',
                'vue/no-reserved-component-names': 'off',
                'vue/singleline-html-element-content-newline': 'off',
                'vue/v-slot-style': 'off',
                'vue/valid-template-root': 'warn',
                'vue/html-indent': ['warn', 4],
            },
        },
    ],
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
};

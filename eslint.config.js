// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';

import globals from 'globals';

export default tseslint.config({
    extends: [
        eslint.configs.recommended,
        reactRecommended,
        jsxRuntime,
        ...tseslint.configs.strictTypeChecked,
        stylistic.configs['disable-legacy'],
        stylistic.configs.customize({
            flat: true,
            indent: 4,
            jsx: true,
            semi: true,
            commaDangle: 'always-multiline',
            braceStyle: '1tbs',
            arrowParens: true,
        }),
    ],
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    ignores: ['*.config.{js,ts}'],
    languageOptions: {
        parserOptions: {
            ecmaFeatures: { 
                modules: true,
                jsx: true,
            }, 
            ecmaVersion: 2022,
            project: './tsconfig.json',
        },
        globals: {
            ...globals.browser,
            ...globals.es2022,
        },
    },
    rules: {
        'no-console': 'warn',
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
        "@typescript-eslint/prefer-literal-enum-member": ['error', { allowBitwiseExpressions: true }],
        "@typescript-eslint/restrict-template-expressions": ['error', { allowNumber: true }],
        '@stylistic/max-statements-per-line': ['error', { max: 2 }],
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@stylistic/member-delimiter-style': ['error', {
            multiline: {
                delimiter: "comma",
                requireLast: true
            },
            singleline: {
                delimiter: "comma",
                requireLast: false
            },
            multilineDetection: "brackets"
        }],
    },
});

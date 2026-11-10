import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'allure-results/**', 'allure-report/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],

    extends: [js.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['test/**/*.{js,ts}', 'tests/**/*.{js,ts}'],

    languageOptions: {
      globals: {
        ...globals.mocha,
        browser: 'readonly',
        driver: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
      },
    },
  },
]);

// @ts-check
import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // eslintPluginPrettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Formatting
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 4, { SwitchCase: 1 }],

      // Import sorting
      'simple-import-sort/imports': ['warn', {
        groups: [
          ['^@nestjs/(.*)$'],
          ['^@(?!nestjs)(.*)$'],
          ['^[a-z]'],
          ['^[./]']
        ]
      }],
      'simple-import-sort/exports': 'warn',

      "function-call-argument-newline": ["error", "always"],


    },
  },
);

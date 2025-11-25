import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      // Activa Prettier como regla de ESLint
      'prettier/prettier': ['error', { semi: true }],
    },

    ignores: ['dist'],
  },
];

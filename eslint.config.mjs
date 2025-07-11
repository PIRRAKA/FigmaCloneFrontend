import js from '@eslint/js';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';

export default [
  js.configs.recommended,
  jestPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error'
    }
  }
];

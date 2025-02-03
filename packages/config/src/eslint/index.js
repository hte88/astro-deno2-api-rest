import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import * as parser from '@typescript-eslint/parser'

export default [
  // Configuration de base
  {
    ignores: ['dist/*', 'node_modules/*']
  },

  // TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint
    },
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  // Astro
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error'
    }
  },

  // Vue
  ...eslintPluginVue.configs['vue3-recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-vars': 'warn'
    }
  },

  // Règles globales
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off'  // Géré par TypeScript
    }
  }
]

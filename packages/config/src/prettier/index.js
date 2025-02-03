/** @type {import("prettier").Config} */
export default {
    ...require('prettier-config-standard'),
    pluginSearchDirs: [__dirname],
    plugins: [
      'prettier-plugin-astro',
      'prettier-plugin-tailwindcss'
    ],
    overrides: [
      {
        files: '*.astro',
        options: {
          parser: 'astro'
        }
      },
      {
        files: '*.vue',
        options: {
          parser: 'vue'
        }
      }
    ],
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 100,
    trailingComma: 'none'
  }

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  overrides: [
    {
      files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-ts-comment': ['error'], // 禁止使用 // @ts-expect-error @ts-ignore @ts-nocheck @ts-check
    // '@typescript-eslint/ban-types': ['error'], // use lower-case primitives for consistency
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        bracketSpacing: true,
        bracketSameLine: true,
        jsxSingleQuote: false,
        htmlWhitespaceSensitivity: 'ignore',
        trailingComma: 'none',
        useTabs: false,
        rangeStart: 0,
        proseWrap: 'always',
        endOfLine: 'lf',
        arrowParens: 'avoid'
      }
    ]
  }
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/airbnb',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE'],
        selector: 'variableLike',
      },
      {
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        selector: 'parameter',
      },
      {
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
        modifiers: ['private'],
        selector: 'memberLike',
      },
      {
        format: ['PascalCase'],
        selector: 'typeLike',
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'error',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'id-blacklist': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-cycle': [
      2,
      {
        maxDepth: 1,
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-spaced-func': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidExplicitReturnArrows: true,
      },
    ],
    'operator-linebreak': 'off',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'always',
        singleline: 'never',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'always',
          void: 'always',
        },
        math: 'always',
        svg: 'always',
      },
    ],
    'vue/new-line-between-multi-line-property': 'error',
    'vue/no-bare-strings-in-template': [
      'error',
      {
        allowlist: [
          '(',
          ')',
          ',',
          '.',
          '&',
          '+',
          '-',
          '=',
          '*',
          '/',
          '#',
          '%',
          '!',
          '?',
          ':',
          '[',
          ']',
          '{',
          '}',
          '<',
          '>',
          '\u00b7',
          '\u2022',
          '\u2010',
          '\u2013',
          '\u2014',
          '\u2212',
          '|',
        ],
        attributes: {
          '/.+/': [
            'title',
            'aria-label',
            'aria-placeholder',
            'aria-roledescription',
            'aria-valuetext',
          ],
          input: ['placeholder'],
        },
        directives: ['v-text'],
      },
    ],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-parsing-error': [
      2,
      {
        'invalid-first-character-of-tag-name': false,
      },
    ],
    'vue/no-potential-component-option-typo': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-unregistered-components': 'error',
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['data', 'computed', 'methods', 'setup'],
      },
    ],
    'vue/no-unused-refs': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/require-component-is': 'off',
    'vue/v-for-delimiter-style': ['error', 'of'],
    'vue/v-on-function-call': [
      'error',
      'never',
      {
        ignoreIncludesComment: false,
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.html'],
      processor: 'vue/.vue',
    },
  ],
};

module.exports = {
  root: true,
  env: {
    es2020: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'es2020',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    //eslint
    'curly': 'error',
    'indent': ['error', 2, { SwitchCase: 1 }],
    // 'quotes': ['error', 'single'], It's really best to let prettier handle this..it's opinionated...
    'semi': ['error', 'always'],
    'no-cond-assign': ['error', 'always'],
    'init-declarations': 'off',
    'no-console': 'error',
    'no-inline-comments': 'error',
    'eqeqeq': 'error',
    'no-promise-executor-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'consistent-return': 'error',
    'no-constructor-return': 'error',
    'no-prototype-builtins': 'off',
    'require-await': 'error',
    'no-var': 'error',
    'no-await-in-loop': 'error',

    //typescript-eslint
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-error-on-unmatched-pattern': 'off',
    //Paired eslint & typescript-eslint rules ^^^

    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: true, checksVoidReturn: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    //import
    'import/first': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        'alphabetize': { order: 'asc', caseInsensitive: true }
      }
    ]
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    // https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#resolvers
    // Specify the resolver to use
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};

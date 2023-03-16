module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': 'warn',
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'internal', 'type', 'index', 'sibling', 'parent'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '@common/**',
            group: 'internal',
          },
          {
            pattern: '@shared/**',
            group: 'internal',
          },

          {
            pattern: '@types',
            group: 'type',
          },
          {
            pattern: '@api/**',
            group: 'internal',
          },
          {
            pattern: '@providers/**',
            group: 'internal',
          },
          {
            pattern: '@config',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};

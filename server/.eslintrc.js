module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'arrow-parens': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'newline-per-chained-call': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-continue': 'off',
    'consistent-return': 'off',
    'operator-assignment': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'import/prefer-default-export': 'off',
    'jest/require-hook': 'off', // Disable the rule globally
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off', // Disable the rule globally
    'no-next-lines': 'off',
    'new-cap': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    },
  ],
};

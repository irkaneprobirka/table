module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': 'on',
    'import/no-unresolved': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};

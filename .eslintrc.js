module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'script'
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
    browser: false
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ]
  }
};

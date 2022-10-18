module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    // 'standard-with-typescript',
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    // no use vars off
    'no-unused-vars': 'off',
    // use function()  no function ()
    'space-before-function-paren': 0,
    // 三元運算子 可以換行
    'multiline-ternary': 1,
    // no import React , don't show error
    "react/react-in-jsx-scope": "off",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}

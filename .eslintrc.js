module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ["prettier"],
  ignorePatterns: ["node_modules/"],
  extends: ["eslint:recommended", "airbnb", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "prettier/prettier": "error",
    curly: "error",
    quotes: ["error", "double"],
  },
};

import js from "@eslint/js";
import eslintParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config([
  { ignores: ["dist", "*.config.js"] },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      tsEslint.configs.recommended,
      pluginPrettierRecommended,
      pluginReact.configs.flat.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-console": ["error"],
      "no-unused-vars": ["off"],
      "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": ["off"],
      "@typescript-eslint/member-delimiter-style": ["off"],
      "@typescript-eslint/no-empty-function": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": ["off"],
      "@typescript-eslint/no-var-requires": ["off"],
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["class", "clip-rule", "fill-rule", "spellcheck"],
        },
      ],
      "react-hooks/rules-of-hooks": ["error"],
      "react-hooks/exhaustive-deps": ["error"],
      "simple-import-sort/imports": ["error"],
      "simple-import-sort/exports": ["error"],
      "jsx-a11y/control-has-associated-label": [
        2,
        {
          ignoreElements: ["th", "tr", "video"],
        },
      ],
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": 0,
      "react/react-in-jsx-scope": "off",
    },
  },
]);

import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: { jsx: true },
        },
        globals: {
          document: "readonly",
          window: "readonly",
        },
      },
      
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Refresh (vite)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TS
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Import order — без требования пустых строк
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "never",
        },
      ],
    },
  },
];

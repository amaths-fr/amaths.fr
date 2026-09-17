import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "typescript", "oxc", "react", "import"],

  categories: {
    correctness: "error",
    suspicious: "warn",
  },

  rules: {
    // Preferences not handled by Prettier
    "prefer-template": "error",

    "typescript/consistent-type-imports": "error",
    "typescript/consistent-type-exports": "error",
    "typescript/no-explicit-any": "off",

    "import/no-duplicates": "error",
  },

  overrides: [
    {
      files: ["**/*frontend/**/*.ts", "**/*.tsx"],
      rules: {
        "react/rules-of-hooks": "error",
        "react/exhaustive-deps": [
          "error",
          {
            additionalHooks: "(useEffectRealtime)",
          },
        ],
        "react/only-export-components": [
          "warn",
          {
            allowConstantExport: true,
          },
        ],
      },
    },
  ],

  ignorePatterns: ["**/dist/**", "**/node_modules/**"],
});

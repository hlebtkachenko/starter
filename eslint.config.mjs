import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "_junk/**",
    ".next/**",
    ".turbo/**",
    ".sst/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    ".planning/**",
    ".claude/**",
    "docs/**",
    "node_modules/**",
    "infra/**",
    "db/**",
    "tests/**",
    "scripts/**",
    "sst.config.ts",
    "commitlint.config.ts",
    "knip.config.ts",
    "vitest.config.ts",
    "playwright.config.ts",
    "**/_TEMPLATE*",
  ]),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;

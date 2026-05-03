import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "src/app/**/page.tsx",
    "src/app/**/layout.tsx",
    "src/app/**/route.ts",
    "src/app/**/not-found.tsx",
    "src/app/**/error.tsx",
    "src/app/**/global-error.tsx",
    "src/middleware.ts",
    "src/instrumentation.ts",
    "src/sentry.*.config.ts",
    "scripts/*.sh",
    "infra/*.ts",
    "sst.config.ts",
    "db/seed.ts",
    "drizzle.config.ts",
    "vitest.config.ts",
    "playwright.config.ts",
    ".claude/scripts/*.sh",
  ],
  project: ["**/*.ts", "**/*.tsx"],
  ignore: [
    ".planning/**",
    ".claude/**",
    "docs/**",
    "node_modules/**",
    ".next/**",
    ".turbo/**",
    ".sst/**",
    "db/migrations/**",
    "tests/**/*.spec.ts",
  ],
  ignoreBinaries: ["pnpm", "node", "bash"],
};

export default config;

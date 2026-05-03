import type { KnipConfig } from "knip";

// Knip runs as a warn-day-1 check (CI: `pnpm knip || true`). Tighten as the codebase fills.

const config: KnipConfig = {
  entry: [
    "src/app/**/page.tsx",
    "src/app/**/layout.tsx",
    "src/app/**/route.ts",
    "src/app/**/not-found.tsx",
    "src/app/**/error.tsx",
    "src/app/**/global-error.tsx",
    "src/proxy.ts",
    "src/sentry.*.config.ts",
    "src/instrumentation.ts",
    "scripts/*.sh",
    ".claude/scripts/*.sh",
  ],
  project: ["src/**/*.ts", "src/**/*.tsx"],
  ignore: [
    ".planning/**",
    ".claude/**",
    "docs/**",
    "node_modules/**",
    ".next/**",
    ".turbo/**",
    ".sst/**",
    "infra/**",
    "db/**",
    "tests/**",
    "**/_TEMPLATE*",
  ],
};

export default config;

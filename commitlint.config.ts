import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Mirrors docs/conventions/commit-conventions.md
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "perf",
        "chore",
        "docs",
        "test",
        "build",
        "ci",
        "style",
        "revert",
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "auth",
        "billing",
        "db",
        "ui",
        "infra",
        "docs",
        "deps",
        "ci",
        "tests",
        "gates",
        "agents",
        "deps-dev",
        "epoch",
        "release",
      ],
    ],
    "subject-case": [2, "never", ["upper-case", "pascal-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
  },
};

export default config;

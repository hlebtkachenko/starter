import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        extends: true,
        test: {
          name: "ui",
          environment: "jsdom",
          include: [
            "src/components/**/*.test.{ts,tsx}",
            "src/hooks/**/*.test.{ts,tsx}",
          ],
          setupFiles: ["./tests/helpers/setup-ui.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "server",
          environment: "node",
          include: [
            "src/lib/**/*.test.ts",
            "src/server/**/*.test.ts",
            "src/features/**/server/**/*.test.ts",
          ],
          setupFiles: ["./tests/helpers/setup-server.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      thresholds: {
        // Per-path thresholds; default applies elsewhere.
        "src/lib/**": {
          lines: 80,
          functions: 80,
          branches: 70,
          statements: 80,
        },
        "src/server/**": {
          lines: 80,
          functions: 80,
          branches: 70,
          statements: 80,
        },
        "src/features/**/server/**": {
          lines: 70,
          functions: 70,
          branches: 60,
          statements: 70,
        },
        "src/components/**": {
          lines: 30,
          functions: 30,
          branches: 20,
          statements: 30,
        },
        "**": { lines: 50, functions: 50, branches: 40, statements: 50 },
      },
      exclude: [
        "**/_TEMPLATE*",
        "**/*.config.{ts,mts,mjs,js}",
        "**/*.d.ts",
        "tests/**",
        ".next/**",
        ".sst/**",
        "infra/**",
      ],
    },
  },
});

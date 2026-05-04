// drizzle-kit runs outside Next, so it doesn't get the runtime env.
// Load `.env.local` explicitly (Conductor symlinks it; CLAUDE.md hard rule).
// Bare `dotenv/config` would read `.env`, which we don't ship.
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema/*.ts",
  out: "./db/migrations",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});

// Vitest setup: Node project. Loads env + primes any singletons required by tests.
//
// Bare `dotenv/config` reads `.env`; this repo only ships `.env.local` (Conductor
// symlink, CLAUDE.md hard rule). Load `.env.local` explicitly so server tests see
// real DATABASE_URL / SMTP creds. Mirrors db/drizzle.config.ts fix.
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

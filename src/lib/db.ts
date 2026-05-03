import "server-only";

// Drizzle client singleton. Imports schema barrel from @/db/schema.
//
// Production: connects through RDS Proxy (configured in infra/db.ts).
// Local: direct connection to docker postgres.

// Stub until drizzle is installed.
//
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as schema from "@/db/schema";
// import { env } from "./env";
//
// const client = postgres(env.DATABASE_URL, {
//   max: 10,
//   prepare: false,             // RDS Proxy compatibility
// });
//
// export const db = drizzle(client, { schema, casing: "snake_case" });
// export type Db = typeof db;

export const db: never = undefined as never;

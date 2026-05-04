// Better Auth client singletons.
//
// Server: full betterAuth() instance with org plugin.
// Browser: createAuthClient() for use in client components and hooks.
//
// Cookie domain scoped to app.<domain> via baseURL env.
// DOMAIN slot — `<domain>` is descriptive only here; real value comes from env at runtime.

// Stub until better-auth is installed.
//
// import { betterAuth } from "better-auth";
// import { organization } from "better-auth/plugins";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { db } from "./db";
// import { env } from "./env";
//
// export const auth = betterAuth({
//   database: drizzleAdapter(db, { provider: "pg" }),
//   secret: env.BETTER_AUTH_SECRET,
//   baseURL: env.BETTER_AUTH_URL,
//   emailAndPassword: { enabled: true, requireEmailVerification: true },
//   plugins: [organization()],
// });
//
// export type Session = typeof auth.$Infer.Session;

export const auth: never = undefined as never;

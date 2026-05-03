import { z } from "zod";

// Boot-time env validation. Throws if a required var is missing or wrong shape.
// Consumers import `env` (typed): never `process.env` directly.

const Schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  DATABASE_URL: z.string().url(),

  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),

  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),

  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_NOREPLY_USER: z.string().optional(),
  SMTP_NOREPLY_PASS: z.string().optional(),
  SMTP_SUPPORT_USER: z.string().optional(),
  SMTP_SUPPORT_PASS: z.string().optional(),
  SMTP_ADMIN_USER: z.string().optional(),
  SMTP_ADMIN_PASS: z.string().optional(),
  SMTP_DEMO_USER: z.string().optional(),
  SMTP_DEMO_PASS: z.string().optional(),

  AWS_REGION: z.string().optional(),
  S3_BUCKET: z.string().optional(),

  STRIPE_API_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
});

const parsed = Schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment: see logs above");
}

export const env = Object.freeze(parsed.data);
export type Env = typeof env;

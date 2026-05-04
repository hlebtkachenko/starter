/// <reference path="../.sst/platform/config.d.ts" />

// SST Secrets: bound to Lambda env at runtime via web.ts `link`.
// Set values per stage with: `pnpm sst secret set <NAME> <value> --stage <stage>`.

export const databaseUrl = new sst.Secret("DATABASE_URL");
export const betterAuthSecret = new sst.Secret("BETTER_AUTH_SECRET");

// SMTP per-mailbox (host + port shared across mailboxes)
// SMTP PROVIDER slot — replace `<smtp-provider>` with the chosen host (e.g., "adm.tools", "sendgrid.net") when forking template.
export const smtpHost = new sst.Secret("SMTP_HOST", "smtp.<smtp-provider>");
export const smtpPort = new sst.Secret("SMTP_PORT", "465");

export const smtpNoreply = new sst.Secret("SMTP_NOREPLY"); // user|pass JSON
export const smtpSupport = new sst.Secret("SMTP_SUPPORT");
export const smtpAdmin = new sst.Secret("SMTP_ADMIN");
export const smtpDemo = new sst.Secret("SMTP_DEMO");

// Sentry
export const sentryDsn = new sst.Secret("SENTRY_DSN");

// Stripe (LATER)
export const stripeApiKey = new sst.Secret("STRIPE_API_KEY", "");
export const stripeWebhookSecret = new sst.Secret("STRIPE_WEBHOOK_SECRET", "");

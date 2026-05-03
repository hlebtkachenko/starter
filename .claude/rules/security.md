---
area: security
severity: block
---

# Security rules

## Never log secrets, tokens, or PII

- Forbidden in logs: passwords, API keys, JWTs, session tokens, full credit card numbers, full email bodies, tax IDs.
- PII reduction: log user ids, not emails. Log org ids, not org names.
- Logger has redaction config (`src/lib/logger.ts` `redact` paths).

**Why:** log aggregators, error trackers, and CloudWatch retain logs longer than memory expects. One leaked log = a credential rotation event.

## Never commit secret material

Glob block + gitleaks pre-commit. See [global.md](global.md).

## Validate at boundaries (Zod)

Every external input. See [backend.md](backend.md).

## HTTPS only in production

- `infra/web.ts` enforces.
- Local dev uses `http://localhost:3000`; everywhere else HTTPS.

## HMAC verify webhooks

- Stripe: `Stripe-Signature` HMAC-SHA256.
- Outbound (LATER): per-subscription signing key.
- Verify **before** parsing or acting on payload.

## Tenant isolation via RLS

- Every tenant table RLS-enabled.
- App sets `app.org_id` per query session.
- Treat any cross-tenant read or write that bypasses RLS as a P0.

## Rate limit auth endpoints

- `sign-in`: 5/min per IP.
- `sign-up`: 3/min per IP.
- `forgot-password`: 1/hour per IP.
- See [api/rate-limits-api.md](../../docs/api/rate-limits-api.md).

## No client-side secrets

- `NEXT_PUBLIC_*` vars are public. Anything sensitive stays server-only.
- Audit `process.env.NEXT_PUBLIC_*` references.

## Disclosure path

`security@<domain>` + [SECURITY.md](../../SECURITY.md) + `/.well-known/security.txt`.

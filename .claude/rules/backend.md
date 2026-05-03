---
area: backend
severity: block
---

# Backend rules

## Mutations through server actions, not HTTP

- Default: `"use server"` action with `@/server/actions` wrapper.
- HTTP route handlers reserved for: external integrations (`/api/webhooks/*`), liveness (`/api/health`), readiness (`/api/ready`), Better Auth catch-all.

**Why:** server actions get auth + RLS context + zod parse + error envelope for free.

## Validate at boundaries

- Every external input parsed with zod before reaching domain logic.
- Boundaries: route handler, server action, webhook receiver, env loader.
- Internal calls between trusted modules: **don't** re-validate (waste).

## No business logic in route handlers

- Route handler responsibilities: parse, verify (signature / auth), dispatch to feature module, shape response.
- Business logic lives in `src/features/<x>/server/`.

## Wrappers, not re-implementations

- Auth: thin wrappers around Better Auth `auth.api.*` in `src/features/auth/server/`. Do not re-implement.
- Stripe: Stripe SDK direct; thin event router in `src/features/billing/webhooks.ts`.

## Errors via AppError

- Throw `AppError` from `@/lib/errors`.
- Action / route wrapper converts to envelope.
- Never throw raw `Error` for user-facing reasons.

## Structured logger

- `src/lib/logger.ts` (pino).
- Request-bound child loggers carry `request_id`, `user_id`, `org_id`.
- Never `console.log` in committed code.

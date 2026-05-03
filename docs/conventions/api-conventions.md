# API conventions

## Surface

- App is RSC-first; mutations go through **server actions** by default.
- HTTP routes only for: external integrations (`/api/webhooks/*`), liveness (`/api/health`), readiness (`/api/ready`), Better Auth catch-all (`/api/auth/[...all]`).
- Public consumer API (if/when needed): `/api/v1/*`. URL-versioned.

## Server action shape

```ts
"use server";
import { action } from "@/server/actions";
import { z } from "zod";

const input = z.object({ orgSlug: z.string().min(1) });

export const inviteMember = action(input, async ({ orgSlug }, ctx) => {
  // ctx: { user, org, db, logger }
  // ...
  return { ok: true } as const;
});
```

The wrapper enforces: auth, zod parse, RLS context, structured logger, error envelope.

## HTTP route handler shape

```ts
// src/app/api/v1/<resource>/route.ts
import { NextResponse } from "next/server";
import { handler } from "@/server/api";

export const POST = handler(z.object({ ... }), async (input, ctx) => {
  return NextResponse.json({ data: ... });
});
```

## Status codes

| Code | When |
|---|---|
| 200 | OK with body |
| 201 | Created |
| 204 | No content |
| 400 | Validation error (zod parse failed) |
| 401 | Unauthenticated |
| 403 | Authenticated but not authorized (RLS / role) |
| 404 | Resource not found (or hidden by RLS) |
| 409 | Conflict (unique violation, version mismatch) |
| 422 | Semantically invalid (well-formed but rejected) |
| 429 | Rate limited |
| 500 | Unhandled error (also reported to Sentry) |
| 503 | Dependency down (`/api/ready` fails) |

## Error envelope

See [error-envelope.md](error-envelope.md). Single shape across actions, route handlers, webhooks.

## Pagination

- Cursor-based for collections > 100.
- Request: `?cursor=<opaque>&limit=<n>` (cap `limit` at 100).
- Response: `{ data: [...], nextCursor: <opaque|null> }`.

## Idempotency

Mutating route handlers consuming `Idempotency-Key` header: store key + response hash for 24h. Repeated key returns cached response.

## Versioning

URL-versioned. Breaking changes bump `/v<n>`. See [api/versioning-api.md](../api/versioning-api.md).

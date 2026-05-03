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

## Status codes + error envelope

Single source: [error-envelope.md](error-envelope.md). It defines the envelope shape, the code namespace, and the status mapping. Don't re-list codes here.

For success: `200` with body, `201` for create, `204` for no content. Everything else is an error envelope.

## Pagination

- Cursor-based for collections > 100.
- Request: `?cursor=<opaque>&limit=<n>` (cap `limit` at 100).
- Response: `{ data: [...], nextCursor: <opaque|null> }`.

## Idempotency

Mutating route handlers consuming `Idempotency-Key` header: store key + response hash for 24h. Repeated key returns cached response.

## Versioning

URL-versioned. Breaking changes bump `/v<n>`. See [api/versioning-api.md](../api/versioning-api.md).

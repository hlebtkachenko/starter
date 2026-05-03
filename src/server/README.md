# server/

> Cross-feature server-only utilities. **No business logic** (that lives in `features/`).

## Boundary

- Server-only. Never imported from a client component. Use the `server-only` package guard at module top:

```ts
import "server-only";
```

- Files here are framework-aware (Next 16 server context) but feature-agnostic.

## Files

| File | Purpose |
|---|---|
| [actions.ts](actions.ts) | Base server-action wrapper (auth + zod + RLS context + logger + error envelope) |
| [api.ts](api.ts) | Route-handler wrapper (parse + verify + envelope) |
| [rls.ts](rls.ts) | `SET LOCAL app.org_id` per query session |

## Anti-pattern

Don't dump feature-specific helpers here. If `inviteMember()` lives in `server/` instead of `features/orgs/server/`, refactor.

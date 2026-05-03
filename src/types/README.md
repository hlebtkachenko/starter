# types/

> Cross-cutting TS types shared by 2+ slices.

## What goes here

- Domain types not bound to a single feature (e.g., `Currency`, `IsoDate`).
- API helper types (`Paginated<T>`, `WithCursor<T>`).
- Brand types (`UserId`, `OrgId`) when extra type safety pays off.

## What does NOT go here

- Env types — derived from `lib/env.ts` via `z.infer`. **No `env.d.ts`**.
- Feature-specific types — colocate with the feature in its `schema.ts`.
- DB row types — derived from Drizzle schema in `db/schema/*`.

## Import style

Type-only imports preferred:

```ts
import type { Paginated } from "@/types/pagination";
```

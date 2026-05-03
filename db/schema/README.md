# db/schema/

> Drizzle schema files, one per domain. snake_case tables + columns. RLS inline via `pgPolicy`.

## Naming

| Kind | Pattern |
|---|---|
| Table | `snake_case` plural |
| Column | `snake_case` |
| Primary key | `id` (UUID v4 via `gen_random_uuid()`) |
| Foreign key | `<referenced_singular>_id` |
| Index | `idx_<table>_<col(s)>` |
| Unique | `uq_<table>_<col(s)>` |
| RLS policy | `rls_<table>_<scope>` |

## RLS scope tiers

| Tier | Marker comment | Tables |
|---|---|---|
| Tenant | `// tenant-scoped` | `members`, `invitations`, feature tables |
| User-scoped | `// user-scoped` | `sessions`, `accounts` |
| System | `// system` | `users`, `organizations`, `verification` |

Mark every schema file with a one-line comment so the marker survives `better-auth generate` re-runs.

## Timestamps

```ts
created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
updated_at: timestamp({ withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
deleted_at: timestamp({ withTimezone: true }), // nullable, partial index
```

## Plugin file split

Day 1: flat (`auth.ts`, `orgs.ts`).
Promote to `schema/auth/*` when Better Auth plugin count > 3 (e.g., `core`, `org`, `mfa`, `sso`).

## Generated vs hand-edited

| File | Generator | Hand-edit OK |
|---|---|---|
| `auth.ts` | `pnpm exec better-auth generate` | no — re-run regenerates |
| `auth-policies.ts` | – | yes — RLS supplements survive regen |
| `orgs.ts` | `pnpm exec better-auth generate` (org plugin) | no |
| `index.ts` | – | yes (barrel re-export) |
| Feature schemas | – | yes |

## Index

| Schema | Scope | Generator |
|---|---|---|
| (none yet — copy `_TEMPLATE.ts`) | – | – |

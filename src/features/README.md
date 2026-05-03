# features/

> Vertical slices. One folder per business slice. Single source of business logic.

## Slice anatomy

```
features/<slice>/
├── server/                # actions, queries, services (server-only)
│   └── *.ts
├── ui/                    # feature UI components (optional)
│   └── *.tsx
├── schema.ts              # Zod schemas (forms + API contracts)
└── <extension>/           # per-feature: webhooks.ts, handlers/, templates/, etc.
```

| Folder / file | Required? | Notes |
|---|---|---|
| `server/` | **yes** | Anything that mutates or reads with auth/RLS context |
| `schema.ts` | **yes** | Public input/output zod schemas; consumers import from here |
| `ui/` | optional | Skip if the slice has no UI surface (e.g., `jobs/`) |
| Extension folders | per-feature | Examples: `email/templates/`, `jobs/handlers/`, `billing/webhooks.ts` |

## Boundary rules

- A feature **owns** its server logic, schemas, and UI.
- A feature may import from `@/lib`, `@/server`, `@/db/schema`, `@/components/ui`.
- A feature **must not** import from sibling features. If two features need the same logic, lift to `@/lib` or `@/server`.

## Wrappers, not re-implementations

For `auth/` and `orgs/`: thin wrappers around Better Auth `auth.api.*`. Custom flows (org-creation-on-signup, MFA enrollment) live in `server/`; vanilla calls go straight to Better Auth.

## When to extract to `packages/<name>/`

Promote a slice to its own package when:

- It needs an independent runtime (e.g., `features/jobs/` → `packages/jobs/` once a dedicated worker process is needed).
- Two products share the slice and version separately.

Otherwise: feature folders are cheap; over-package early and you pay coordination tax for nothing.

## Index

| Slice | Purpose |
|---|---|
| `_TEMPLATE/` | Scaffold for new slice |
| (none yet) | – |

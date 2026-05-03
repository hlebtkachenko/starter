# Rules

> Hard taboos and invariants. Loaded into every agent session in this repo.

## Format

Each rule file is markdown with optional frontmatter:

```yaml
---
area: global | frontend | backend | db | security | tests
severity: block | warn
---
```

Body shape: **Rule** → **Why** → **How to apply** → **Examples** (do / don't).

## Conventions vs rules

- [`docs/conventions/`](../../docs/conventions/) — HOW we write good code (advisory).
- `.claude/rules/` — what is **forbidden** (binding).

If a rule conflicts with a convention, the rule wins; open ADR to reconcile.

## Index

| File | Area |
|---|---|
| [global.md](global.md) | Cross-cutting (English, no em-dash, never log secrets) |
| [frontend.md](frontend.md) | UI / Tailwind / shadcn |
| [backend.md](backend.md) | Server actions, route handlers |
| [db.md](db.md) | PG schema, migrations, RLS |
| [security.md](security.md) | Secret handling, validation, HTTPS |
| [tests.md](tests.md) | DB mock policy, e2e scope |

Add a rule by copying [`_TEMPLATE.md`](_TEMPLATE.md) and registering here.

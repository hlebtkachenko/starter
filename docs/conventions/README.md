# Conventions

> HOW we write code. Conventions vs rules: conventions describe what good looks like; [.claude/rules/](../../.claude/rules/) lists what is forbidden.

## Index

| File | Scope |
|---|---|
| [code-naming.md](code-naming.md) | Files, vars, types, tests, constants |
| [db-conventions.md](db-conventions.md) | snake_case, FK pattern, indexes, RLS, migrations |
| [api-conventions.md](api-conventions.md) | Route shape, status codes, error envelope, pagination |
| [ui-conventions.md](ui-conventions.md) | Component structure, shadcn rules, hex tokens, a11y |
| [test-conventions.md](test-conventions.md) | Co-location, e2e, AAA, no-mock-DB, coverage targets |
| [commit-conventions.md](commit-conventions.md) | Conventional Commits, scope list, breaking marker |
| [pr-conventions.md](pr-conventions.md) | PR title, description, paired files, size cap, review |
| [branch-naming.md](branch-naming.md) | Branch pattern + length cap |
| [error-envelope.md](error-envelope.md) | Single error shape across actions, route handlers, webhooks |

## Drift policy

Changes to a convention require an ADR. Conventions reflect decided practice: drifting silently invites inconsistency.

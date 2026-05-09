# Rules

> Hard taboos. Loaded into every agent session in this repo.

## Conventions vs rules

- [`docs/conventions/`](../../docs/conventions/): HOW good code looks (advisory).
- `.claude/rules/`: what is **forbidden** (binding).

When the two conflict, the rule wins; open ADR to reconcile.

## Style

One imperative sentence. Then **Why** (one concrete consequence) and **Where it binds**. Don't restate the convention; rules add the bite that conventions can't.

## Index

| File | Area |
|---|---|
| [global.md](global.md) | English, em-dash, secrets, branch naming, conventional commits |
| [frontend.md](frontend.md) | Tailwind hex tokens, shadcn copy-paste, a11y, mobile-first |
| [backend.md](backend.md) | Server actions, validation, no logic in route handlers |
| [db.md](db.md) | snake_case, RLS day 1, append-only migrations, no raw SQL outside `db/` |
| [security.md](security.md) | Never log secrets, validate at boundary, HMAC verify webhooks |
| [tests.md](tests.md) | No mocked DB in integration, no flaky retries |
| [components.md](components.md) | Read guides before component work, no raw HTML, no design system bypass |

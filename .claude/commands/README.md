# Project commands

> Repo-local slash commands. Invoked as `/<name>`.

## Style

Imperative. Steps are atomic actions, not narration. Always end with one verify command. State pre-conditions and side effects so the human can decide whether to run.

## Index

| Command | Purpose |
|---|---|
| (none yet: copy `_TEMPLATE.md`) | – |

## Planned roster

| Command | Purpose |
|---|---|
| `/db-migrate` | `pnpm db:migrate` against current `DATABASE_URL` |
| `/seed` | Reset + reseed local DB (`bash scripts/db-reset.sh --yes`) |
| `/handoff` | Refresh `docs/roadmap/handoffs/HANDOFF-<branch>.md` from current state |
| `/ship` | Open PR for current branch with conventional title + filled template |

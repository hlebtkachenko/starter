---
branch: hlebtkachenko/area2-agents
created: 2026-05-03T21:45:00Z
last_updated: 2026-05-03T21:45:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area2-agents

## Goal

Close Area 2 (agents) audit gaps: bring SPEC-000 in line with the actual `.claude/scripts/` layout, and seed the first project slash command so the `commands/` slot stops being empty.

## Current state

- SPEC-000 `.claude/scripts/` tree updated to enumerate `_TEMPLATE.sh`.
- `/digest` slash command added at `.claude/commands/digest.md`. Wraps `.claude/scripts/boot-digest.sh`. Index updated in `.claude/commands/README.md`.
- Skipped (per maintainer): `PROJECT_NAME` placeholder fix, `PROJECT_ROOT` variable fix, `.mcp.json` `_notes.later` cleanup.

## Decisions made

- `/digest` is read-only and side-effect-free, so it is safe to allowlist. No matching `settings.json` permission needed (it just runs `bash`, already covered).
- Skipping `PROJECT_NAME` and `PROJECT_ROOT` per maintainer call: settings env values are not consumed by anything in the current tree, so the placeholders are inert.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] Continue Area 3 (github) review next.

## Files touched

- `docs/specs/000-REPO-TEMPLATE.md`: `.claude/scripts/` tree now lists `_TEMPLATE.sh`.
- `.claude/commands/digest.md`: new slash command.
- `.claude/commands/README.md`: index entry replaces "(none yet)" placeholder.

## Verify

```bash
pnpm typecheck
pnpm lint
bash .claude/scripts/boot-digest.sh   # /digest invokes this
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

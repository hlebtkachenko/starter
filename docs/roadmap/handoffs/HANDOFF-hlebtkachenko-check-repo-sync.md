---
branch: hlebtkachenko/check-repo-sync
created: 2026-05-03T21:00:00Z
last_updated: 2026-05-03T21:00:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/check-repo-sync

## Goal

Make `git pull` safer and more transparent: block on untracked-file collisions, fast-forward only, and surface what actually changed (lockfile, migrations, env keys) after the merge.

## Current state

- Safe-pull script wraps `git pull --ff-only --autostash` with a pre-merge collision guard.
- `post-merge` lefthook is now chatty and conditional: re-installs only when lockfile moved, lists new migrations, diffs `.env.example` keys against `.env.local`.
- Local repo git config pinned to `pull.ff=only`, `pull.rebase=true`, `rebase.autoStash=true`.

## Decisions made

- Collision guard runs in script, not lefthook: lefthook has no `pre-merge` stage; pulls would still abort mid-merge without the wrapper.
- `pnpm install --frozen-lockfile` kept (no auto-bump on pull).
- Migrations only announced, not auto-applied: running migrations during a hook risks data changes the user didn't consent to.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] Verify `pnpm pull` end-to-end on next real upstream change.

## Files touched

- `scripts/safe-pull.sh`: new wrapper, collision guard + ff-only + autostash.
- `lefthook.yml`: smarter `post-merge` (install gated by lockfile change, migrations and env diff announced).
- `package.json`: `pnpm pull` shortcut.
- `AGENTS.md`: commands table row.

## Verify

```bash
pnpm typecheck
pnpm lint
bash -n scripts/safe-pull.sh
node_modules/.bin/lefthook validate
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

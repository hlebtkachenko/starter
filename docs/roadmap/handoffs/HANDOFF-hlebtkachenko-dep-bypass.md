---
branch: hlebtkachenko/dep-bypass
created: 2026-05-03T20:40:00Z
last_updated: 2026-05-03T20:40:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/dep-bypass

## Goal

Stop dependabot PRs failing pr-checks gates that don't apply to a bot author.

## Current state

- `pr-checks.yml` `handoff-gate` and `conv-title` skip when `github.actor == 'dependabot[bot]'`.
- `conv-title` scopes list extended: added `deps-dev`, `actions`, `epoch`, `release` (matches commitlint scope-enum).
- CI (lint/typecheck/build) still runs on dependabot PRs: real signal preserved.

## Why

Dependabot can't author handoffs and uses scopes outside our human list. Failing gates on a bot author yields red checks for no value.

## Verify

```bash
# Future dependabot PR: handoff-gate + conv-title show as skipped, ci runs.
gh pr checks <num>
```

## Next

- [ ] Squash-merge.

---
name: digest
description: Print repo state digest (branch, ahead/behind, dirty count, STATE.md head, my open PRs, active handoff)
args: none
---

# /digest

I print the same boot digest the SessionStart hook prints, on demand.

## Steps

1. Run `bash .claude/scripts/boot-digest.sh`.
2. Show stdout verbatim.
3. Verify: digest ended with `=== /boot digest ===`.

## Pre-conditions

- Inside a git working tree.
- `gh` available (optional; the open-PRs section is skipped if not).

## Side effects

- None. Read-only.
- Rollback: not applicable.

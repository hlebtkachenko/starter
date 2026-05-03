---
name: <skill-name>
description: Use when <one concrete trigger>.
---

# <skill name>

I do <one outcome> for this repo.

## Steps

1. <atomic action with concrete path, e.g. `git rev-parse --abbrev-ref HEAD`>
2. <atomic action; if a cache file already exists at `<path>`, skip the work>
3. Write output to `<concrete repo-relative path>` so I can re-open it from anywhere.
4. Verify with `<one command>`.

## Notes

- Idempotent. Re-running must produce the same result.
- If `<thing>` already exists at `<path>`, do nothing: don't overwrite.
- When a step touches `<sensitive area>`, remind myself of [`<linked-rule>`](../../rules/<file>.md) before proceeding.

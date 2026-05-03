# PR conventions

## Title

Conventional Commits format ([commit-conventions.md](commit-conventions.md)). Enforced by `pr-checks.yml` job `conv-title`.

## Body

Use [`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md). Required sections:

- **What** — one paragraph user-visible summary.
- **Why** — motivation; link spec / ADR / issue.
- **How to test** — atomic steps anyone can follow.
- **Screenshots** — for any UI change.
- **Risks** — what could break, mitigations.
- **Checklist** — paired files, handoff, STATE update, tests, docs.

## Paired files

[`.github/related-files.yml`](../../.github/related-files.yml) defines pairs that must be updated together. CI job `paired-files` blocks the PR if a pair is violated.

Examples:

- `db/schema/**` ↔ `db/migrations/**`
- `src/features/**` ↔ `docs/specs/*.md`
- `infra/**` ↔ `docs/runbooks/*.md`

## Size cap

| Bucket | LOC delta | Action |
|---|---|---|
| Small | ≤ 200 | OK |
| Medium | 200–500 | OK; slow review |
| Large | 500–1000 | Warn; justify in PR body |
| XL | > 1000 | Block by `pr-checks.yml` `size-cap` job; split |

Generated files (lockfile, migrations `meta/`) excluded from count.

## Handoff

Active branch must have `docs/roadmap/handoffs/HANDOFF-<branch>.md`. Empty `_TEMPLATE` doesn't count. Auto-deleted on merge by `handoff-cleanup.yml`.

## Review

- `claude-review.yml` runs on PR open / sync. Routes to specialist subagents by changed paths.
- Human review: 1 required (set in `rulesets/main.json`).
- Re-request review after each substantive push (dismiss-stale on push is on).

## Merge

- Strategy: **squash and merge** to `master`.
- Final commit message uses the PR title (CC format) + body.
- Branch deleted on merge.

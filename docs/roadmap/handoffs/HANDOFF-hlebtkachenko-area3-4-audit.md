---
branch: hlebtkachenko/area3-4-audit
created: 2026-05-04T08:00:00Z
last_updated: 2026-05-04T08:00:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area3-4-audit

## Goal

Close Area 3 (github) and Area 4 (dotfiles) audit gaps in one pass. Two real bugs, two spec drifts.

## Current state

- `.github/CODEOWNERS`: `@<git-user>` placeholder replaced with `@hlebtkachenko`. Auto-assignment now works; ruleset's `require_code_owner_review` no longer blocks every PR.
- `.github/rulesets/main.json`: `required_status_checks` rewritten to actual job names (`ci`, `conv-title`, `paired-files`, `handoff-gate`, `size-cap`). Previous list (`pr-checks`, `claude-review`) referenced workflow names, which GitHub does not match against status contexts; importing the old ruleset would have blocked every PR.
- SPEC-000 trees synced: `.github/scripts/_TEMPLATE.sh` and root `.gitleaks.toml` now enumerated.

## Decisions made

- Dropped `claude-review` from required checks: the workflow's `review` job currently shows status `skipping` on most PRs, so requiring it would block. Kept as advisory until the route step gates it deterministically.
- Did not touch `.github/dependabot.yml`, `.editorconfig`, `.dockerignore`, `.gitattributes`, `.gitignore`, `.mise.toml`, `.npmrc`, `.env.example`: all in line with spec, no fixes needed.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When ready to deploy branch protection: `gh ruleset import .github/rulesets/main.json`. See [`docs/runbooks/branch-protection.md`](../../runbooks/branch-protection.md).
- [ ] Continue Area 5 (build tooling) review next.

## Files touched

- `.github/CODEOWNERS`: 5 occurrences of `@<git-user>` → `@hlebtkachenko`.
- `.github/rulesets/main.json`: required_status_checks now lists actual job names.
- `docs/specs/000-REPO-TEMPLATE.md`: enumerates `.github/scripts/_TEMPLATE.sh` and `.gitleaks.toml`.

## Verify

```bash
pnpm typecheck
pnpm lint
jq . .github/rulesets/main.json   # JSON parses
grep -c "@hlebtkachenko" .github/CODEOWNERS   # 5
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

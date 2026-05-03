---
area: global
severity: block
---

# Global rules

## English only

- All files, code, comments, commits, PRs, issues: **English only**.
- Exception: official proper names (e.g., legal entity names, place names).

**Why:** mixed-language artifacts break tooling, search, and external review.
**How to apply:** if a string is user-facing and non-English needed, store as i18n key, not a hard-coded literal.

## No em-dash

- Avoid `, ` (em-dash) in user-facing communication (UI copy, emails, PR descriptions, commit bodies).
- Use comma, colon, parentheses, or sentence break instead.

**Why:** maintainer style preference; consistency.
**How to apply:** lint copy in PR review.

## Never commit secrets

- Forbidden file globs: `.env`, `.env.*` (except `.env.example`), `*.key`, `*.pem`, `*.enc`, `client_secret*.json`, `*credentials*.json`.
- gitleaks pre-commit blocks accidental commits.

**Why:** leaked secrets are public the moment they hit a remote.
**How to apply:** if a secret leaks, rotate immediately ([secret-rotation.md](../../docs/runbooks/secret-rotation.md)) before fixing the commit.

## Conventional commits

All commits follow [conventions/commit-conventions.md](../../docs/conventions/commit-conventions.md). commitlint enforces.

## Branch naming

`<git-user>/<short>` ≤ 30 chars, kebab-case. Lefthook pre-push enforces.

## PRs satisfy related-files.yml

Paired files must move together. CI job `paired-files` blocks otherwise. See [conventions/pr-conventions.md](../../docs/conventions/pr-conventions.md).

## Never delete files (move to `_junk/`)

Soft-delete by moving into `_junk/` (gitignored) when removing in-flight work. Use `git rm` only when the deletion is intentional + reviewed.

**Why:** accidental deletions are recoverable from `_junk/`; from macOS Trash they often aren't.

## TS 6.0+ when available

Currently TS 5; bump on next minor when stable. `engines.node` is `>=24`.

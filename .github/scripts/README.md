# .github/scripts/

> CI- and lefthook-invoked utilities. Distinct from `.claude/scripts/` (slash commands) and root `scripts/` (local dev).

## Boundary

See [`.claude/README.md` scripts boundary](../../.claude/README.md#scripts-boundary).

## Index

| Script | Triggered by | Purpose |
|---|---|---|
| [_TEMPLATE.sh](_TEMPLATE.sh) | – | New-script scaffold |
| [check-paired-files.sh](check-paired-files.sh) | lefthook pre-push, `pr-checks.yml` | Enforce `related-files.yml` |

## Conventions

- `set -euo pipefail` mandatory.
- Read CI vars from environment (`GITHUB_BASE_REF`, `GITHUB_HEAD_REF`).
- Local invocation: detect by `git rev-parse --abbrev-ref HEAD` if env vars absent.
- Exit non-zero on policy violation.

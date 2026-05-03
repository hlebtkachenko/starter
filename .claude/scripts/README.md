# .claude/scripts/

> Manual / command-invoked utilities. Not lifecycle hooks (see `.claude/hooks/`), not CI scripts (see `.github/scripts/`), not human dev scripts (see root `scripts/`).

## Boundary matrix

| Folder | Triggered by | Examples |
|---|---|---|
| `.claude/hooks/` | Lifecycle event | session-start, pre-tool-use |
| `.claude/scripts/` | Slash command, agent action, manual run | boot-digest, format, gh-state |
| `.github/scripts/` | CI workflow, lefthook | check-paired-files |
| `scripts/` (root) | Local human dev | bootstrap, doctor, db-reset |

## Index

| Script | Purpose |
|---|---|
| [_TEMPLATE.sh](_TEMPLATE.sh) | New-script scaffold |
| [boot-digest.sh](boot-digest.sh) | Repo state snapshot for SessionStart context |
| [format.sh](format.sh) | Idempotent biome + knip + eslint --fix |
| [gh-state.sh](gh-state.sh) | GitHub state probe (PRs, runs, reviews) |

## Conventions

- `kebab-case.sh`, executable.
- `set -euo pipefail` mandatory.
- Idempotent — safe to re-run.
- Fail-fast with non-zero exit; no swallowing errors.

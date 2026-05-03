# scripts/

> Local human-driven dev utilities. Distinct from CI scripts (`.github/scripts/`), Claude lifecycle hooks (`.claude/hooks/`), and Claude command scripts (`.claude/scripts/`).

## Boundary matrix

| Folder | Triggered by | Examples |
|---|---|---|
| `.claude/hooks/` | Claude Code lifecycle event | session-start, pre-tool-use |
| `.claude/scripts/` | Slash command, agent action | boot-digest, format |
| `.github/scripts/` | CI workflow, lefthook | check-paired-files |
| `scripts/` (here) | Local human dev | bootstrap, doctor, db-reset, tunnel |

## Index

| Script | Purpose |
|---|---|
| [_TEMPLATE.sh](_TEMPLATE.sh) | New-script scaffold |
| [bootstrap.sh](bootstrap.sh) | One-shot first-run setup |
| [doctor.sh](doctor.sh) | Read-only environment diagnosis |
| [db-reset.sh](db-reset.sh) | Wipe + remigrate + reseed local DB |
| [tunnel.sh](tunnel.sh) | Cloudflared HTTPS tunnel for webhook testing |

## Conventions

- `kebab-case.sh`, executable.
- `set -euo pipefail` mandatory.
- Idempotent: re-running is safe.
- Single CLI source: scripts may use `pnpm` / `mise` / `docker` / `aws`; pin via `.mise.toml`.
- Naming convention preserved across CI / hooks / commands.

## Never deploy-time

These scripts are local-only. Deploy workflows (`.github/workflows/deploy-*.yml`) must **not** invoke `bootstrap.sh`, `db-reset.sh`, or any other utility here. Production migrations run in their own CI job ([`db/README.md`](../db/README.md#production-migration-execution)). Production seeding does not happen: `db/seed.ts` is local + CI only.

# <project-name>

> Web SaaS scaffold: Next 16 (App Router) + React 19 + TS 5 + Tailwind v4 + pnpm. Multi-tenant, agent-native, AWS-deployed via SST.

**Status:** alpha · pre-PMF · GSD epoch (until v1.01.000)

## Quickstart

```bash
mise install                 # node 24, pnpm, postgres-cli
pnpm install
cp .env.example .env.local   # or symlink (Conductor)
docker compose up --wait     # postgres + mailpit
pnpm db:migrate && pnpm db:seed
pnpm dev                     # http://localhost:3000
```

Full bootstrap: `bash scripts/bootstrap.sh` · diagnose: `bash scripts/doctor.sh`

## Repo map

| Dir | Purpose |
|---|---|
| `src/` | App source (Next App Router, features, lib): Area 10 |
| `db/` | Drizzle schema + migrations + seed: Area 9 |
| `infra/` | SST stacks (web, db, iam, dns, monitoring): Area 8 |
| `docs/` | Authoritative docs (specs, ADRs, runbooks, conventions, api): Area 1 |
| `.claude/` | Agent config (rules, commands, skills, agents, hooks): Area 2 |
| `.github/` | CI, CODEOWNERS, rulesets, workflows: Area 3 |
| `scripts/` | Local dev utilities (bootstrap, doctor, db-reset): Area 7 |
| `tests/` | E2E (Playwright), fixtures, helpers: Area 11 |
| `.planning/` | GSD throwaway, deleted at v1.01.000 |

Full structure: [`docs/specs/000-REPO-TEMPLATE.md`](docs/specs/000-REPO-TEMPLATE.md)

## Links

- [VISION.md](VISION.md) · why this exists
- [STATE.md](STATE.md) · current milestone, blockers, KPIs
- [ARCHITECTURE.md](ARCHITECTURE.md) · system overview
- [CONTRIBUTING.md](CONTRIBUTING.md) · dev workflow
- [SECURITY.md](SECURITY.md) · vuln disclosure
- [CHANGELOG.md](CHANGELOG.md) · release notes
- [docs/](docs/README.md) · all docs

## License

See [LICENSE](LICENSE).

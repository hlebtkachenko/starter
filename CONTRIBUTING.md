# Contributing

> Self-onboarding for the maintainer + future collaborators. Not OSS guidelines.

## New device walkthrough

```bash
git clone git@github.com:<git-user>/<repo>.git
cd <repo>
mise install                                  # node 24, pnpm, postgres-cli
pnpm install                                  # also runs `lefthook install` via prepare
cp .env.example .env.local                    # or symlink (Conductor)
docker compose up --wait                      # postgres + mailpit
pnpm db:migrate && pnpm db:seed
pnpm dev
```

Diagnose: `bash scripts/doctor.sh`

## Branch + commits

- Branch: `<git-user>/<short>` (≤30 chars, kebab-case).
- Commit format: [Conventional Commits 1.0](https://www.conventionalcommits.org).
- Allowed scopes: see [`commitlint.config.ts`](commitlint.config.ts) (mirrors [`docs/conventions/commit-conventions.md`](docs/conventions/commit-conventions.md)).
- Lefthook enforces format + branch name pre-push.

## PR flow

1. Open PR with conventional title.
2. Fill [PR template](.github/PULL_REQUEST_TEMPLATE.md): confirm checklist.
3. Paired-files check passes ([`.github/related-files.yml`](.github/related-files.yml)).
4. Active handoff at `docs/roadmap/handoffs/HANDOFF-<branch>.md` is up to date.
5. CI green: `ci.yml` (lint/typecheck/build), `pr-checks.yml` (title/paired/handoff/size), `claude-review.yml`.
6. Merge to `master`. Handoff auto-deleted on merge.

## Quality gates

| Gate | Tool | Where |
|---|---|---|
| Format | Biome | pre-commit + CI |
| Lint | ESLint flat | pre-commit + CI |
| Typecheck | tsc | pre-push + CI |
| Secrets scan | gitleaks | pre-commit |
| Commit msg | commitlint | commit-msg |
| Branch name | regex | pre-push |
| Tests | Vitest + Playwright | CI |
| Dead code | knip | CI (warn day 1) |

## Where to find what

See [AGENTS.md](AGENTS.md) "Doc scope" table.

## Release

Tag-driven via [`release.yml`](.github/workflows/release.yml). Manual cut via `/ship` skill until release-please ready. CHANGELOG entries follow [Keep a Changelog 1.1](https://keepachangelog.com/en/1.1.0/).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Claude entry

> Single source of truth for agent context.

## Stack

Next 16.2.4 · React 19.2.4 · TS 5 (target 6) · Tailwind v4 · pnpm 10 · PostgreSQL 18 · Drizzle ORM · Better Auth (email + organization plugin) · SST on AWS · Sentry.

## Commands

| Task | Command |
|---|---|
| Dev | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` · fix: `pnpm lint:fix` |
| Format | `pnpm format` · check: `pnpm format:check` |
| Typecheck | `pnpm typecheck` |
| Dead code | `pnpm knip` |
| Test (unit) | `pnpm test` |
| Test (e2e) | `pnpm test:e2e` |
| DB migrate | `pnpm db:migrate` |
| DB seed | `pnpm db:seed` |
| Boot digest | `bash .claude/scripts/boot-digest.sh` |
| Safe pull | `pnpm pull` (ff-only, autostash, blocks on untracked-file collisions; `post-merge` hook then reports lockfile, migration, and `.env.example` drift) |

## Doc scope (where to look)

| Need | Look in |
|---|---|
| Why we build | [VISION.md](VISION.md) |
| What's shipping now | [STATE.md](STATE.md) |
| HOW (style + patterns) | [docs/conventions/](docs/conventions/) |
| NOT-DO (hard taboos) | [.claude/rules/](.claude/rules/) |
| WHY a decision | [docs/adr/](docs/adr/) |
| Feature spec | [docs/specs/](docs/specs/) |
| System architecture | [docs/SYSTEM.md](docs/SYSTEM.md) |
| Design tokens | [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) |
| Glossary | [docs/DOMAIN.md](docs/DOMAIN.md) |
| Ops procedure | [docs/runbooks/](docs/runbooks/) |
| API contract | [docs/api/openapi.yaml](docs/api/openapi.yaml) |

## PR contract

- Conventional Commits title (scopes: `auth`, `billing`, `db`, `ui`, `infra`, `docs`, `deps`, `ci`, `tests`, `gates`, `agents`).
- Paired-files satisfied: see [`.github/related-files.yml`](.github/related-files.yml).
- Active handoff at [`docs/roadmap/handoffs/HANDOFF-<branch>.md`](docs/roadmap/handoffs/) (deleted on merge).
- Branch name: `<git-user>/<short>` (≤30 chars).

## Hard rules (no exceptions)

- English only in files, code, comments. Exception: official proper names.
- Hex tokens only (no `oklch`).
- snake_case for PG tables/columns.
- No raw SQL outside `db/` and `src/server/rls.ts`.
- Never log secrets or PII.
- Never commit `.env*` (except `.env.example`), `*.key`, `*.enc`, `client_secret*.json`.
- No em-dash in user-facing communication.
- `.env.local` is a Conductor symlink: don't edit at the symlink end.

Full rules: [.claude/rules/](.claude/rules/README.md)

## Epoch

`.planning/` is GSD-owned, throwaway, deleted at v1.01.000. Canonical sources live in `/` + `docs/`. GSD tools may copy context but never override.

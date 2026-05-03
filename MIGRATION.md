# Migration delta — original template → applied

> Records every deviation from `repo-template.md` introduced when scaffolding this repo. Generated 2026-05-03 on branch `<git-user>/repo-restructure`.

## Source spec

`repo-template.md` (root, v1 with all 11 areas locked) + advisor verdict notes (`.context/attachments/pasted_text_2026-05-03_19-37-10.txt`, F1–F30).

## Verdict adherence

Advisor verdict actions applied:

| ID | Severity | Decision | Where applied |
|---|---|---|---|
| F1 | High | APPLY | All `afframe.com` references replaced with `<domain>` placeholder (Areas 8, infra/dns.ts, infra/README.md, infra/monitoring.ts) |
| F2 | Med | APPLY | `.mcp.json` drops `adm-tools`; `_notes.later` notes "smtp-provider MCP if available" |
| F3 | Med | APPLY | All `eu-central-1` → `<aws-region>`; infra/README.md notes "EU recommended for GDPR" |
| F4 | Low | APPLY | `<git-user>/<short>` placeholder used in branch-naming.md, CONTRIBUTING, AGENTS, lefthook |
| F5 | Med | APPLY | `.claude/skills/_TEMPLATE/SKILL.md` (Anthropic convention) |
| F6 | Low | APPLY | `.planning/README.md` reads "must not override canonical sources" (typo "Don't override" fixed in spirit) |
| F7 | Med | APPLY | `.claude/scripts/_TEMPLATE.sh` added |
| F8 | Med | APPLY | `.github/scripts/_TEMPLATE.sh` added |
| F9 | Low | APPLY | `docs/README.md` header line: "README per dir — required at every significant subdir; route groups + per-feature subfolders may skip" |
| F10 | Low | APPLY-LITE | `db/migrations/README.md` notes `meta/` is auto-managed |
| F11 | High | APPLY | `db/README.md` "Seed scope" + "Production migration execution" sections; `scripts/README.md` "Never deploy-time" section |
| F12 | Med | REJECT | `lefthook.yml` calls binaries directly; comment documents the exception |
| F13 | Med | APPLY | `package.json` `prepare: "lefthook install \|\| true"` |
| F14 | Med | APPLY | `.planning/ROADMAP.md → ../docs/roadmap/ROADMAP.md` symlink created |
| F15 | Med | APPLY | `infra/dns.ts` comment: "Manages ONLY app.<domain> + staging.<domain>. Apex managed externally" |
| F16, F26 | Med | APPLY | Areas 10 + 11 fully built; status `Done` |
| F17 | Low | DEFER | Multi-tenancy + RLS chain deferred to `docs/SYSTEM.md` content phase (covered in `docs/SYSTEM.md` already) |
| F18 | Low | APPLY | `docs/specs/000-REPO-TEMPLATE.md` notes `_TEMPLATE` valid as both file and folder form |
| F19 | Med | APPLY | `src/features/_TEMPLATE/` has required `server/` + `schema.ts`; `ui/` optional (`.gitkeep`) |
| F20 | Low | REJECT | – |
| F21 | Low | DEFER | Sentry sourcemap upload deferred to content phase |
| F22 | Med | APPLY-PARTIAL | `docs/conventions/branch-naming.md` + `docs/conventions/error-envelope.md` added |
| F23 | Low | APPLY | `docs/runbooks/aws-bootstrap.md` |
| F24 | Low | APPLY-LITE | `tests/README.md` notes "no `tests/integration/` — co-located in features" |
| F25 | Low | REJECT | – |
| F27 | Low | REJECT | – |
| F28 | Low | APPLY | `docs/runbooks/gsd-cutover.md` |
| F29 | Med | APPLY | `.github/workflows/handoff-cleanup.yml` tagged `# LATER` in workflow body and README |
| F30 | Low | REJECT | – |

## Build-time deviations from template

The following changes were made beyond the verdict matrix because the existing scaffold (Next 16 + React 19) required them:

| Change | Why | Where |
|---|---|---|
| `middleware.ts` → `proxy.ts` | Next 16 deprecates `middleware` file convention; `proxy` is the new name | `src/proxy.ts` |
| `tsconfig.json` excludes config files (commitlint, knip, vitest, playwright, sst) and `**/_TEMPLATE*` | Their dependency packages are not yet installed; configs are stubs awaiting their respective installs | `tsconfig.json` |
| `tsconfig.json` excludes `infra/`, `db/`, `tests/`, `scripts/` | Same — stubs awaiting drizzle, sst, vitest, etc. | `tsconfig.json` |
| Sentry configs are stub (`export {}`) instead of real init | `@sentry/nextjs` not installed yet; configs document the real init in comments | `src/sentry.*.config.ts`, `src/instrumentation.ts` |
| `lib/db.ts`, `lib/auth.ts`, `lib/logger.ts`, `lib/stripe.ts`, `lib/email.ts`, `lib/rate-limit.ts` ship as stubs | Their packages (`drizzle-orm`, `better-auth`, `pino`, `stripe`, `nodemailer`) are not installed yet; comments document the real shape | `src/lib/*` |
| `db/seed.ts` has stub body | Same — drizzle not installed yet | `db/seed.ts` |
| `tests/helpers/*.ts` ship as stubs | Same — vitest, playwright, drizzle not installed yet | `tests/helpers/*` |
| `zod` installed | Required by `lib/env.ts`, `lib/errors.ts`, `server/actions.ts`, `server/api.ts`, `features/_TEMPLATE/schema.ts` to typecheck | `package.json` |

These stubs document the intended shape so the next dependency-install pass can drop in working code without restructuring.

## Files preserved from existing scaffold

| File | Why preserved |
|---|---|
| `src/app/page.tsx` | Existing landing page; will be replaced when first feature ships |
| `src/app/layout.tsx` | Existing root layout (Geist fonts wired) |
| `src/app/globals.css` | Tailwind v4 + base hex tokens; design system added on top |
| `src/app/favicon.ico` | Existing |
| `public/*.svg` | Existing Vercel template SVGs; will be removed when product branding is added |
| `pnpm-lock.yaml` | Existing |

## Coverage by area

| # | Area | Files written | Verdict applied |
|---:|---|---|---|
| 0 | Root | 9 | – |
| 1 | Docs | 32 (incl. roadmap, specs, adr, runbooks ×10, conventions ×10, api ×6) | F9, F17, F22, F23, F28 |
| 2 | Agents | 22 (.claude/ tree + .mcp.json + .planning/) | F2, F5, F6, F7, F14 |
| 3 | GitHub | 19 (.github/ tree, 9 workflows, 3 ISSUE_TEMPLATEs) | F8, F29 |
| 4 | Dotfiles | 10 | – |
| 5 | Build tooling | 8 (package.json, pnpm-workspace, tsconfig, next.config, eslint, biome, knip, postcss) | F13 |
| 6 | Quality gates | 3 (lefthook, commitlint, gitleaks) | F12 |
| 7 | Local dev | 8 (docker-compose ×2, scripts ×6) | F11 |
| 8 | Deploy / IaC + Obs | 11 (sst.config, Dockerfile, infra ×9) | F1, F3, F11, F15 |
| 9 | Database | 8 (drizzle.config, init.sql, schema/, migrations/, seed) | F11 |
| 10 | App source | 25 (src/app, components, features, server, lib, hooks, types, sentry, proxy + public) | F16, F19 |
| 11 | Tests | 14 (vitest, playwright, tests/{e2e, fixtures, helpers}) | F26 |

**Total files written: ~169** (excludes existing scaffold preserved as noted above).

## Verification

```
pnpm install           # ok
pnpm build             # ok (warning: middleware-to-proxy migration applied)
pnpm lint              # ok (0 errors, 0 warnings)
```

## Outstanding (next session)

Listed for the next dep-install pass:

1. Install `@sentry/nextjs` and replace stub configs with real init.
2. Install `drizzle-orm`, `drizzle-kit`, `postgres`, `better-auth`, `pino` and remove `lib/*` stubs.
3. Install `vitest`, `@playwright/test`, `vite-tsconfig-paths`, `@axe-core/playwright`, `@testing-library/jest-dom`.
4. Install `lefthook`, `@commitlint/cli`, `@commitlint/config-conventional`, `@commitlint/types`, `gitleaks`, `knip`, `@biomejs/biome`.
5. Install `sst` and remove SST config exclusions from `tsconfig.json`.
6. Install `@radix-ui/react-slot`, `class-variance-authority`, `lucide-react`, `react-hook-form`, `@hookform/resolvers` once first UI primitive lands.
7. Generate Better Auth schema (`pnpm exec better-auth generate`) → `db/schema/auth.ts`, `db/schema/orgs.ts`.
8. Replace `<git-user>`, `<domain>`, `<aws-region>`, `<sentry-org>`, `<sentry-project>`, `<smtp-provider>`, `<project-name>`, `<legal-entity>`, `<auth-cookie-name>` placeholders with real values.
9. Run `gh ruleset import .github/rulesets/main.json` once team is ready to enforce branch protection.
10. Bootstrap AWS account per [`docs/runbooks/aws-bootstrap.md`](docs/runbooks/aws-bootstrap.md).

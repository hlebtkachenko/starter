---
id: SPEC-000
title: Repo template
status: locked
owner: maintainer
created: 2026-05-03
updated: 2026-05-03
---

# SPEC-000 — Repo template

> Canonical structure spec. The on-disk source of truth lives at the repo root as `repo-template.md` (when present); this file pins the same shape inside `docs/specs/` for spec-numbering and discoverability.

This spec is **locked** — changes flow through ADRs in [`docs/adr/`](../adr/).

## Areas (all locked)

| # | Area | Notes |
|---:|---|---|
| 0 | Root | README, CLAUDE→AGENTS, ARCHITECTURE, CONTRIBUTING, VISION, STATE, CHANGELOG, SECURITY, LICENSE |
| 1 | Docs | PRODUCT, SYSTEM, DESIGN-SYSTEM, DOMAIN + roadmap/specs/adr/runbooks/conventions/api |
| 2 | Agents | `.claude/` (rules, commands, skills, agents, hooks, scripts), `.mcp.json`, `.planning/` |
| 3 | GitHub | `.github/` — CODEOWNERS, dependabot, related-files, rulesets, ISSUE/PR templates, scripts, workflows |
| 4 | Dotfiles | editorconfig, gitattributes, gitignore, mise, nvmrc, env.example, dockerignore, npmrc, release-please configs |
| 5 | Build tooling | package.json, pnpm-workspace, tsconfig, next.config, eslint, biome, knip, postcss |
| 6 | Quality gates | lefthook, commitlint, gitleaks |
| 7 | Local dev | docker-compose + override stub, scripts/ (bootstrap, doctor, db-reset, tunnel) |
| 8 | Deploy / IaC + Obs | sst.config, Dockerfile, infra/ stacks |
| 9 | Database | db/ — drizzle config, init.sql, schema/, migrations/, seed |
| 10 | App source | src/ — app router groups, components, features slices, server, lib, hooks, types, sentry, middleware + public/ |
| 11 | Tests | vitest, playwright, tests/ (e2e, fixtures, helpers) |

## Conventions baked in

- `_TEMPLATE` prefix is a scaffold seed, never a runtime artifact. Valid as both file (`_TEMPLATE.md/.sh/.ts/.tsx`) and folder (`_TEMPLATE/`).
- Symlinks marked `→`; never edit at the symlink end.
- `<name>` and `...` in trees mean "more of the same kind allowed"; not a commitment to add specific files.
- README required at every significant subdir; route groups + per-feature `server/`/`ui/` may skip.
- Comments on tree lines are the sole authority on slot intent.

## Authority

Conflicts between code and this spec → code is wrong. Open ADR to amend the spec, then update code.

## See also

- Source: [`/repo-template.md`](../../repo-template.md) at root (when present).
- Migration delta: [`/MIGRATION.md`](../../MIGRATION.md) (created post-restructure).

---
branch: hlebtkachenko/area0-cleanup
created: 2026-05-03T21:10:00Z
last_updated: 2026-05-03T21:10:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area0-cleanup

## Goal

Tighten Area 0 (root) of the repo template: drop the AGENTS.md indirection, remove duplicate planning artifacts from root, and promote the spec at `docs/specs/000-REPO-TEMPLATE.md` to be the canonical mirror of the structure spec.

## Current state

- `CLAUDE.md` is now the canonical agent entry (full content; no longer a 1-line `@AGENTS.md` alias).
- `AGENTS.md` removed from tracked tree (moved to `_junk/`).
- `repo-template.md` removed from root (moved to `_junk/`); full content lives at `docs/specs/000-REPO-TEMPLATE.md` with locked frontmatter.
- `MIGRATION.md` moved from root to `docs/runbooks/scaffold-migration.md`.
- All cross-references (`CONTRIBUTING.md`, `CHANGELOG.md`, `docs/runbooks/gsd-cutover.md`, `docs/specs/README.md`) updated.

## Decisions made

- Single-agent stack: only Claude is supported. No `GEMINI.md`, no `AGENTS.md` alias chain. Decision per maintainer.
- Spec file kept under `docs/specs/000-REPO-TEMPLATE.md`, not at root, so root stays only for evergreen product docs (README, VISION, STATE, etc.).
- Migration record demoted to a runbook because it is one-shot scaffold history.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] Continue Area 1 (docs) review next.

## Files touched

- `CLAUDE.md`: now canonical (was alias).
- `AGENTS.md`: removed from tree.
- `repo-template.md`: removed from root.
- `MIGRATION.md` → `docs/runbooks/scaffold-migration.md`.
- `docs/specs/000-REPO-TEMPLATE.md`: full template content + locked frontmatter.
- `docs/specs/README.md`: dropped reference to `repo-template.md` mirror.
- `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/runbooks/gsd-cutover.md`: AGENTS.md → CLAUDE.md.

## Verify

```bash
pnpm typecheck
pnpm lint
ls *.md   # should not list AGENTS.md, MIGRATION.md, repo-template.md
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

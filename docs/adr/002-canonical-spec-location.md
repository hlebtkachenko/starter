---
id: ADR-002
title: Canonical structure spec lives at docs/specs/000-REPO-TEMPLATE.md
status: accepted
date: 2026-05-03
deciders:
  - hlebtkachenko
consulted: []
informed: []
supersedes: ~
superseded_by: ~
---

# ADR-002: Canonical structure spec lives at docs/specs/000-REPO-TEMPLATE.md

## Context

The repo structure spec was authored as `repo-template.md` at the repo root, then mirrored as a stub at `docs/specs/000-REPO-TEMPLATE.md`. The stub carried locked frontmatter; the root copy carried the actual tree and rationale. Two copies meant drift risk, two paths meant agents had to be told which is authoritative for what, and the root path crowded the small "evergreen product docs" slot (README, VISION, STATE, etc.) with a planning artifact.

## Decision drivers

- One canonical path per artifact.
- Root reserved for evergreen, reader-facing docs.
- `docs/specs/` already owns numbered, locked specs (`000` is reserved for the structure spec).
- `_TEMPLATE` and `NNN-` numbering convention already enforced inside `docs/specs/`.

## Considered options

1. **Keep root as canonical, drop the spec stub.** Closest to the original layout; root stays planning-heavy.
2. **Promote `docs/specs/000-REPO-TEMPLATE.md` to canonical, drop the root copy.** Spec lives where specs live; root stays evergreen.
3. **Keep both, add a sync check.** Manual sync risks drift; tooling is over-engineering for one file.

## Decision

We chose **option 2**.

`docs/specs/000-REPO-TEMPLATE.md` now holds the full template content with locked frontmatter. The root `repo-template.md` is removed. Cross-references in `docs/specs/README.md`, `MIGRATION.md` (now `docs/runbooks/scaffold-migration.md`), and the spec's own "See also" section have been updated.

## Consequences

**Positive**

- Single canonical path; no drift between two copies.
- Root stays focused on evergreen reader docs (README, VISION, STATE, ARCHITECTURE, CHANGELOG, SECURITY, CONTRIBUTING, LICENSE).
- Audit tooling (`gsd-cutover.md` references, link checks) only has to know one path.

**Negative / accepted cost**

- Anyone with muscle memory pointing at root `repo-template.md` will need to update bookmarks once.
- The spec is now nested two directories deep, which is one more click for new readers.

**Neutral**

- `MIGRATION.md` was demoted to `docs/runbooks/scaffold-migration.md` in the same change, since it is one-shot scaffold history rather than an evergreen root doc.

## More info

- Spec: [`docs/specs/000-REPO-TEMPLATE.md`](../specs/000-REPO-TEMPLATE.md).
- Migration record: [`docs/runbooks/scaffold-migration.md`](../runbooks/scaffold-migration.md).
- PR: https://github.com/hlebtkachenko/starter/pull/12

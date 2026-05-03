---
branch: hlebtkachenko/area1-docs
created: 2026-05-03T21:30:00Z
last_updated: 2026-05-03T21:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area1-docs

## Goal

Close Area 1 (docs) audit gaps: write the two ADRs that retroactively record decisions already shipped, give `docs/PRODUCT.md` a structured placeholder skeleton, and update SPEC-000 so that the runbooks and conventions tree explicitly lists files that previously sat under `…`.

## Current state

- ADR-001 (single-agent stack: Claude only) and ADR-002 (canonical structure spec lives at `docs/specs/000-REPO-TEMPLATE.md`) added and indexed.
- `docs/PRODUCT.md` rewritten as a section-by-section placeholder skeleton with TBD blocks. Each section names what to fill, no marketing copy.
- SPEC-000 trees for `docs/runbooks/` and `docs/conventions/` updated to enumerate the existing extras (`aws-bootstrap`, `gsd-cutover`, `scaffold-migration`, `branch-naming`, `error-envelope`).

## Decisions made

- Both ADRs marked `accepted` rather than `proposed`: the underlying changes already shipped to master.
- PRODUCT skeleton uses TBD blocks instead of fake content: empty section is honest, fake section is noise.
- Spec extras are enumerated but the trailing `…` is preserved: extras allowed, not capped.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] Continue Area 2 (agents) review next.

## Files touched

- `docs/PRODUCT.md`: placeholder skeleton with 10 numbered sections.
- `docs/adr/001-single-agent-stack.md`: new.
- `docs/adr/002-canonical-spec-location.md`: new.
- `docs/adr/README.md`: index updated (was empty).
- `docs/specs/000-REPO-TEMPLATE.md`: `runbooks/` and `conventions/` trees enumerate existing extras.

## Verify

```bash
pnpm typecheck
pnpm lint
ls docs/adr/   # README + _TEMPLATE + 001 + 002
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

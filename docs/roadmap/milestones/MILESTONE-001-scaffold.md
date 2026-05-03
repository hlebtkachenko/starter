---
id: MILESTONE-001
name: scaffold
status: in-flight
target_date: 2026-05
theme: 2026 Q2 — Scaffold + auth + first paying org
---

# MILESTONE-001 — Scaffold

## Goal

Establish the repo template across all 11 areas, prepared for Better Auth + org plugin + billing slices in following milestones. Repo is agent-native, token-optimized, deploy-ready (SST stacks + Dockerfile present, infra applied later).

## Scope

**In**

- All 11 areas of `docs/specs/000-REPO-TEMPLATE.md` represented in tree.
- Quality gates wired (lefthook, commitlint, gitleaks).
- Local dev one-shot (`scripts/bootstrap.sh`).
- CI workflows green on initial PR.
- Branch protection ruleset deployable via `gh ruleset import`.

**Out**

- AWS deploy actually applied (deferred to MILESTONE-002 entry condition).
- Stripe / mailbox creds populated.
- First feature slice (deferred to MILESTONE-004).

## Acceptance / exit criteria

- [x] Tree matches template; verified by spec diff.
- [x] `pnpm install && pnpm build` green.
- [ ] CI pipeline green on PR.
- [ ] Branch protection live on `master`.

## KPIs

| Metric | Baseline | Target |
|---|---|---|
| Areas covered | 0 / 11 | 11 / 11 |
| Lighthouse perf (placeholder page) | – | ≥90 |

## Phases

| # | Name | Status | Branch | Spec |
|---:|---|---|---|---|
| 1 | Restructure repo to template | in-flight | `<git-user>/repo-restructure` | [`000-REPO-TEMPLATE`](../../specs/000-REPO-TEMPLATE.md) |

## Dependencies

- None.

## Risks

- Breaking-change drift in Next 16 nightly. Mitigation: read `node_modules/next/dist/docs/` before route work.

## Links

- VISION: [../../../VISION.md](../../../VISION.md)
- Spec: [../../specs/000-REPO-TEMPLATE.md](../../specs/000-REPO-TEMPLATE.md)

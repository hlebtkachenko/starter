---
id: ADR-001
title: Single-agent stack — Claude only
status: accepted
date: 2026-05-03
deciders:
  - hlebtkachenko
consulted: []
informed: []
supersedes: ~
superseded_by: ~
---

# ADR-001: Single-agent stack — Claude only

## Context

The original scaffold introduced an `AGENTS.md` file as the canonical agent entry, with `CLAUDE.md` (and a future `GEMINI.md`) acting as 1-line `@AGENTS.md` aliases. The pattern matched a multi-agent posture: keep a tool-neutral source of truth, point each agent's well-known filename at it.

In practice, only Claude is used in this repo. There is no current or planned use of Gemini, Codex, Cursor, or other agent harnesses. The alias chain added an extra hop with no payoff: every reference in the codebase had to mention "AGENTS.md (CLAUDE aliases here)" instead of just "CLAUDE.md", and new contributors had to learn the indirection before they could read the entry doc.

## Decision drivers

- Simplicity for the only reader (Claude + the maintainer).
- Removing dead abstraction surface (`AGENTS.md`, prospective `GEMINI.md`).
- Onboarding cost: the canonical doc should be at the path the agent already looks at by default.
- Consistency with `.claude/`-prefixed tooling already established (rules, hooks, skills, scripts).

## Considered options

1. **Keep `AGENTS.md` as canonical, `CLAUDE.md` as alias.** Tool-neutral; matches OpenAI's `AGENTS.md` proposal; preserves option to add Gemini later.
2. **Make `CLAUDE.md` canonical, drop `AGENTS.md`.** Single source, no indirection; biased to Claude.
3. **Two canonical files, kept in sync by hook.** Theoretically tool-neutral; in practice introduces drift risk and a sync hook that nobody asked for.

## Decision

We chose **option 2**.

`CLAUDE.md` holds the full agent entry content. `AGENTS.md` is removed. No `GEMINI.md`. If a second agent is ever introduced, that change opens a new ADR that supersedes this one.

## Consequences

**Positive**

- One file, one reader, no indirection.
- All cross-references in the repo point to a path that actually contains content.
- `.claude/`-prefixed tooling is now consistent with the entry doc location.

**Negative / accepted cost**

- Adopting a second agent later requires either re-introducing the alias chain (and reverting this ADR) or maintaining duplicate entries.
- Slightly outside the emerging `AGENTS.md` convention; downstream tooling that expects `AGENTS.md` will need a symlink or alias when integrated.

**Neutral**

- `CHANGELOG.md`, `CONTRIBUTING.md`, `docs/runbooks/gsd-cutover.md`, and `docs/specs/000-REPO-TEMPLATE.md` updated to point to `CLAUDE.md`.

## More info

- Affected files: `CLAUDE.md` (now canonical), `AGENTS.md` (removed), `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/runbooks/gsd-cutover.md`.
- PR: https://github.com/hlebtkachenko/starter/pull/12

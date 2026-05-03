# Project subagents

> Specialist subagents invoked by `claude-review.yml` (CI) or by the orchestrator (interactive).

## Format

```yaml
---
name: <kebab-name>
description: <one-line: when to dispatch>
tools: [Read, Bash, Grep, Glob, ...]   # subset of available tools
model: sonnet | opus | haiku
---
```

Body: Role, Capabilities, Triggers (path globs), Output format.

## Index

| Subagent | Trigger paths |
|---|---|
| (none yet — copy `_TEMPLATE.md`) | – |

## Planned roster

When the related code areas exist, add specialists:

| Subagent | Trigger paths | Why |
|---|---|---|
| `tenancy-reviewer` | `db/schema/**`, `src/server/rls.ts` | Catch RLS gaps |
| `migration-reviewer` | `db/migrations/**` | Catch destructive / non-idempotent migrations |
| `billing-reviewer` | `src/features/billing/**` | Catch entitlement drift |
| `security-reviewer` | `src/lib/auth.ts`, `src/middleware.ts`, `infra/iam.ts` | Catch auth + IAM regressions |
| `cost-reviewer` | `infra/**` | Catch cost regressions |

## Conventions

- One responsibility per subagent.
- Output: structured findings (severity, location, suggestion).
- Read-only by default; flag any subagent that needs Edit / Write.

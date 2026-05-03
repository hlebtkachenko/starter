# Project subagents

> Specialists invoked by `claude-review.yml` (CI matrix) or by the orchestrator interactively.

## Style

One responsibility per subagent. Read-only by default. Output is a structured findings list ending with `verdict: BLOCK | FLAG | PASS` so the orchestrator can route.

## Frontmatter

| Field | Notes |
|---|---|
| `name` | kebab-case, matches filename |
| `description` | When to dispatch (one sentence + glob hint) |
| `tools` | Smallest needed set; default `[Read, Grep, Glob, Bash]` |
| `model` | `sonnet` default; `opus` only when reasoning depth pays |

## Index

| Subagent | Trigger paths |
|---|---|
| (none yet: copy `_TEMPLATE.md`) | – |

## Planned roster

| Subagent | Trigger | Why |
|---|---|---|
| `tenancy-reviewer` | `db/schema/**`, `src/server/rls.ts` | Catch RLS gaps |
| `migration-reviewer` | `db/migrations/**` | Catch destructive / non-idempotent SQL |
| `billing-reviewer` | `src/features/billing/**` | Catch entitlement drift |
| `security-reviewer` | `src/lib/auth.ts`, `src/proxy.ts`, `infra/iam.ts` | Catch auth + IAM regressions |
| `cost-reviewer` | `infra/**` | Catch cost regressions |

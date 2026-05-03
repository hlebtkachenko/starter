# .github/

> GitHub configuration: ownership, dependency policy, branch protection, issue + PR templates, CI workflows.

## Layout

| Path | Purpose |
|---|---|
| `CODEOWNERS` | Auto-assign reviewers |
| `dependabot.yml` | Weekly dep bumps |
| `related-files.yml` | Paired-files policy (single source for CLAUDE.md, rules, conventions) |
| `rulesets/main.json` | Branch protection as code |
| `ISSUE_TEMPLATE/` | Issue forms (bug, feature, incident) |
| `PULL_REQUEST_TEMPLATE.md` | PR checklist |
| `scripts/` | CI + lefthook helpers |
| `workflows/` | CI / release / deploy / Claude integrations |

## paths-ignore policy

| Workflow | Ignores |
|---|---|
| `ci.yml` | `.planning/**`, `docs/**`, `*.md`, `.claude/**`, `LICENSE` |
| `pr-checks.yml` | none (always runs) |
| `claude.yml` | none |
| `claude-review.yml` | `.planning/**` only |
| `codeql.yml` | `docs/**`, `*.md` |

## Secrets

| Secret | Used by | Source |
|---|---|---|
| `ANTHROPIC_API_KEY` | `claude.yml`, `claude-review.yml` | Anthropic console |
| `AWS_ROLE_ARN` | `deploy-staging.yml`, `deploy-production.yml` | `infra/iam.ts` output |
| `AWS_REGION` | `deploy-*.yml` | `<aws-region>` |
| `SENTRY_AUTH_TOKEN` | `deploy-*.yml` (sourcemap upload) | Sentry → Auth Tokens |
| `GITHUB_TOKEN` | `release.yml` (release-please) | provided by Actions |

Never echo secrets in workflow logs.

## Scripts boundary

CI scripts live here. Hook scripts live in `.claude/hooks/`. Slash-command scripts in `.claude/scripts/`. Local dev in `scripts/`. See [`.claude/README.md`](../.claude/README.md#scripts-boundary).

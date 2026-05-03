# Workflows

> CI / release / deploy / Claude integrations.

## Index

| Workflow | Trigger | Purpose | Required for merge |
|---|---|---|---|
| [ci.yml](ci.yml) | push, PR | Lint / typecheck / build / test | yes |
| [pr-checks.yml](pr-checks.yml) | PR | Conv title, paired files, handoff, size cap | yes |
| [claude.yml](claude.yml) | issue/PR comment with `@claude` | Dispatch Claude on demand | no |
| [claude-review.yml](claude-review.yml) | PR opened/sync | Auto-review by specialist subagents | yes |
| [codeql.yml](codeql.yml) | PR + weekly | Security scan | no |
| [deploy-staging.yml](deploy-staging.yml) | push master | SST deploy to staging | no (LATER) |
| [deploy-production.yml](deploy-production.yml) | manual + tag | SST deploy to production with approval | no (LATER) |
| [release.yml](release.yml) | push master | release-please bumps + tags | no |
| [handoff-cleanup.yml](handoff-cleanup.yml) | PR closed (merged) | Failsafe handoff prune | no (LATER) |

## Run order on PR

```
ci.yml  ─┐
pr-checks.yml  ─┼─ all green → claude-review.yml ─→ human review → merge
claude-review.yml  ─┘
```

## Cost cap (Claude workflows)

- `claude.yml`: `max_turns: 10`, model defaults to sonnet (opus only on `[deep]` tag).
- `claude-review.yml`: `max_turns: 5` per agent.
- Monthly budget alarm in CloudWatch (placeholder until first invoice baseline).

## Secrets

See [`README.md`](../README.md#secrets).

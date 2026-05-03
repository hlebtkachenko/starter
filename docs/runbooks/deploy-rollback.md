---
title: Deploy rollback
severity: P0–P1
last_drilled: never
related_adrs: []
---

# Deploy rollback

## Symptoms

- Error rate spike on `app.<domain>` after a release.
- Sentry P0 alert.
- `/api/health` failing on new revision.
- p99 latency > 2x baseline.

## Detection

- CloudWatch alarm: `lambda_errors`, `lambda_p99_latency`.
- Sentry release tagged with the bad git SHA.
- `gh run list` shows last `deploy-production.yml` run.

## Diagnosis

1. Identify bad release SHA: `gh release view --json tagName,publishedAt | jq`.
2. Confirm prior known-good SHA from CHANGELOG or release list.
3. Check whether the incident is code (rollback fixes) or data (rollback won't fix).

## Mitigation

```bash
# Rollback via SST: redeploy prior tag
git fetch --tags
git checkout <prior-good-tag>
pnpm install --frozen-lockfile
pnpm deploy:prod
```

For Lambda alias swap (faster), use AWS console: alias `live` → previous version.

## Verification

```bash
curl -fsS https://app.<domain>/api/health
curl -fsS https://app.<domain>/api/ready
gh run list --workflow=deploy-production.yml --limit 1
```

Sentry: confirm error rate falling within 10 min.

## Post-incident

- Open incident issue (template: `incident.yml`).
- Write post-mortem; link from incident issue.
- If a CI check would have caught it, add to `pr-checks.yml`.

# infra/

> SST stacks. Region `<aws-region>` (EU recommended for GDPR; pick `eu-central-1` or `eu-west-1`).

## Stack composition

```
secrets → iam → storage → dns → db → web → monitoring
```

Each file exports the resources downstream stacks reference.

## Per-env matrix

| Stage | DB | Web | Domain | Multi-AZ | Backups | Removal |
|---|---|---|---|---|---|---|
| `<user>` (dev) | RDS t4g.micro | Lambda | `<user>.dev.<domain>` | no | 1 day | remove |
| `staging` | RDS t4g.small | Lambda | `staging.<domain>` | no | 7 days | remove |
| `prod` | RDS m7g.large | Lambda + Fargate fallback | `app.<domain>` | yes | 30 days | retain |

Apex `<domain>` and `www.<domain>` host the marketing site externally: not managed here.

## Bootstrap order

See [`docs/runbooks/aws-bootstrap.md`](../docs/runbooks/aws-bootstrap.md) for first-time setup.

## SMTP

Mailbox-keyed transports: one mailbox per purpose. Repo-instance picks an SMTP provider; this scaffold targets a generic SMTP/465 SSL flow:

| Mailbox purpose | Default address | Used by |
|---|---|---|
| `noreply` | `noreply@<domain>` | Auth verification, transactional ack |
| `support` | `support@<domain>` | User-initiated tickets |
| `admin` | `admin@<domain>` | Internal alarms (CloudWatch SNS sink) |
| `demo` | `demo@<domain>` | Local seed user; never receives prod traffic |

Credentials in AWS Secrets Manager; injected by `secrets.ts`.

## S3 prefix convention

`{app}-{env}-{purpose}` for shared envs (e.g., `<project-name>-prod-assets`).
`{app}-dev-{user}-{purpose}` for per-dev ephemeral (e.g., `<project-name>-dev-alice-uploads`).

Enforced via IAM policy condition (`s3:prefix`).

## DB cascade

Three-layer fallback if RDS Postgres 18 unavailable in the chosen region:

1. **RDS PG 18** (default).
2. **Aurora Serverless v2 PG 17** (if 18 not in region).
3. **Aurora Serverless v2 PG 16** or **Fargate-hosted PG 18** (last resort).

Pin the engine version in `db.ts` and document deviation as ADR.

## Baseline alarms

| Alarm | Threshold | Sink |
|---|---|---|
| `rds_cpu_high` | > 80% for 5 min | SNS → admin mailbox + Slack |
| `rds_storage_low` | < 10 GB free | SNS → admin |
| `lambda_errors` | > 10/min | SNS → admin + Sentry |
| `lambda_p99_latency` | > 1s for 5 min | SNS → admin |
| `pgmq_queue_depth` | > 1000 | SNS → admin |

Extend by adding to `monitoring.ts` + entry in [`docs/runbooks/`](../docs/runbooks/).

## WAF

Not provisioned. Enable when **either** is true:
- A request from a single IP exceeds the per-IP rate limit by 10x for an hour (signal: `rate_limit.exceeded` count in CloudWatch).
- A paid customer SLA requires WAF in their security review.

Until then: per-IP rate limit in `src/lib/rate-limit.ts` is the only abuse defense.

## OIDC trust

GitHub OIDC role assumed by `deploy-*.yml`. Audience: `token.actions.githubusercontent.com:sub` scoped to `repo:<git-user>/<repo>:ref:refs/heads/master` for prod; per-branch for staging.

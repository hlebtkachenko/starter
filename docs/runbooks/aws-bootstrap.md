---
title: AWS bootstrap
severity: one-shot
last_drilled: never
related_adrs: []
---

# AWS bootstrap

> One-shot procedure for first SST deploy. Run once per new AWS account.

## Prerequisites

- AWS account with admin user (used only for bootstrap).
- Domain registered (apex `<domain>` lives elsewhere; we manage `app.` and `staging.` subdomains).
- GitHub repo created.

## Steps

### 1. Hosted zone

If apex `<domain>` is registered at an external registrar:

```bash
aws route53 create-hosted-zone --name <domain> --caller-reference $(date +%s)
```

Take the 4 NS records from the new zone and add them at the registrar.

If `<domain>` is already in Route53, capture the existing zone ID:

```bash
aws route53 list-hosted-zones --query "HostedZones[?Name=='<domain>.'].Id" --output text
```

Pin the zone ID in `infra/dns.ts`.

### 2. SST initial deploy (admin creds)

```bash
export AWS_PROFILE=<bootstrap-profile>
pnpm deploy:staging   # creates: ACM certs, Route53 records for staging.<domain>, S3, RDS, Lambda, CloudFront
```

Wait for ACM DNS validation (~5 min).

### 3. OIDC trust + deploy role

`infra/iam.ts` provisions the OIDC provider + role. Capture the role ARN:

```bash
aws iam list-roles --query "Roles[?contains(RoleName, 'GitHubDeploy')].Arn" --output text
```

### 4. GitHub secrets

```bash
gh secret set AWS_ROLE_ARN --body "<arn-from-step-3>"
gh secret set AWS_REGION --body "<aws-region>"
```

### 5. SMTP credentials

For each mailbox (`noreply`, `support`, `admin`, `demo` @ `<domain>`):

```bash
aws secretsmanager create-secret \
  --name "<app>/<env>/smtp-<purpose>" \
  --secret-string '{"user":"<purpose>@<domain>","pass":"<value>","host":"<smtp-host>","port":"465"}'
```

Reference these in `infra/secrets.ts`.

### 6. Stripe credentials

Once Stripe is in scope:

```bash
aws secretsmanager create-secret --name "<app>/<env>/stripe-api-key" --secret-string "<sk>"
aws secretsmanager create-secret --name "<app>/<env>/stripe-webhook-secret" --secret-string "<whsec>"
```

### 7. Switch CI to OIDC

After verifying `gh secret get AWS_ROLE_ARN`, retire the bootstrap admin user. CI workflows now assume the OIDC role.

### 8. Verify

```bash
curl -fsS https://staging.<domain>/api/health
curl -fsS https://staging.<domain>/api/ready
```

## Region recommendation

EU region recommended for GDPR. `<aws-region>` placeholder in `infra/`; pick `eu-central-1` (Frankfurt) or `eu-west-1` (Ireland) by default.

## Post-bootstrap

- Update `STATE.md` with deploy URLs.
- Open ADR if any deviations from defaults (region, instance class, multi-AZ).
- Set first `last_drilled` date in this runbook.

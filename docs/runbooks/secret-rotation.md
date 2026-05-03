---
title: Secret rotation
severity: P2
last_drilled: never
related_adrs: []
---

# Secret rotation

## Cadence

| Secret | Cadence | Rotates how |
|---|---|---|
| Database password | 90 days | RDS managed secret rotation OR manual + Secrets Manager update |
| Stripe webhook signing | on suspicion | Stripe Dashboard → Developers → Webhooks |
| Stripe API key | 365 days | Stripe Dashboard → API keys |
| SMTP credentials (per mailbox) | 180 days | Provider portal → mailbox settings |
| Sentry auth token | 365 days | Sentry → Settings → Auth Tokens |
| AWS deploy role | n/a | OIDC, no static keys |
| GitHub Actions secrets | on rotation of upstream | `gh secret set` |

## Steps per secret

### Database password

```bash
# 1. Generate
openssl rand -base64 32

# 2. Update in Secrets Manager
aws secretsmanager put-secret-value \
  --secret-id <db-secret-id> \
  --secret-string '{"username":"...","password":"..."}'

# 3. Trigger app redeploy or wait for next deploy
pnpm deploy:prod

# 4. Old password remains valid until next rotation cycle (RDS handles dual)
```

### Stripe webhook signing

1. Stripe Dashboard → endpoint → roll signing secret.
2. Update `STRIPE_WEBHOOK_SECRET` in Secrets Manager.
3. Redeploy.
4. Test: send test event from Stripe Dashboard; confirm 200.

### SMTP credentials

1. Provider portal → mailbox → reset password.
2. Update `SMTP_<purpose>_PASS` in Secrets Manager.
3. Redeploy.
4. Test: trigger transactional email (e.g., `/dev/email-test`); confirm delivery in mailpit (staging) or actual inbox (prod).

### GitHub Actions secrets

```bash
gh secret set ANTHROPIC_API_KEY --body "<value>"
gh secret set AWS_ROLE_ARN --body "<arn>"
```

## Verification

After every rotation:

```bash
curl -fsS https://app.<domain>/api/ready
```

For SMTP: send + receive cycle. For Stripe: send test webhook event.

## Post-rotation

- Revoke old credential at provider (if it doesn't auto-expire).
- Note rotation date in Secrets Manager tags.

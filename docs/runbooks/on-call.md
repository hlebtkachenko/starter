---
title: On-call
severity: meta
last_drilled: never
related_adrs: []
status: LATER
---

# On-call

> **LATER.** Activated when team size > 1 or paying customers > 50.

## Rotation (placeholder)

- Cadence: weekly handoff.
- Hours: business hours initially; 24/7 once SLA tier requires.
- Backup: secondary on-call paired with primary.

## Tools (planned)

- Paging: PagerDuty or Better Stack.
- Status page: status.<domain>.
- Runbooks: this folder.
- Dashboards: CloudWatch + Sentry.

## Escalation (planned)

```
primary on-call → secondary → engineering manager → CTO/founder
```

## Handoff format (planned)

- Open incidents.
- Recent deploys.
- Watch items (regressions, customer-promised fixes).
- Known toil for the week.

## Trigger to flip from LATER → live

- 2+ engineers AND first paying customer with SLA clause.

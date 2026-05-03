---
title: <runbook name>
severity: P0 | P1 | P2 | P3 | meta
last_drilled: YYYY-MM-DD | never
related_adrs:
  - ADR-NNN
---

# <runbook name>

## Symptoms

- <observable signal that triggers this runbook>

## Detection

- Alert source(s): <CloudWatch alarm, Sentry issue, customer report>
- Dashboard(s): <link>

## Diagnosis

1. <command or check>
2. <command or check>

## Mitigation

```bash
<atomic step 1>
<atomic step 2>
```

## Verification

```bash
<command that proves system is healthy>
```

## Post-incident

- File post-mortem: <link or template>
- Update related ADRs.
- Update this runbook with anything new learned.

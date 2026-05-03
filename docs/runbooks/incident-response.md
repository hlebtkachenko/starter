---
title: Incident response
severity: meta
last_drilled: never
related_adrs: []
---

# Incident response

## Severity classification

See [README.md](README.md#severity-scale).

## Response checklist

1. **Acknowledge.** Reply to alert (PagerDuty / Sentry / customer).
2. **Open incident channel.** Slack: `#incident-<short>`. Pin issue link.
3. **Assign roles.**
   - Incident commander (decisions, comms).
   - Investigator (diagnosis).
   - Scribe (timeline, key facts).
4. **Mitigate first, diagnose second.** Apply rollback or feature flag if available.
5. **Communicate.**
   - Internal: every 30 min.
   - External (status page): P0/P1 within 15 min.
6. **Resolve + announce.**
7. **Post-mortem.** Within 5 business days.

## Communication template

```
[<P0/P1/P2>] <short summary>
Impact: <who is affected, how>
Status: <investigating | mitigating | monitoring | resolved>
Workaround: <if any>
Next update: <time>
```

## Post-mortem template

- Timeline (UTC).
- Root cause (technical + organizational).
- Impact (customers, revenue, data).
- What went well.
- What didn't.
- Action items (owner + due date).
- Detection improvements (alarm we wish we had).

Blameless. Focus on systems and signals, not people.

## Escalation

- Current: solo maintainer; no rotation.
- Future: see [`on-call.md`](on-call.md) when team size > 1.

# Runbooks

> Step-by-step procedures for ops scenarios. Drilled, not invented mid-incident.

## Format

- One markdown file per scenario.
- Sections: Symptoms, Diagnosis, Mitigation, Verification, Post-incident.
- Frontmatter: title, severity, last_drilled.

## Severity scale

| Level | Definition | Response |
|---|---|---|
| P0 | Total outage; data loss possible | All hands; comms in 15 min |
| P1 | Major degradation; revenue path broken | On-call paged; 1h triage |
| P2 | Partial degradation; workaround exists | Same-day triage |
| P3 | Cosmetic / single-customer | Backlog |

## Index

| Runbook | Severity | Last drilled |
|---|---|---|
| [deploy-rollback.md](deploy-rollback.md) | P0–P1 | – |
| [db-restore.md](db-restore.md) | P0 | – |
| [incident-response.md](incident-response.md) | meta | – |
| [on-call.md](on-call.md) | meta | LATER |
| [secret-rotation.md](secret-rotation.md) | P2 | – |
| [branch-protection.md](branch-protection.md) | meta | – |
| [aws-bootstrap.md](aws-bootstrap.md) | one-shot | – |
| [gsd-cutover.md](gsd-cutover.md) | one-shot @ v1.01.000 | – |
| [shadcn-primitive-intake.md](shadcn-primitive-intake.md) | meta | 2026-05-06 |
| [showcase-rebuild.md](showcase-rebuild.md) | meta | 2026-05-06 |

## When to write a runbook

- The scenario has happened once or is foreseeable from architecture.
- The fix has more than 2 steps or requires elevated access.
- The diagnosis needs domain knowledge a fresh on-call won't have.

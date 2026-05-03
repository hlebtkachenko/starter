---
title: Database restore
severity: P0
last_drilled: never
related_adrs: []
---

# Database restore

## Symptoms

- Data corruption reported (rows wrong, missing, unauthorized cross-tenant).
- Bad migration shipped (table dropped, column lost).
- RLS bypass evidence in audit logs.

## Detection

- Customer report.
- `/api/ready` failing.
- Replica lag alarm.

## Diagnosis

1. Identify time T just before damage.
2. `aws rds describe-db-instances --db-instance-identifier <id>`: confirm PITR window covers T.
3. Decide: PITR to new instance vs snapshot restore vs targeted backfill.

## Mitigation

### Point-in-time restore (preferred)

```bash
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier <prod-id> \
  --target-db-instance-identifier <prod-id>-pitr-<ts> \
  --restore-time <ISO8601 just before damage> \
  --db-subnet-group-name <subnet-group>
```

1. Wait for instance available.
2. Validate row counts + tenant counts vs prod.
3. Promote: switch SST `infra/db.ts` connection or update RDS Proxy target.
4. Run app smoke tests.

### Snapshot restore

```bash
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier <prod-id>-restore \
  --db-snapshot-identifier <snapshot-id>
```

## Verification

```sql
-- Connect to restored instance
SELECT count(*) FROM organizations;
SELECT count(*) FROM members;
-- Spot-check a known-good org
SELECT * FROM organizations WHERE slug = '<demo-org>';
```

App: `/api/ready` returns 200; tenant isolation spot-check via two seeded orgs.

## Post-incident

- File post-mortem.
- If a migration caused it, add backfill + safety check to `db/migrations/README.md` exceptions list.
- Drill this runbook quarterly: update `last_drilled`.

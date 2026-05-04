---
branch: hlebtkachenko/area8-deploy
created: 2026-05-04T09:30:00Z
last_updated: 2026-05-04T09:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area8-deploy

## Goal

Close Area 8 (deploy / IaC + observability) audit gaps: replace every placeholder we have a real value for, tag every remaining placeholder so it can't ship to prod silently, drop a redundant Dockerfile copy.

## Current state

- Concrete values now backing what we know:
  - `sst.config.ts` app name → `starter`; default region → `eu-central-1` (env override still wins).
  - `infra/iam.ts` repo → `hlebtkachenko/starter`; OIDC sub claim now matches reality.
  - `infra/monitoring.ts` SNS topic + alarm names → `starter-${stage}-…`.
- Placeholders we don't have values for stay literal but are tagged with slot comments:
  - `<domain>` in `infra/dns.ts`, `infra/storage.ts`, `infra/monitoring.ts`.
  - `<smtp-provider>` in `infra/secrets.ts`.
- Dockerfile: dropped the redundant `COPY package.json ./` after the lockfile copy on line 13.

## Decisions made

- Region `eu-central-1` chosen per CLAUDE.md GDPR / EU preference; the runtime check still prefers `process.env.AWS_REGION` so cross-region forks need no edit.
- Did not invent a domain or SMTP provider. Slot comments make it impossible to forget; `route53.getZoneOutput({ name: "<domain>" })` will fail-fast on the first deploy attempt, surfacing the unfilled slot before traffic.
- Slot comment vocabulary aligns with Area 7: `# PROJECT NAME slot`, `# AWS REGION slot`, `# DOMAIN slot`, `# REPO slot`, `# SMTP PROVIDER slot`. Greppable across the whole repo.
- Skipped `infra/dns.ts` line 32 (`records: ["127.0.0.1"]`): already documented as web.ts-wired-after-CloudFront.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When apex domain registered: replace `<domain>` (4 sites) and update `infra/README.md` SMTP table.
- [ ] When SMTP provider chosen: replace `<smtp-provider>` (1 site) and `infra/README.md` `## SMTP` section.
- [ ] Continue Area 9 (database) review next.

## Files touched

- `sst.config.ts`: project name, AWS region.
- `infra/monitoring.ts`: SNS topic + 2 alarm names; admin email tagged.
- `infra/dns.ts`: rootDomain tagged.
- `infra/storage.ts`: CORS origins tagged.
- `infra/iam.ts`: OIDC repo scope.
- `infra/secrets.ts`: smtpHost tagged.
- `Dockerfile`: redundant `COPY package.json` removed.

## Verify

```bash
pnpm typecheck
pnpm lint
grep -rE "(PROJECT NAME|AWS REGION|DOMAIN|REPO|SMTP PROVIDER) slot" sst.config.ts infra/ | wc -l   # 10
grep -rnE "<project-name>|<aws-region>|<git-user>" sst.config.ts infra/                              # empty
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

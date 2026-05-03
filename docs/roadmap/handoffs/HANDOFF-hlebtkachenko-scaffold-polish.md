---
branch: hlebtkachenko/scaffold-polish
created: 2026-05-03T20:30:00Z
last_updated: 2026-05-03T20:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/scaffold-polish

## Goal

Clean the freshly-merged scaffold against four issues the maintainer flagged:
1. Dependabot opened 4 spam PRs against an empty scaffold.
2. Vercel template page + SVGs still on disk.
3. Docs use em-dash everywhere despite the global rule forbidding it.
4. Some content felt unprofessional (placeholder ceremony, invented metrics, duplicate tables).

## Current state

- 4 Dependabot PRs (`#2-#5`) closed; `dependabot.yml` retuned to monthly + 3-PR cap + 2-group split (runtime / tooling).
- `public/{file,globe,next,vercel,window}.svg` removed.
- `src/app/page.tsx` + `layout.tsx` replaced with minimal scaffold (no Vercel branding).
- Em-dash mass-swept across all `*.{md,ts,tsx,yml,yaml,json,jsonc}` files (184 → 0).
- `.claude/{skills,agents,commands,rules}/_TEMPLATE` rewritten in Karpathy style: minimal frontmatter, first-person, concrete paths, no scaffolding ceremony.
- `docs/PRODUCT.md` trimmed from placeholder skeleton to a single "fill before MILESTONE-002" note.
- `docs/SYSTEM.md` tech-debt log emptied (was citing invented metrics); proxy-vs-middleware naming fixed (Next 16).
- `docs/conventions/api-conventions.md` ↔ `error-envelope.md` deduplicated: error-envelope is the single source of truth for envelope, code namespace, and HTTP status mapping.
- `docs/DESIGN-SYSTEM.md` component map cleared of literal `...` row.
- `infra/README.md` WAF + `db/README.md` pgroll: replaced "Add-When-Pain" with concrete trigger conditions.
- `STATE.md` updated to post-merge state.

## Decisions made

- Em-dash → colon (definition contexts) or comma (orphan).
- Skill/agent/command templates use Karpathy-style narrative + numbered steps; no "Overview / Background / Considerations" ceremony.
- Tech-debt logs stay empty until cost is observed (alert fired, customer asked, regression measured).
- Forward-looking error codes are listed as namespace reservations, not as "shipped" entries.

## Blockers

None.

## Next steps

- [ ] Squash-merge.
- [ ] Continue dependency install batch (Sentry, Drizzle, Better Auth, etc.) per `MIGRATION.md`.

## Verify

```bash
pnpm install
pnpm build
pnpm lint
grep -rln "—" --include="*.md" --include="*.ts" --include="*.tsx" --include="*.yml" --include="*.yaml" --include="*.json" --include="*.jsonc" . \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=.context | grep -v "repo-template.md\|pnpm-lock.yaml" | wc -l
# expect 0
```

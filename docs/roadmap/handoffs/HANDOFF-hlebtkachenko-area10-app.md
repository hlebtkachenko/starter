---
branch: hlebtkachenko/area10-app
created: 2026-05-04T10:30:00Z
last_updated: 2026-05-04T10:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area10-app

## Goal

Close Area 10 (app source) audit gaps. Independent advisor (Opus 4.7 1M) verified the original audit and surfaced 4 additional findings; all fixes folded into one PR.

## Current state

**Placeholders replaced (with greppable slot comments):**
- `src/app/layout.tsx` metadata title → `starter` (was literal `<project-name>`).
- `src/app/page.tsx` `<h1>` → `starter` (was literal `<project-name>` rendered to users; advisor catch).
- `public/manifest.webmanifest` name + short_name → `starter`; `_comment_project_name_slot` key acts as the greppable marker since JSON has no comments.
- `src/app/.well-known/security.txt/route.ts` Policy URL → `hlebtkachenko/starter`. `<domain>` retained in body with explicit DOMAIN slot block above the literal.
- `src/lib/auth.ts` `<domain>` comment tagged.
- `public/robots.txt` `<domain>` comment tagged.

**Spec drift fixed:**
- SPEC-000 line 419 `middleware.ts` → `proxy.ts` with note "Next 16 (formerly middleware.ts)".

**Advisor follow-ups (verified independently):**
- `src/lib/logger.ts`: `warn` and `error` now route to `console.warn` / `console.error` so security events aren't silently dropped pre-pino. `info` and `debug` stay no-op.
- `src/server/actions.ts` and `src/server/api.ts`: replaced brittle `"code" in err` duck-typing with `err instanceof AppError`. Both now import `AppError` from `@/lib/errors`. Catches DOMException etc. as `server.internal` instead of misrouting them to envelope.
- `src/proxy.ts` matcher: comment now explains the `.*\..*` exclusion intentionally drops `.well-known/security.txt` because the file is force-static and needs no auth context.

## Decisions made

- Advisor false-positive accepted: `public/manifest.webmanifest` references `/favicon.ico`, but Next 16's app-router serves `src/app/favicon.ico` at `/favicon.ico` automatically. No file move needed; manifest path is correct.
- Used `_comment_project_name_slot` JSON key for manifest because the manifest spec ignores unknown keys — preserves greppability without breaking the manifest.
- Did not pre-create `(auth)/`, `(app)/` route groups, feature dirs (`auth/`, `orgs/`, `billing/`, `email/`, `jobs/`), `hooks/use-*.ts`, `components/ui/button.tsx`, or design icons. All gated on uninstalled deps (better-auth, stripe, shadcn, react-email) per the consistent pattern from Areas 5/7/9.
- `src/app/page.tsx` left as Next-default landing (with text now correct). It belongs inside `(app)/` per spec but Next requires a root page; defer until `(app)/` group lands.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When `pino` lands: drop the noop logger; remove the console fallbacks.
- [ ] When `(app)/` route group lands: move root page or replace with redirect.
- [ ] When apex domain registered: replace `<domain>` everywhere (single grep across `# DOMAIN slot`).
- [ ] Continue Area 11 (tests) review next.

## Files touched

- `src/app/layout.tsx`: title placeholder.
- `src/app/page.tsx`: `<h1>` placeholder.
- `src/app/.well-known/security.txt/route.ts`: Policy URL + DOMAIN slot tag.
- `src/lib/auth.ts`: DOMAIN slot tag.
- `src/lib/logger.ts`: warn/error → console.
- `src/server/actions.ts`: AppError import + instanceof.
- `src/server/api.ts`: AppError import + instanceof.
- `src/proxy.ts`: matcher comment.
- `public/manifest.webmanifest`: name + JSON slot marker.
- `public/robots.txt`: DOMAIN slot tag.
- `docs/specs/000-REPO-TEMPLATE.md`: middleware.ts → proxy.ts.

## Verify

```bash
pnpm typecheck
pnpm lint
grep -rE "<project-name>|<git-user>" src/ public/                                          # empty
grep -rE "(PROJECT NAME|DOMAIN|REPO) slot" src/ public/ docs/specs/000-REPO-TEMPLATE.md    # 7+
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

---
branch: hlebtkachenko/fix-ci-followups
created: 2026-05-08T12:00:00Z
last_updated: 2026-05-08T15:00:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/fix-ci-followups

## Goal

Resolve 3 deferred items from the component registry phase 3 PR.

## Current state

- E2E functional tests tagged @functional, CI runs `--grep @functional` (55 tests, no snapshots)
- MCP registry server activated with @modelcontextprotocol/sdk
- Release-please PR permission enabled via repo settings API

## Decisions made

- E2E split: `--grep @functional` over separate playwright project (simpler, Playwright-native)
- Visual snapshots stay gated until linux baselines captured on runner
- MCP server uses async main() wrapper (CJS compat with tsx)

## Blockers

- None

## Next steps

- [x] Tag functional specs with @functional
- [x] Flip showcase-audit.yml to run `--grep @functional`
- [x] Install @modelcontextprotocol/sdk + uncomment server wiring
- [x] Enable release-please PR creation in repo settings
- [ ] Merge PR

## Files touched

- `.github/workflows/showcase-audit.yml`: e2e step runs functional only
- `src/lib/registry-mcp/server.ts`: full MCP server wiring (was stub)
- `tests/e2e/registry.spec.ts`: @functional tag on describe
- `tests/e2e/cascade.spec.ts`: @functional tag on describe
- `package.json`: @modelcontextprotocol/sdk devDep
- `pnpm-lock.yaml`: lockfile update

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm test --run
pnpm registry:build
echo '' | timeout 5 pnpm tsx src/lib/registry-mcp/server.ts
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).

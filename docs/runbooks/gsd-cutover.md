---
title: GSD cutover (v1.01.000)
severity: one-shot
last_drilled: never
related_adrs: []
---

# GSD cutover (v1.01.000)

> One-shot procedure to retire the GSD epoch. Executed when the project hits v1.01.000.

## What it does

- Retires the `.planning/` directory (GSD throwaway).
- Confirms all canonical context lives in `/` + `docs/`.
- Removes GSD-specific lifecycle hooks from `.claude/hooks/`.

## Pre-flight

```bash
# Confirm version
grep version package.json

# Confirm no PR depends on .planning/ artifacts
gh pr list --json number,headRefName,files
```

## Steps

### 1. Confirm canonical sync

For each item under `.planning/`, verify the canonical equivalent exists:

| GSD item | Canonical home |
|---|---|
| `.planning/PROJECT.md` | `VISION.md` + `docs/PRODUCT.md` |
| `.planning/ROADMAP.md` (symlink) | `docs/roadmap/ROADMAP.md` |
| `.planning/phases/PHASE-NNN-*/SPEC.md` | `docs/specs/<n>-*.md` |
| `.planning/phases/PHASE-NNN-*/PLAN.md` | discarded (execution artifact) |
| `.planning/learnings/*` | promoted into `docs/adr/` or runbooks |
| `.planning/codebase/*` | discarded (cache) |

### 2. Archive

```bash
git archive -o /tmp/gsd-archive-v1.01.000.tar.gz HEAD .planning
mv /tmp/gsd-archive-v1.01.000.tar.gz <off-repo-storage>
```

### 3. Remove

```bash
git rm -r .planning
git commit -m "chore(epoch): retire GSD throwaway at v1.01.000"
```

### 4. Update gitignore

Remove the `.planning/` allow-list lines from `.gitignore` (it was tracked, not ignored). Confirm `.gitignore` reflects post-cutover state.

### 5. Hooks cleanup

Strip GSD-specific logic from:

- `.claude/hooks/session-start.sh` (boot digest still runs; remove handoff auto-resume if GSD-tied).
- `.claude/hooks/stop.sh` (turn-end log still runs; remove `.planning/` writes).

### 6. README sweep

Remove "GSD epoch" mentions from `README.md`, `AGENTS.md`, `STATE.md`.

### 7. Verify

```bash
pnpm build
pnpm test
test ! -d .planning
```

### 8. Tag + release

```bash
git tag v1.01.000
git push --tags
gh release create v1.01.000 --notes "GSD epoch retired."
```

## Post-cutover

- This runbook stays: historical record.
- Future planning lives in `docs/specs/` + `docs/adr/` + `docs/roadmap/`.

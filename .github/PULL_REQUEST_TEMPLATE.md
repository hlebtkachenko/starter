<!--
PR title must follow Conventional Commits (commitlint enforces).
See docs/conventions/commit-conventions.md and docs/conventions/pr-conventions.md.
-->

## What

<one paragraph: what changes from a user's POV>

## Why

<motivation; link to spec / ADR / issue>

- Spec: <link or "n/a">
- ADR: <link or "n/a">
- Issue: <link or "n/a">

## How to test

```bash
# atomic steps a fresh reviewer can run
```

## Screenshots

<for any UI change; before / after>

## Risks

<what could break; mitigations; rollback plan>

## Checklist

- [ ] PR title follows Conventional Commits
- [ ] Paired files satisfied (`.github/related-files.yml`)
- [ ] Active handoff (`docs/roadmap/handoffs/HANDOFF-<branch>.md`) updated
- [ ] `STATE.md` updated if scope changed
- [ ] Tests added / updated
- [ ] Docs updated if behavior changed
- [ ] Runbook touched if ops behavior changed

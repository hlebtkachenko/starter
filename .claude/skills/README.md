# Project skills

> Reusable agent skills scoped to this repo. Loaded on demand.

## Format

Each skill lives in its own folder:

```
skills/<skill-name>/
├── SKILL.md            # main file (frontmatter + body)
├── references/         # optional: deep-dive docs loaded on demand
└── assets/             # optional: scripts, templates the skill ships
```

The main file is always **`SKILL.md`** (matches Anthropic convention; matches `_TEMPLATE/SKILL.md`).

## SKILL.md frontmatter

```yaml
---
name: <skill-name>
description: <one line — used to decide when to load>
when_to_use: |
  <multi-line trigger guidance for the agent>
---
```

Body: Steps, Examples, References, Pitfalls.

## Index

| Skill | Purpose |
|---|---|
| (none yet — copy `_TEMPLATE/`) | – |

## Conventions

- Folder name matches `name` frontmatter.
- Lazy-load: only the index reads frontmatter; full body loaded when invoked.

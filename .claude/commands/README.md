# Project commands

> Repo-local slash commands. Invoked as `/<name>` in Claude Code.

## Format

Markdown file with YAML frontmatter:

```yaml
---
name: <kebab-name>
description: <one-line>
args: optional | required | none
---
```

Body: numbered steps the agent follows + expected output / verification.

## Index

| Command | Purpose |
|---|---|
| (none yet — copy `_TEMPLATE.md` to add) | – |

## Conventions

- Filename matches `name` frontmatter.
- Imperative tone in steps.
- Always end with a verify step (curl, test, status check).

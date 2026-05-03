# Specs

> Per-feature design contracts. Lightweight PRDs.

## Format

- One markdown file per feature.
- Numbered `NNN-<short-name>.md`. Lexical sort. Never reuse a number.
- Numbering reservations:
  - `000`: repo template (locked, do not edit; mirrors `repo-template.md` source).
  - `001+`: features.

## Lifecycle

```
draft → approved → implemented → archived
```

`approved` ⇒ implementation may begin. `implemented` ⇒ shipped + verified. `archived` ⇒ feature removed or superseded; spec retained for history.

## Index

| # | Title | Status | Owner | Last updated |
|---:|---|---|---|---|
| 000 | Repo template | locked | maintainer | 2026-05-03 |

Add new specs by copying [`_TEMPLATE.md`](_TEMPLATE.md), incrementing the number, and registering here.

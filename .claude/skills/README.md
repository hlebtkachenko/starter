# Project skills

> Reusable agent skills scoped to this repo. Folder-per-skill; main file is **`SKILL.md`**.

## Style

Write skills like Karpathy: tiny scope, first-person voice, numbered procedural steps, concrete paths, idempotency notes. No scaffolding ceremony, no nested headers, no "When to use" / "When not to use" sections: let the `description` frontmatter trigger.

Counter-examples to avoid:

- Multi-section skills with "Overview", "Background", "Considerations".
- Vague triggers ("use when working with X"). Pick a concrete signal.
- Steps that aren't atomic actions ("set up the project").

## Layout

```
skills/<skill-name>/
├── SKILL.md         # name + description frontmatter, then steps
├── references/      # optional: docs loaded only when invoked
└── assets/          # optional: scripts, templates the skill ships
```

## Index

| Skill | Trigger |
|---|---|
| (none yet: copy `_TEMPLATE/`) | – |

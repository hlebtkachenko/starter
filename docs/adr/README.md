# ADR — Architecture Decision Records

> Immutable log of accepted architectural decisions. Format: [MADR 4.0](https://adr.github.io/madr/).

## Format

- One file per decision.
- Filename: `NNN-<kebab-decision>.md`. Numbered, lexical sort. Never reuse.
- Frontmatter: status, date, deciders, consulted, informed.
- Body: Context, Decision Drivers, Considered Options, Decision, Consequences, More Info.

## Status flow

```
proposed → accepted → superseded | deprecated
```

- `proposed` may be edited freely.
- `accepted` is **append-only** — change only by writing a new ADR that supersedes.
- `superseded` records the superseding ADR number in frontmatter.

## When to write an ADR

Write when at least one is true:

- Decision affects boundaries (modules, services, packages).
- Decision picks one of multiple viable options.
- Decision is hard to reverse (data shape, license, tenancy model, deploy target).
- Decision overrides a default in a convention or rule.

Skip when: trivial choice, easily reversible, or fully captured by a convention.

## Index

| # | Title | Status | Date |
|---:|---|---|---|
| – | (none accepted yet) | – | – |

Add a new ADR by copying [`_TEMPLATE.md`](_TEMPLATE.md), incrementing the number, and registering here.

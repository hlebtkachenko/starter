# .planning/

> GSD throwaway workspace. **Not** the canonical home of any artifact.

## Ownership

GSD tools (`/gsd-*`) own this directory. Files here are working state, not authority.

## Precedence rules

- `/` and `docs/` are canonical.
- `.planning/` may **copy** context from canonical sources for working convenience.
- `.planning/` must **not** override canonical sources.
- If a `.planning/` artifact disagrees with a canonical source, the canonical source wins; reconcile.

## Lifecycle

- Lives until `v1.01.000`.
- At cutover: archive + delete per [`docs/runbooks/gsd-cutover.md`](../docs/runbooks/gsd-cutover.md).
- After cutover: planning artifacts live in `docs/specs/`, `docs/adr/`, `docs/roadmap/`.

## Symlinks

| Symlink | Target |
|---|---|
| [ROADMAP.md](ROADMAP.md) | [`../docs/roadmap/ROADMAP.md`](../docs/roadmap/ROADMAP.md) |

Never edit at the symlink end; edit at the target.

## Layout (when populated by GSD)

```
.planning/
├── README.md
├── ROADMAP.md → ../docs/roadmap/ROADMAP.md
├── PROJECT.md                  # GSD bootstrap mirror
├── phases/
│   ├── _TEMPLATE/              # SPEC, PLAN, RESEARCH, VERIFICATION, REVIEW
│   └── PHASE-NNN-<name>/       # filled by /gsd-plan-phase
├── codebase/                   # /gsd-map-codebase output
├── patterns/                   # /gsd-pattern-mapper output
├── research/                   # /gsd-phase-researcher output
└── learnings/                  # /gsd-extract-learnings output
```

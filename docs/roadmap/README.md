# Roadmap

> Where we are, where we're going, and what's mid-flight.

## Layout

| File | Purpose |
|---|---|
| [ROADMAP.md](ROADMAP.md) | Milestones in sequence (numbered, sortable) |
| [BACKLOG.md](BACKLOG.md) | Unprioritized ideas pool, categorized |
| [milestones/_TEMPLATE.md](milestones/_TEMPLATE.md) | Scaffold for new milestone |
| [milestones/MILESTONE-NNN-*.md](milestones/) | One file per planned milestone |
| [handoffs/_TEMPLATE.md](handoffs/_TEMPLATE.md) | Scaffold for new handoff |
| [handoffs/HANDOFF-`<branch>`.md](handoffs/) | Per-active-branch state, deleted on PR merge |

## Read order

1. [ROADMAP.md](ROADMAP.md) for sequence + status.
2. Current milestone file for goal + scope + exit criteria.
3. Active handoff for in-flight context.

## Lifecycle

```
BACKLOG idea → promoted to MILESTONE → executed (handoff per branch) → ship → CHANGELOG entry → milestone closed
```

## Cadence

- Milestones reviewed at completion + at every quarter boundary.
- Handoffs updated each session.
- Backlog pruned monthly.

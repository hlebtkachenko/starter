# Branch naming

## Pattern

```
<git-user>/<short>
```

- `<git-user>`: GitHub username (e.g., the maintainer's handle).
- `<short>`: kebab-case, ≤ 30 chars, action-oriented.
- Total branch length ≤ 50 chars.

Enforced by lefthook `pre-push` regex: `^[a-z0-9-]+/[a-z0-9-]+$`.

## Examples

| Good | Why |
|---|---|
| `<git-user>/auth-org-plugin` | concrete, short |
| `<git-user>/billing-stripe-webhook` | scope clear |
| `<git-user>/repo-restructure` | this branch |

| Bad | Why |
|---|---|
| `feature/foo` | no user prefix |
| `<git-user>/Add-Auth` | not kebab-case |
| `<git-user>/the-big-refactor-of-the-billing-system-and-related-bits` | too long |

## Single branch per concern

If a branch starts touching unrelated areas, split before opening the PR. Reviews scale to topic, not LOC.

## Lifecycle

- Created at session start (`/gsd-` flows do this automatically).
- Active handoff at `docs/roadmap/handoffs/HANDOFF-<branch>.md`.
- Squash-merged into `master`.
- Deleted on merge (GitHub setting).

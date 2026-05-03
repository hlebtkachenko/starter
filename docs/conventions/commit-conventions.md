# Commit conventions

## Format

[Conventional Commits 1.0](https://www.conventionalcommits.org).

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

| Type | Meaning |
|---|---|
| `feat` | New user-visible feature |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `chore` | Tooling, deps, repo housekeeping |
| `docs` | Documentation only |
| `test` | Tests only |
| `build` | Build system / dependencies |
| `ci` | CI config / scripts |
| `style` | Formatting (no code change) |
| `revert` | Reverts a prior commit |

## Scopes (locked list)

`auth`, `billing`, `db`, `ui`, `infra`, `docs`, `deps`, `ci`, `tests`, `gates`, `agents`.

Mirrored in `commitlint.config.ts`.

## Subject

- ≤72 chars.
- Imperative mood (`add`, `fix`, `refactor`, not `added`, `fixes`).
- No trailing period.
- No capitalized first word (commitlint: `subject-case` blocks `upper-case`, `pascal-case`).

## Body

- Wrap at 100 cols.
- Explain **why**, not what (the diff shows what).
- Include trade-offs and rejected alternatives if non-obvious.

## Footer

| Footer | Use |
|---|---|
| `BREAKING CHANGE: <desc>` | Major-bump; mirror with `!` after type/scope |
| `Refs: #123` | Issue reference |
| `Co-Authored-By: <name> <email>` | Pair / agent author |

## Breaking marker

```
feat(api)!: drop /v0 endpoints

BREAKING CHANGE: clients on /v0 receive 410 Gone.
```

## Examples

```
feat(orgs): add org switcher dropdown
fix(billing): handle stripe.invoice.payment_failed retry
refactor(db): extract rls helper to src/server/rls.ts
chore(deps): bump next to 16.2.5
docs(conventions): add error-envelope shape
ci: split pr-checks into retryable jobs
```

# Code naming

## Files

| Kind | Pattern | Example |
|---|---|---|
| TS source | `kebab-case.ts` | `rate-limit.ts` |
| TSX component | `kebab-case.tsx` | `org-switcher.tsx` |
| Test (unit, co-located) | `<source>.test.ts` | `rate-limit.test.ts` |
| Test (e2e) | `<flow>.spec.ts` | `auth.spec.ts` |
| Constants module | `<scope>.constants.ts` | `billing.constants.ts` |
| Type-only module | `<scope>.types.ts` | `billing.types.ts` |
| Schema module | `schema.ts` (in feature folder) | `features/billing/schema.ts` |
| Server action module | `<verb>.ts` | `features/orgs/server/invite.ts` |

## Identifiers

| Kind | Pattern | Example |
|---|---|---|
| Variable | `camelCase` | `currentOrg` |
| Function | `camelCase` | `inviteMember()` |
| React component | `PascalCase` | `OrgSwitcher` |
| Type / interface | `PascalCase`, no `I` prefix | `Organization`, not `IOrganization` |
| Enum | `PascalCase` (rare; prefer union literals) | `SubscriptionStatus` |
| Constant | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE` |
| Hook | `use<Name>` | `useOrg`, `useAuth` |

## Imports

Order, separated by blank line:

1. Node built-ins.
2. External packages.
3. `@/` alias internal.
4. Relative (`./`, `../`).
5. Type-only imports last (or grouped via `import type`).

Tooling enforces order: Biome `organizeImports`.

## Exports

- Prefer named exports.
- Default export only when required (Next.js page/route/layout files).
- Co-located component + types: export both named.

## File length

Soft cap **400 lines**. Beyond that, consider splitting by responsibility, not by line count alone.

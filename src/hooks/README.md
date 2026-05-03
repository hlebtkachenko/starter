# hooks/

> React hooks. Client-side. Imports from `@/lib/auth` (browser variant).

## Conventions

- One hook per file. `use-<name>.ts`.
- Hook name `use<Name>` (camelCase after `use`).
- Pure when possible; effects gated by stable deps.

## Index

| Hook | Purpose |
|---|---|
| `use-auth.ts` | Session + user from Better Auth |
| `use-org.ts` | Current organization context |

(Add as feature slices need them.)

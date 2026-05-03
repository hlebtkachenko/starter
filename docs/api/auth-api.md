# Auth API

> Better Auth handles identity + sessions + organization plugin. Catch-all route at `/api/auth/[...all]`.

## Flows

### Email + password (default)

```
POST /api/auth/sign-up   { email, password, name }
POST /api/auth/sign-in   { email, password }
POST /api/auth/sign-out
GET  /api/auth/session
POST /api/auth/verify-email   { token }
POST /api/auth/forgot-password { email }
POST /api/auth/reset-password  { token, password }
```

Better Auth defines exact contracts. Read `node_modules/better-auth/dist/types/` for current shape — this file documents what we customize, not the upstream surface.

### OAuth (LATER)

Wire providers in `src/lib/auth.ts` once a customer asks. Google + GitHub recommended first.

### MFA (LATER → planned in MILESTONE-002)

TOTP via Better Auth plugin. Enrollment UI in `src/features/auth/ui/`.

### SSO / SAML (LATER)

Enterprise plan only. Better Auth has SSO plugin; gate on org plan tier.

## Session

- Cookie name: `<auth-cookie-name>` (set via Better Auth config).
- Cookie domain: `app.<domain>` (and subdomains via dot-prefix when needed).
- Cookie attributes: `Secure; HttpOnly; SameSite=Lax; Path=/`.
- Session TTL: 7 days; rolling refresh on activity.

## Org plugin (multi-tenancy)

```
POST /api/auth/organization/create   { name, slug }
POST /api/auth/organization/invite   { orgId, email, role }
POST /api/auth/organization/accept   { invitationId }
POST /api/auth/organization/switch   { orgId }
GET  /api/auth/organization/list
```

After switch, the session carries `activeOrgId`. `middleware.ts` reads it; `src/server/rls.ts` propagates to PG via `SET LOCAL app.org_id`.

## Errors

Maps to standard envelope ([conventions/error-envelope.md](../conventions/error-envelope.md)):

| Better Auth error | Envelope code | Status |
|---|---|---|
| `INVALID_EMAIL_OR_PASSWORD` | `auth.invalid_credentials` | 401 |
| `SESSION_EXPIRED` | `auth.unauthenticated` | 401 |
| `EMAIL_NOT_VERIFIED` | `auth.email_not_verified` | 403 |
| `ORGANIZATION_NOT_FOUND` | `org.not_found` | 404 |
| `INVITATION_EXPIRED` | `org.invitation_expired` | 410 |

## Rate limits

Auth endpoints rate-limited per-IP (5/min on `sign-in`, 3/min on `sign-up`, 1/hour on `forgot-password`). Implemented in `src/lib/rate-limit.ts`.

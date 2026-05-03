# API versioning

## Strategy

URL versioning. Public consumer API mounted under `/api/v<n>/`.

| Surface | Versioning |
|---|---|
| Server actions | Internal; not versioned (call sites updated together) |
| `/api/auth/**` | Better Auth manages compat |
| `/api/webhooks/**` | Versioned per provider, not by us |
| `/api/v1/**` | Public consumer API |
| `/api/health`, `/api/ready` | Unversioned probes |

## When to bump

Bump major (`v1 → v2`) when at least one is true:

- Removing a field or endpoint.
- Renaming a field.
- Changing a field's type.
- Tightening validation in a non-additive way.
- Changing auth requirement.
- Changing rate-limit class.

Additive changes (new optional field, new endpoint, new optional query param) ship under the existing version.

## Deprecation

When `/v<n>` is deprecated:

1. Announce on changelog + status page.
2. Add `Deprecation: true` and `Sunset: <RFC 1123 date>` headers to all responses on the version.
3. Keep `/v<n>` live for **12 months** from announcement.
4. After sunset: respond `410 Gone` with body pointing to `/v<n+1>` migration.

## Breaking-change definition

A change is breaking if a well-behaved client following the spec at version N would break under the change. If unsure, treat as breaking.

## Migration guide

For each major bump, ship `docs/api/migrations/v<n>-to-v<n+1>.md` covering: field-by-field diff, code samples, deadline.

## Today

Only `/api/health` and `/api/ready` exist; nothing to version. Public `/api/v1/` lights up when the first programmatic consumer asks.

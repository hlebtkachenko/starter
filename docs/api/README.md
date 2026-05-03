# API

> Public + internal API contract. OpenAPI is authoritative; per-area markdown adds context not expressible in OpenAPI.

## Files

| File | Role |
|---|---|
| [openapi.yaml](openapi.yaml) | Machine-readable spec (OpenAPI 3.1). |
| [auth-api.md](auth-api.md) | Token / session / SSO flows. |
| [webhooks-api.md](webhooks-api.md) | Outbound events, signing, retry. |
| [rate-limits-api.md](rate-limits-api.md) | Tier limits, 429 shape, headers. |
| [versioning-api.md](versioning-api.md) | URL versioning + deprecation policy. |

## Source of truth

- Schemas in `openapi.yaml` derived from zod schemas in `src/features/*/schema.ts` via codegen (planned).
- Hand-edits to `openapi.yaml` allowed only for documentation, examples, descriptions.

## Base URLs

| Env | Base |
|---|---|
| Local | `http://localhost:3000/api` |
| Staging | `https://staging.<domain>/api` |
| Production | `https://app.<domain>/api` |

## Authentication

Session cookie (Better Auth) for browser. Bearer token (planned) for programmatic clients. See [auth-api.md](auth-api.md).

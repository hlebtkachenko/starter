# lib/

> Framework-agnostic utilities. No Next-specific imports. Client/server-safe split.

## Split rule

| File | Runs on |
|---|---|
| `env.ts` | Server only (boot-validates) |
| `db.ts` | Server only (`server-only` guard) |
| `auth.ts` | Both (Better Auth provides RSC + browser variants) |
| `logger.ts` | Server only |
| `errors.ts` | Both |
| `rate-limit.ts` | Server only |
| `stripe.ts` | Server only |
| `email.ts` | Server only |

## Env

Consumers import the typed `env` symbol: never `process.env` directly:

```ts
import { env } from "@/lib/env";
console.log(env.DATABASE_URL);   // typed; throws on boot if missing
```

## Logger

`logger` is the parent; create request-scoped child loggers:

```ts
const reqLog = logger.child({ request_id, user_id, org_id });
reqLog.info({ event: "org.created" }, "created org");
```

Never `console.log` in committed server code.

## Errors

`AppError` carries a stable code + message. The action / handler wrapper converts it into the [error envelope](../../docs/conventions/error-envelope.md).

```ts
throw new AppError("org.not_found", "Organization not found", { slug });
```

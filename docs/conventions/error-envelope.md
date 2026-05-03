# Error envelope

> Single error shape across server actions, route handlers, and webhook responders. Consumers can match on `code` without parsing free text.

## Shape

```ts
type ErrorEnvelope = {
  error: {
    code: string;          // stable machine code, snake_case
    message: string;       // human-readable, English, present tense
    details?: unknown;     // optional structured detail (e.g., zod issues)
    request_id?: string;   // request correlation id for support
  };
};
```

Wire format identical for HTTP responses and serialized server-action errors.

## Code namespace

`<area>.<reason>`. snake_case. Stable across releases; renaming is a breaking change.

Codes shipped today (only the ones referenced from code in this repo right now):

| Code | When |
|---|---|
| `validation.failed` | zod parse failed (details = zod issues) |
| `server.internal` | Unhandled error in a wrapper (also reported to Sentry once Sentry is wired) |
| `dependency.unavailable` | `/api/ready` saw a dependency down |

Codes ship as the matching feature lands. Each new code is documented next to its `AppError` call site in the feature `schema.ts`.

Forward-looking namespaces (not yet shipped, listed here so the namespace is reserved):
`auth.*`, `org.*`, `billing.*`, `rate_limit.*`.

## HTTP status mapping

The wrapper in `src/server/api.ts` resolves `AppError.code` to a status by suffix or prefix:

| Code pattern | Status |
|---|---|
| `validation.*` | 400 |
| `auth.unauthenticated` | 401 |
| `auth.forbidden`, `*.subscription_required` | 403 |
| `*.not_found` | 404 |
| `*.conflict` | 409 |
| `rate_limit.*` | 429 |
| `dependency.*` | 503 |
| anything else | 500 |

## Producing

```ts
import { AppError } from "@/lib/errors";

throw new AppError("org.not_found", "Organization not found", { slug });
```

The action / route wrapper catches `AppError` and emits the envelope. Anything else becomes `server.internal` + Sentry capture.

## Consuming

Server action consumers receive `{ data } | { error }`:

```ts
const result = await inviteMember({ orgSlug, email });
if ("error" in result) {
  if (result.error.code === "org.limit_seats") {
    showUpsellBanner();
  }
}
```

## Logging

Logged structured: `{ code, message, request_id, user_id, org_id }`. Never log details that could contain secrets or PII.

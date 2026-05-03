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

`<area>.<reason>` — examples:

| Code | When |
|---|---|
| `auth.unauthenticated` | No valid session |
| `auth.forbidden` | Authed but role / RLS blocks |
| `validation.failed` | zod parse error (details = issues) |
| `org.not_found` | Org slug missing |
| `org.limit_seats` | Org over plan seat limit |
| `billing.webhook_signature_invalid` | Stripe signature mismatch |
| `billing.subscription_required` | Feature gated by paid plan |
| `rate_limit.exceeded` | Rate limiter rejected |
| `server.internal` | Unhandled (also reported to Sentry) |
| `dependency.unavailable` | DB / external down (used by `/api/ready`) |

New codes added by feature; document in feature `schema.ts` next to the error class.

## HTTP status mapping

| Status | Codes that produce it |
|---|---|
| 400 | `validation.*` |
| 401 | `auth.unauthenticated` |
| 403 | `auth.forbidden`, `billing.subscription_required` |
| 404 | `*.not_found` |
| 409 | `*.conflict` |
| 422 | semantic validation (`org.limit_seats`) |
| 429 | `rate_limit.*` |
| 500 | `server.internal` |
| 503 | `dependency.*` |

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

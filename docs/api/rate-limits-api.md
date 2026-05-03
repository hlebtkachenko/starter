# Rate limits

> Per-tier limits. Enforced in `src/lib/rate-limit.ts` (token bucket on a Postgres counter table).

## Tier limits

| Endpoint group | Free | Pro | Enterprise |
|---|---|---|---|
| Auth (per IP) | 5 / min | 5 / min | 5 / min |
| Auth (forgot-pw, per IP) | 1 / hour | 1 / hour | 1 / hour |
| Read API (per session) | 60 / min | 600 / min | 6000 / min |
| Write API (per session) | 30 / min | 300 / min | 3000 / min |
| Webhook (per org) | 100 / min | 1000 / min | unlimited |

Limits are sliding-window over the last 60s.

## Headers

Successful responses include:

```
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 423
X-RateLimit-Reset: 1714780800
```

## 429 shape

```json
{
  "error": {
    "code": "rate_limit.exceeded",
    "message": "Too many requests",
    "details": {
      "limit": 600,
      "remaining": 0,
      "reset_at": 1714780800
    }
  }
}
```

Response includes `Retry-After: <seconds>` header.

## Burst

Bucket capacity = 2× sustained rate (e.g., 600/min sustained allows a 1200-request burst that drains over 2 min).

## Key

| Endpoint group | Key |
|---|---|
| Auth | IP |
| Read / write | session id (auth) or IP (anon) |
| Webhook (outbound) | org id |

## Storage

Postgres counter table `rate_limit_counters` (deterministic across Lambda instances). pgmq is reserved for jobs, **not** counters.

## Per-endpoint overrides

A handler may override its bucket via `rateLimit({ key, limit, window })` wrapper. Document overrides in the feature `schema.ts`.

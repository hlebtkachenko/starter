import "server-only";

// Token bucket on a Postgres counter table. Shared across Lambda instances.
// pgmq is reserved for jobs — not counters.
//
// Stub until db client + counter table land.

export type RateLimitInput = {
  key: string; // e.g., `auth:sign-in:ip:1.2.3.4`
  limit: number; // sustained requests per window
  window_seconds: number; // sliding window length
};

export type RateLimitResult =
  | { ok: true; remaining: number; reset_at: number }
  | { ok: false; limit: number; reset_at: number };

export async function rateLimit(
  _input: RateLimitInput,
): Promise<RateLimitResult> {
  // TODO: implement against rate_limit_counters table.
  return {
    ok: true,
    remaining: Number.POSITIVE_INFINITY,
    reset_at: Date.now(),
  };
}

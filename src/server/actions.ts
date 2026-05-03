import "server-only";
import type { z } from "zod";

// Base server-action wrapper. Once auth + db land, fill in:
//   - resolve session via Better Auth
//   - parse input via zod schema
//   - open DB tx with SET LOCAL app.org_id (rls.ts)
//   - inject child logger with request_id, user_id, org_id
//   - catch AppError → envelope; catch unknown → server.internal + Sentry capture

export type ActionContext = {
  user: { id: string } | null;
  org: { id: string; slug: string } | null;
};

export type ActionResult<T> =
  | { data: T }
  | { error: { code: string; message: string; details?: unknown } };

export function action<I extends z.ZodTypeAny, O>(
  input: I,
  fn: (parsed: z.infer<I>, ctx: ActionContext) => Promise<O>,
) {
  return async (raw: unknown): Promise<ActionResult<O>> => {
    const parsed = input.safeParse(raw);
    if (!parsed.success) {
      return {
        error: {
          code: "validation.failed",
          message: "Input validation failed",
          details: parsed.error.flatten(),
        },
      };
    }

    const ctx: ActionContext = { user: null, org: null };

    try {
      const data = await fn(parsed.data, ctx);
      return { data };
    } catch (err) {
      if (err instanceof Error && "code" in err && typeof err.code === "string") {
        return { error: { code: err.code, message: err.message } };
      }
      return {
        error: { code: "server.internal", message: "Unexpected error" },
      };
    }
  };
}

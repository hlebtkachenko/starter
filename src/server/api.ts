import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";

// Route-handler wrapper. Mirrors actions.ts behavior at HTTP shape.

type Ctx = {
  user: { id: string } | null;
  org: { id: string; slug: string } | null;
};

export function handler<I extends z.ZodTypeAny, O>(
  input: I,
  fn: (parsed: z.infer<I>, ctx: Ctx) => Promise<O>,
) {
  return async (req: Request): Promise<Response> => {
    let raw: unknown;
    try {
      raw =
        req.method === "GET" ? Object.fromEntries(new URL(req.url).searchParams) : await req.json();
    } catch {
      return envelope("validation.failed", "Invalid JSON body", 400);
    }

    const parsed = input.safeParse(raw);
    if (!parsed.success) {
      return envelope("validation.failed", "Input validation failed", 400, parsed.error.flatten());
    }

    const ctx: Ctx = { user: null, org: null };

    try {
      const data = await fn(parsed.data, ctx);
      return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
      if (err instanceof Error && "code" in err && typeof err.code === "string") {
        return envelope(err.code, err.message, statusFor(err.code));
      }
      return envelope("server.internal", "Unexpected error", 500);
    }
  };
}

function envelope(code: string, message: string, status: number, details?: unknown) {
  return NextResponse.json({ error: { code, message, details } }, { status });
}

function statusFor(code: string): number {
  if (code.startsWith("validation.")) return 400;
  if (code === "auth.unauthenticated") return 401;
  if (code === "auth.forbidden" || code === "billing.subscription_required") return 403;
  if (code.endsWith(".not_found")) return 404;
  if (code.endsWith(".conflict")) return 409;
  if (code === "rate_limit.exceeded") return 429;
  if (code.startsWith("dependency.")) return 503;
  return 500;
}

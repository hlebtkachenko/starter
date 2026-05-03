import { NextResponse } from "next/server";

// Readiness probe. Verifies dependencies the app needs to serve traffic.
// Returns 503 + envelope if any check fails.

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "fail"> = {
    db: "ok",
    pgmq: "ok",
  };

  // TODO once db client lands:
  //   try { await db.execute(sql`SELECT 1`); } catch { checks.db = "fail"; }
  //   try { await db.execute(sql`SELECT count(*) FROM pgmq.list_queues()`); } catch { checks.pgmq = "fail"; }

  const failed = Object.entries(checks).filter(([, v]) => v === "fail");
  if (failed.length > 0) {
    return NextResponse.json(
      {
        error: {
          code: "dependency.unavailable",
          message: "One or more dependencies are unavailable",
          details: { failed: failed.map(([k]) => k) },
        },
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ status: "ok", checks }, { status: 200 });
}

import { NextResponse } from "next/server";

// Liveness probe. No DB, no deps. Cheap and always 200 if the process is up.
// Consumers: ALB / CloudFront origin health, CloudWatch synthetic.

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

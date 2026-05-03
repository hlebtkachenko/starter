import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16 proxy (formerly middleware). Runs at the edge before routes render.
// Order: rate-limit (cheapest) → auth check → org resolve → request context.
//
// Scaffold: real implementations land in:
//   src/lib/rate-limit.ts
//   src/lib/auth.ts (Better Auth client)
//   src/server/rls.ts (org context)

export function proxy(_req: NextRequest) {
  // 1. Rate limit (per-IP + per-user): see src/lib/rate-limit.ts
  // 2. Auth check: redirect unauthed (app)/* to /(auth)/login
  // 3. Org resolution: read activeOrgId from session, attach to request context
  // 4. Observability tags: user/org/route (wired via instrumentation.ts)

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except: Next internals, static files, public assets, and webhooks
    // (webhooks verify their own signature and need raw body).
    "/((?!_next/static|_next/image|favicon\\.ico|api/webhooks/.*|.*\\..*).*)",
  ],
};

// Next 16 telemetry entry. Loaded once on server start (per runtime).
//
// Today: stub. Wire Sentry once @sentry/nextjs is installed (see sentry.*.config.ts).
// OTel: skeleton placeholder; activate alongside Sentry when observability stack is set.

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Capture React Server Component errors (Next 15+ surface). Wired once Sentry is installed.
export async function onRequestError(
  _err: unknown,
  _request: { path: string; method: string; headers: Record<string, string> },
  _context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: string;
  },
) {
  // const Sentry = await import("@sentry/nextjs").catch(() => null);
  // Sentry?.captureRequestError(err, request, context);
}

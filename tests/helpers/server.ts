// Spawn an isolated test server on a separate port. Used when a test needs a fresh
// Next runtime (e.g., to assert middleware behavior with a custom env).
//
// Most tests should NOT need this — Playwright's `webServer` config covers the
// common case. Use this only when isolation is unavoidable.

import { type ChildProcess, spawn } from "node:child_process";

export type TestServer = { url: string; close: () => Promise<void> };

export async function startTestServer(
  port: number,
  env: Record<string, string> = {},
): Promise<TestServer> {
  const child: ChildProcess = spawn("pnpm", ["start", "--port", String(port)], {
    env: { ...process.env, PORT: String(port), ...env },
    stdio: "ignore",
  });

  const url = `http://localhost:${port}`;
  await waitFor(`${url}/api/health`);

  return {
    url,
    close: async () => {
      child.kill("SIGTERM");
      await new Promise((r) => setTimeout(r, 200));
    },
  };
}

async function waitFor(url: string, timeoutMs = 30_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(
    `server at ${url} did not become ready within ${timeoutMs}ms`,
  );
}

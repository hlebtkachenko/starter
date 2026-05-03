// Auth fixtures for tests.
//
// Preferred path: drive Better Auth via its public API (`/api/auth/sign-in`) so the
// session cookie is created the same way a real user would.
//
// Escape hatch (test-only): `insertSessionDirect` inserts a session row straight into
// the DB. Use only when API-driven setup is impossible (e.g., bypassing email verify
// in a contrived test). Document the reason in the test body.

export type TestUser = { id: string; email: string };
export type TestSession = { token: string; user_id: string; expires_at: Date };

export async function signInViaApi(
  _baseUrl: string,
  _credentials: { email: string; password: string },
): Promise<TestSession> {
  throw new Error("signInViaApi: not yet wired (waiting on better-auth in lib/auth.ts)");
}

// Test-only escape hatch. Document why API-driven setup wasn't usable.
export async function insertSessionDirect(_user: TestUser): Promise<TestSession> {
  throw new Error("insertSessionDirect: not yet wired (waiting on db client)");
}

import "server-only";

// RLS context propagation. Sets the per-session GUC that policies read.
//
// Usage:
//   await db.transaction(async (tx) => {
//     await setOrgContext(tx, orgId);
//     return tx.select().from(members);
//   });

export async function setOrgContext<T extends { execute: (q: unknown) => Promise<unknown> }>(
  tx: T,
  orgId: string,
): Promise<void> {
  // Drizzle: tx.execute(sql`SELECT set_config('app.org_id', ${orgId}, true)`);
  // Stub until db client lands:
  void tx;
  void orgId;
}

export async function clearOrgContext<T extends { execute: (q: unknown) => Promise<unknown> }>(
  tx: T,
): Promise<void> {
  // tx.execute(sql`SELECT set_config('app.org_id', '', true)`);
  void tx;
}

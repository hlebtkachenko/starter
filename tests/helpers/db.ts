// withRollbackTx — opens a transaction, runs the body, rolls back. No leaked rows.
//
// Usage:
//   import { db } from "@/lib/db";
//   import { withRollbackTx } from "../helpers/db";
//
//   it("creates an org", async () => {
//     await withRollbackTx(db, async (tx) => {
//       const org = await createOrg(tx, { ... });
//       expect(org.id).toBeDefined();
//     });
//   });
//
// Stub until db client lands.

type AnyDb = {
  transaction: <T>(fn: (tx: AnyDb) => Promise<T>) => Promise<T>;
};

export async function withRollbackTx<T>(
  db: AnyDb,
  fn: (tx: AnyDb) => Promise<T>,
): Promise<T> {
  let result!: T;
  let captured: unknown;
  try {
    await db.transaction(async (tx) => {
      result = await fn(tx);
      // Force rollback by throwing a sentinel — caller's result is preserved above.
      throw new RollbackSentinel();
    });
  } catch (err) {
    if (!(err instanceof RollbackSentinel)) {
      captured = err;
    }
  }
  if (captured) throw captured;
  return result;
}

class RollbackSentinel extends Error {
  constructor() {
    super("rollback");
    this.name = "RollbackSentinel";
  }
}

// Idempotent seed for local dev + CI. Never invoked by deploy workflows.
//
// Strategy: upsert by deterministic key (slug or fixed UUID). Re-running this script
// must produce the same DB state, never duplicates. Demo identities use the demo
// SMTP mailbox (demo@<domain>) so they cannot accidentally email real users.
// DOMAIN slot — replace `<domain>` with the apex domain when forking template (matches infra/secrets.ts + infra/dns.ts slots).

import "dotenv/config";

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("seed.ts must not run in production");
  }

  // Once schema lands, replace this stub with:
  //   const { db } = await import("@/lib/db");
  //   const { organizations, members, users } = await import("@/db/schema");
  //   await db.insert(organizations).values({ slug: "demo", name: "Demo Org" }).onConflictDoNothing();
  //   ...

  console.log("seed: stub (no schema yet)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

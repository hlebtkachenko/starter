// tenant-scoped
// Replace with: user-scoped | system

import { sql } from "drizzle-orm";
import { index, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { organizations } from "./orgs";

export const exampleTable = pgTable(
  "example_table",
  {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    org_id: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text().notNull(),

    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    deleted_at: timestamp({ withTimezone: true }),
  },
  (t) => [
    index("idx_example_table_org_id").on(t.org_id),
    index("idx_example_table_deleted_at").on(t.deleted_at).where(sql`${t.deleted_at} IS NULL`),

    pgPolicy("rls_example_table_tenant_isolation", {
      for: "all",
      using: sql`${t.org_id} = current_setting('app.org_id', true)::uuid`,
      withCheck: sql`${t.org_id} = current_setting('app.org_id', true)::uuid`,
    }),
  ],
).enableRLS();

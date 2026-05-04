// Barrel re-export. Consumers: `import * as schema from "@/db/schema"` (via `lib/db.ts`).
//
// Convention (not lint-enforced): every `*.ts` (except `_TEMPLATE.ts`) under
// `db/schema/` should appear below. Reviewer enforces during PR review until a
// knip/eslint rule is added.

export {};

// Examples once generators run:
// export * from "./auth";
// export * from "./auth-policies";
// export * from "./orgs";

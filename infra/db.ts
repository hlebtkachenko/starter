/// <reference path="../.sst/platform/config.d.ts" />

// RDS Postgres 18. RDS Proxy in front (day 1).
// Cascade fallback per infra/README.md: Aurora SLv2 PG 17 → Aurora SLv2 PG 16 / Fargate PG 18.

const stage = $app.stage;
const isProd = stage === "prod";

export const cluster = new sst.aws.Postgres("Db", {
  version: "18",
  storage: isProd ? "100 GB" : "20 GB",
  proxy: true,
  multiAz: isProd,
  performanceInsights: isProd,
  scaling: isProd ? { min: 0.5, max: 4 } : { min: 0, max: 1 },
});

// init.sql (pgmq + citext) is mounted by docker-compose locally.
// On AWS, run via Lambda or RDS Data API once cluster is up:
//   psql "$DATABASE_URL" -f db/init.sql
// Wired as a one-shot step in the deploy workflow before pnpm db:migrate.

-- Base PG 18 setup. Strict minimum — extensions only.
-- Mounted by docker-compose locally. Invoked once post-create on RDS via deploy workflow.
-- New extensions land in numbered migrations (db/migrations/), not here.

CREATE EXTENSION IF NOT EXISTS pgmq;
CREATE EXTENSION IF NOT EXISTS citext;

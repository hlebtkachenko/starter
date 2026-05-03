---
id: SPEC-000
title: Repo template
status: locked
owner: maintainer
created: 2026-05-03
updated: 2026-05-03
---

# Repo template

> Canonical spec for the repo structure.
> Defines every directory and file slot, with inline `#` rationale per line.
> Locked areas describe the **shape**; per-file content suggestions live separately inside each file (Note: TBD before release).
- This file is the spec; the spec is authoritative.
- Conflicts with code → code is wrong; align to spec or open ADR to amend spec.

## How to read

- **Areas** are scoped slices of the tree. Each area is independently lockable.
- **Status** in the index: `Done` = locked + in tree below; `Pending` = scoped but not yet expanded.
- **Tree blocks** under each `## AREA N` use ASCII tree art with inline `#` comments — comment is the sole authority on intent for that file.
- **`_TEMPLATE`** prefix on file/folder = scaffold seed, never loaded as runtime artifact.
- **Symlinks** marked with `→` (e.g., `.planning/ROADMAP.md → ../docs/roadmap/ROADMAP.md`); never copy, never edit at the symlink end.
- **`...`** or **<name>** lines inside a tree mean "more of the same kind allowed"; not a commitment to add specific files.

## How to use

| Situation | Action |
|---|---|
| Scaffolding a new repo from this template | Walk areas in roadmap order; create each file matching its `#` comment. |
| Verifying an existing repo against the spec | Diff repo tree vs each locked area; flag missing/extra slots. |
| Adding a new file slot | Pick the right area; if no fit, propose new area before merging. |
| Changing a locked area | Open ADR (`docs/adr/`); locked = changes need decision record. |
| Working with `.planning/` (GSD) | Treat as throwaway; canonical sources live in root + `docs/`. Delete on v1.01.000 cutover. |

## Index
| # | Area | Status |
|---:|---|---|
| 0 | Root | Done |
| 1 | Docs | Done |
| 2 | Agents | Done |
| 3 | GitHub | Done |
| 4 | Dotfiles | Done |
| 5 | Build tooling | Done |
| 6 | Quality gates | Done |
| 7 | Local dev | Done |
| 8 | Deploy / IaC + Observability | Done |
| 9 | Database | Done |
| 10 | App source | Done |
| 11 | Tests | Done |

## AREA 0 - ROOT

<repo-name>/
├── README.md                          # product elevator, setup quickstart, repo map
├── CLAUDE.md                          # Claude entry: commands, conventions, arch pointer
├── ARCHITECTURE.md                    # overview → pointer to docs/SYSTEM, DESIGN-SYSTEM, DOMAIN, etc.
├── CONTRIBUTING.md                    # workflow + onboarding
├── VISION.md                          # mission, wedge, values
├── STATE.md                           # pinned: current milestone, KPIs, blockers, active handoffs index
├── CHANGELOG.md                       #
├── SECURITY.md                        # 
├── LICENSE                            # 

## AREA 1 - DOCS

├── docs/
│   ├── README.md                      # docs/ index, navigation
│   ├── PRODUCT.md                     # product spec
│   ├── SYSTEM.md                      # back end/front end/architecture details
│   ├── DESIGN-SYSTEM.md               # design system details
│   ├── DOMAIN.md                      # glossary
│   │
│   ├── roadmap/
│   │   ├── README.md                  # explains roadmap structure
│   │   ├── ROADMAP.md                 # milestones sequence overview
│   │   ├── BACKLOG.md                 # ideas pool, unprioritized
│   │   │
│   │   ├── milestones/
│   │   │   ├── _TEMPLATE.md           # milestone template
│   │   │   └── MILESTONE-001-<name>.md          # detailed milestone file
│   │   │
│   │   └── handoffs/
│   │       ├── _TEMPLATE.md           # handoff template
│   │       └── HANDOFF-<branch>.md    # per-branch live state, overwrite-on-update, delete-on-merge
│   │
│   ├── specs/
│   │   ├── README.md                  # explains format + numbering, index, navigation
│   │   ├── _TEMPLATE.md               # spec template
│   │   └── 000-REPO-TEMPLATE.md       # this file, repo structure and overview template (used for health monitoring)
│   │   └── 001-<feature>.md           # numbered, lexical sort
│   │
│   ├── adr/
│   │   ├── README.md                  # explains format + numbering, index, navigation
│   │   ├── _TEMPLATE.md               # ADR template
│   │   └── 001-<decision>.md          # numbered, lexical sort
│   │
│   ├── runbooks/
│   │   ├── README.md                  # explains format, index, navigation
│   │   ├── _TEMPLATE.md               # runbook template
│   │   ├── deploy-rollback.md         #
│   │   ├── db-restore.md              #
│   │   ├── incident-response.md       #
│   │   ├── on-call.md                 #
│   │   ├── secret-rotation.md         #
│   │   ├── branch-protection.md       # explains how to deploy .github/rulesets/main.json via gh ruleset import
│   │   ├── aws-bootstrap.md           # one-shot AWS account + IAM + DNS prep (referenced by ADR-? and infra/README.md)
│   │   ├── gsd-cutover.md             # GSD epoch transition: clean .planning/ at v1.01.000
│   │   ├── scaffold-migration.md      # one-shot record of deviations applied during initial scaffold
│   │   └── ...                        # add per ops procedure
│   │
│   ├── conventions/
│   │   ├── README.md                  # explains format, index, navigation
│   │   ├── code-naming.md             # files, vars, types, tests
│   │   ├── db-conventions.md          # snake_case tables/columns, FK naming, migrations
│   │   ├── api-conventions.md         # route shape, status codes, error envelope
│   │   ├── ui-conventions.md          # component structure, shadcn rules, hex tokens
│   │   ├── test-conventions.md        # co-located unit + tests/e2e
│   │   ├── commit-conventions.md      # conventional commits, scope list
│   │   ├── pr-conventions.md          # conventional PR, scope list
│   │   ├── branch-naming.md           # <git-user>/<short> ≤30 chars, kebab-case (mirrors .claude/rules/global.md)
│   │   ├── error-envelope.md          # canonical {ok, data | error} JSON shape (referenced by api-conventions.md)
│   │   └── ...                        # add per area
│   │
│   └── api/
│       ├── README.md                  # xplains format, index, navigation
│       ├── openapi.yaml               # machine-readable spec
│       ├── auth-api.md                # token/SSO flows for clients
│       ├── webhooks-api.md            # delivery, retries, signing
│       ├── rate-limits-api.md         # tier limits, 429 behavior
│       └── versioning-api.md          # version policy, deprecation
│       └── ...

## AREA 2 - AGENTS

├── .claude/
│   ├── README.md                        # .claude/ structure overview, navigation, clarifies scripts boundary vs .github/scripts/ and root scripts/
│   ├── settings.json                    # permissions allowlist, hooks, env, model defaults (committed)
│   ├── settings.local.json              # per-machine override (gitignored)
│   │
│   ├── rules/                           # area-keyed hard constraints (taboos/invariants)
│   │   ├── README.md                    # explains rule format, index
│   │   ├── _TEMPLATE.md                 # rule file template
│   │   ├── global.md                    # cross-cutting (English-only, no em-dash, etc), PRs must satisfy .github/related-files.yml
│   │   ├── frontend.md                  # UI/Tailwind/shadcn taboos (hex not oklch)
│   │   ├── backend.md                   # NestJS/Next.js, validate at boundaries
│   │   ├── db.md                        # PG 18 snake_case, no raw SQL outside packages/db
│   │   ├── security.md                  # never log secrets, validate at boundaries
│   │   └── tests.md                     # never mock DB in integration
│   │   └── ...                          # 
│   │
│   ├── commands/                        # project slash commands
│   │   ├── README.md                    # explains command format + frontmatter, index
│   │   ├── _TEMPLATE.md                 # slash command template
│   │   └── <name>.md                    # one file per command, kebab-case
│   │
│   ├── skills/                          # project-specific skills
│   │   ├── README.md                    # explains skill format (folder vs flat), index
│   │   ├── _TEMPLATE/                   # skill folder template
│   │   │   └── SKILL.md                 # skill body (YAML frontmatter + instructions)
│   │   ├── <skill-name>/                # folder for skill and references/assets if needed
│   │   │   ├── <bare-skill-name>.md     # main skill file
│   │   │   ├── references/              # optional: deep-dive docs loaded on demand
│   │   │   └── assets/                  # optional: scripts, templates the skill ships
│   │
│   ├── agents/                          # project subagents
│   │   ├── README.md                    # explains subagent format, index
│   │   ├── _TEMPLATE.md                 # subagent template (name, description, tools, model)
│   │   └── <name>.md                    # one file per subagent, kebab-case
│   │
│   ├── hooks/                           # Claude Code lifecycle hook scripts (.sh / .py / .ts all valid)
│   │   ├── README.md                    # event list, stdin/stdout JSON contract, exit codes
│   │   ├── _TEMPLATE.sh                 # hook script template
│   │   ├── session-start.sh             # SessionStart event — boot digest, multi-device cold-start
│   │   ├── user-prompt-submit.sh        # UserPromptSubmit event — auto-inject STATE.md context
│   │   ├── pre-tool-use.sh              # PreToolUse event — gate risky tools (migrations, prod deploy)
│   │   ├── post-tool-use.sh             # PostToolUse event — format on edit (biome + knip)
│   │   └── stop.sh                      # Stop event — turn-end log append to handoff
│   │   └── ...                          # 
│   │
│   ├── scripts/                         # manual/command-invoked utilities (non-lifecycle)
│   │   ├── README.md                    # explains scripts vs hooks boundary, index
│   │   ├── _TEMPLATE.sh                 # script scaffold (matches hooks/_TEMPLATE.sh shape)
│   │   ├── boot-digest.sh               # repo state digest (branch + open PRs + STATE pointers)
│   │   ├── format.sh                    # idempotent biome + knip + eslint-fix runner
│   │   ├── gh-state.sh                  # GitHub state probe (PR statuses, CI, reviews)
│   │   └── ...                          # add per script kind
│
├── .mcp.json                            # single file, grows per trigger areas, github + context7 by default
│
└── .planning/                           # GSD throwaway, temporary, committed until v1.01.000, managed by GSD for GSD tools. Dont overide root/docs files, but can copy their context if needed.

## AREA 3 - GITHUB

├── .github/
│   ├── README.md                          # .github/ structure overview, navigation, paths-ignore policy
│   ├── CODEOWNERS                         # auto-assign reviewers; "* @hlebtkachenko"
│   ├── dependabot.yml                     # weekly bumps, conventional commit prefix, ecosystem groups
│   ├── related-files.yml                  # paired-files rule (single source of truth, referenced by CLAUDE.md + docs + .claude/rules)
│   │
│   ├── rulesets/
│   │   ├── README.md                      # explains ruleset deploy via `gh ruleset import`
│   │   └── main.json                      # branch protection as code (PR-only, review required, status checks)
│   │
│   ├── ISSUE_TEMPLATE/
│   │   ├── README.md                      # explains template usage
│   │   ├── config.yml                     # disable blank issues, link to runbooks
│   │   ├── bug.yml                        # LATER — bug report form
│   │   ├── feature.yml                    # LATER — feature request form
│   │   └── incident.yml                   # LATER — links docs/runbooks/incident-response.md
│   │
│   ├── PULL_REQUEST_TEMPLATE.md           # checklist; references related-files + STATE/handoff updates + pr-conventions
│   │
│   ├── scripts/                           # CI-invoked + lefthook-invoked utilities (distinct from .claude/scripts/, scripts/)
│   │   ├── README.md                      # explains scripts boundary (.github vs .claude vs root), index
│   │   ├── _TEMPLATE.sh                   # script scaffold (matches .claude/scripts/_TEMPLATE.sh shape)
│   │   ├── check-paired-files.sh          # reads related-files.yml; invoked by lefthook + pr-checks.yml
│   │   └── ...                            # add per CI utility
│   │
│   └── workflows/
│       ├── README.md                      # workflow index, run order, secrets list, paths-ignore policy per workflow
│       ├── ci.yml                         # PR + push: pnpm lint/typecheck/build (paths-ignore: .planning, docs, *.md)
│       ├── pr-checks.yml                  # PR-only: jobs for conv title, paired-files, handoff gate, size cap (split jobs for retryability)
│       ├── claude.yml                     # @claude dispatcher in PR/issue comments (anthropics/claude-code-action)
│       ├── claude-review.yml              # auto-review on PR open; routes to .claude/agents/ specialists by changed paths
│       ├── codeql.yml                     # security scan
│       ├── deploy-staging.yml             # 
│       ├── deploy-production.yml          # 
│       ├── release.yml                    # auto CHANGELOG (manual via /ship until release-please ready)
│       └── handoff-cleanup.yml            # failsafe stale-handoff prune if pr-checks leaks
│       └── ...                            #

## AREA 4 - DOTFILES

├── .editorconfig                          # universal: 2-space indent, LF EOL, utf-8, final newline, trim trailing; overrides for *.md (preserve trailing), Makefile (tabs), *.{yml,yaml} (2-space)
├── .gitattributes                         # baseline `* text=auto eol=lf`; binary marks (fonts/images/archives); pnpm-lock.yaml binary linguist-generated; *.sh text eol=lf; *.svg text linguist-detectable=false (don't skew lang stats)
├── .gitignore                             # build (.next, .turbo, .sst, dist, build, out), TS (*.tsbuildinfo, next-env.d.ts), env (.env*, allow .env.example), test (coverage, .nyc_output), OS (.DS_Store, Thumbs.db), IDE (.idea, .vscode/launch.json, docker-compose.override.yml), Conductor (.context/), Claude (.claude/settings.local.json), pnpm (.pnpm-store/), mise (.mise.local.toml), AWS (.aws/config), logs
├── .mise.toml                             # canonical runtime pins (node 24, pnpm, postgres-cli, atlas, sst); CI consumes via jdx/mise-action; replaces ad-hoc nvmrc
├── .nvmrc                                 # CI/Conductor compat shim, mirrors .mise.toml node version
├── .env.example                           # required vars template w/ inline comments; header note: real .env.local is Conductor symlink
├── .dockerignore                          # build inputs — exclude node_modules, .git, .next, .turbo, dist, .env* (allow .env.example), .planning, docs, *.md, .claude, .github, coverage, e2e, tests, Dockerfile*; future-proofs Fargate + local Docker
├── .npmrc                                 # pnpm monorepo config: auto-install-peers, save-exact (Dependabot writes exact anyway), engine-strict, node-linker=isolated, prefer-workspace-packages, link-workspace-packages
├── .gitleaks.toml                         # gitleaks ruleset (allowlist, custom patterns); consumed by lefthook pre-commit hook (Area 6)
├── release-please-config.json             # release-please monorepo config (per-package bump strategy, CC scopes → version bumps); aligns w/ Area 3 release.yml
└── .release-please-manifest.json          # release-please manifest (auto-updated by bot, tracks version per package)

## AREA 5 - BUILD TOOLING

├── package.json                          # scripts (dev/build/lint/typecheck/format/knip + test/db/deploy referenced); deps; engines.node ">=24"; packageManager "pnpm@10.33.2"
├── pnpm-workspace.yaml                   # workspace + ignoredBuiltDependencies (sharp, unrs-resolver); future-proofs packages/* split
├── tsconfig.json                         # strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes + noImplicitOverride; @/* alias; bundler resolution
├── next.config.ts                        # minimal: react-strict, typedRoutes; hardening (standalone, headers, csp) deferred Area 8
├── eslint.config.mjs                     # flat: eslint-config-next core-web-vitals + typescript; parserOptions.projectService=true (no separate tsconfig.eslint.json); ignores .planning, .claude, docs, .next
├── biome.jsonc                           # formatter ONLY (linter.enabled=false to avoid ESLint overlap); ignores match ESLint
├── knip.config.ts                        # dead-code detector; entries: next pages, scripts/, infra/, .claude/scripts/; CI runs as warn day 1
└── postcss.config.mjs                    # @tailwindcss/postcss (Tailwind v4 — CSS @theme inline in src/app/globals.css, no JS config)

## AREA 6 - QUALITY GATES

├── lefthook.yml                          # orchestrator
│                                         #   pre-commit: biome format (staged), eslint --fix (staged), gitleaks protect (staged)
│                                         #   commit-msg: commitlint --edit $1
│                                         #   pre-push: pnpm typecheck (full), branch-name regex (hlebtkachenko/<short>), .github/scripts/check-paired-files.sh
│                                         #   post-merge: pnpm install --frozen-lockfile (auto-run on pnpm-lock.yaml change)
├── commitlint.config.ts                  # @commitlint/config-conventional + scope list (mirrors docs/conventions/commit-conventions.md)
└── .gitleaks.toml                        # secret-scan rules + allowlist (each false positive justified by commit hash); consumed by lefthook pre-commit + Area 3 security workflow

## AREA 7 - LOCAL DEV

├── docker-compose.yml                    # base stack: postgres:18-alpine@sha256:... (with pgmq extension via init.sql), mailpit:v1.20@sha256:...; healthchecks; ${POSTGRES_PORT:-5432} port override; named volume postgres_data
├── docker-compose.override.yml.example   # pre-populated commented stubs (Redis, MinIO, LocalStack, Stripe-CLI) — uncomment when promoted; copy to docker-compose.override.yml (gitignored, see Area 4)
│
└── scripts/                              # dev utilities (boundary: not lifecycle hooks → .claude/hooks/; not CI → .github/scripts/)
    ├── README.md                         # 4-way scripts boundary matrix (root / .claude/scripts / .claude/hooks / .github/scripts)
    ├── _TEMPLATE.sh                      # #!/usr/bin/env bash + set -euo pipefail + usage block + log helpers
    ├── bootstrap.sh                      # idempotent setup: mise install → pnpm install → env-check (.env.local symlink target OR file + required vars from .env.example resolved) → docker compose up --wait → pnpm db:migrate → pnpm db:seed
    ├── doctor.sh                         # read-only diagnostic: mise tools resolved, docker running, postgres healthy + pgmq extension loaded, .env.local valid, ports free (POSTGRES_PORT, 3000), git remote reachable
    ├── db-reset.sh                       # docker compose down postgres + up; drop schema; pnpm db:migrate; pnpm db:seed
    ├── tunnel.sh                         # cloudflared quick tunnel for webhook testing (Stripe etc); prints HTTPS URL
    └── ...                               #

## AREA 8 - DEPLOY / IAC + OBSERVABILITY

├── sst.config.ts                         # entry: stages (staging, prod, per-dev ephemeral via `sst dev`); region eu-central-1; links infra/* stacks; provider versions pinned
├── Dockerfile                            # Next 16 standalone multi-stage (deps → build → runtime); fallback for Lambda container if Node 24 not GA on Lambda; also usable for Fargate
│
└── infra/
    ├── README.md                         # stack composition, deployment order, per-env config matrix; SMTP via adm.tools (mail.adm.tools:465 SSL; mailbox-per-purpose convention noreply/support/superadmin/demo @afframe.com); S3 prefix `{app}-{env}-{purpose}` + `{app}-dev-{user}-{purpose}`; hosted zone bootstrap order; 3-layer DB cascade (RDS PG 18 → Aurora SLv2 PG 17 → Aurora SLv2 PG 16 / Fargate PG 18); WAF deferred Add-When-Pain; baseline alarms + extension policy; OIDC trust audience
    ├── web.ts                            # SST Nextjs construct (Lambda primary; container image fallback if Node 24 unsupported); CloudFront default; ACM + Route53 alias via dns.ts
    ├── db.ts                             # RDS Postgres 18 (cascade fallback per README); pgmq extension provisioned via Area 9 db/init.sql post-create
    ├── secrets.ts                        # AWS Secrets Manager bindings; SST Secrets construct → Lambda env; holds adm.tools SMTP creds
    ├── iam.ts                            # GitHub OIDC trust policy + deploy IAM role (no static AWS keys); referenced by Area 3 deploy-*.yml; sub claim scoped to repo + master branch
    ├── storage.ts                        # S3 buckets per env (assets, user-uploads); CORS + lifecycle; prefix convention enforced by README
    ├── monitoring.ts                     # CloudWatch baseline alarms (RDS CPU/storage, Lambda errors, p99 latency, pgmq queue depth); SNS → adm.tools superadmin@ mailbox + Slack; Sentry release-tracking env; extends per docs/runbooks/ entries
    └── dns.ts                            # Route53 records + ACM certs per env (staging.<domain>, app.<domain>); hosted zone imported (bootstrap order in README + docs/runbooks/aws-bootstrap.md)

## AREA 9 - DATABASE

└── db/
    ├── README.md                         # structure, ORM (Drizzle), conventions, migration flow (better-auth generate → drizzle-kit generate → migrate), zero-downtime policy (maintenance window pre-PMF; pgroll Add-When-Pain post-PMF), multi-tenancy via Better Auth organization plugin (org_id = organization.id; RLS day 1), RLS scope tiers (tenant=org_id, user-scoped=user_id, system=no RLS), connection pooling (Area 8 RDS Proxy day 1), extensions policy (init.sql = strict minimum; future via migrations), seed scope (local + CI; never staging/prod), production migration execution (separate CI job before web deploy)
    ├── drizzle.config.ts                 # drizzle-kit config: dialect=postgresql, schema=./db/schema/*, out=./db/migrations, casing=snake_case, dotenv from .env.local
    ├── init.sql                          # base PG setup: CREATE EXTENSION pgmq + citext; mounted by Area 7 docker-compose + invoked by Area 8 infra/db.ts post-create
    │
    ├── schema/                           # Drizzle schema files (one per domain); snake_case tables/columns; RLS policies inline via pgPolicy
    │   ├── README.md                     # naming, FK pattern (<table>_id), index patterns, RLS scope tiers (tenant/user-scoped/system), timestamps, soft-delete, plugin-file-split rule (flat day 1, promote to schema/auth/* when plugin count >3)
    │   ├── _TEMPLATE.ts                  # schema template: org_id UUID NOT NULL FK (tenant tables), index on (org_id), RLS enabled + policy block, created_at/updated_at w/ $onUpdate, deleted_at nullable + partial index, ID via gen_random_uuid() PG 18 native, // tenant-scoped | // user-scoped | // system marker
    │   ├── index.ts                      # barrel re-export of all schema for `import * as schema from "@/lib/db"`
    │   ├── auth.ts                       # generated by `better-auth generate` (core: user, session, account, verification); never hand-edit; system-table scope
    │   ├── auth-policies.ts              # RLS policies supplementing auth.ts (user-scoped on sessions/accounts); hand-edit allowed; preserved across `better-auth generate` runs
    │   ├── orgs.ts                       # generated by `better-auth generate` organization plugin (organization, member, invitation); multi-tenancy core; org_id = organization.id
    │   └── ...                           # add per Area 10 feature (billing, projects, etc) — tenant-scoped tables w/ org_id FK + RLS
    │
    ├── migrations/                       # auto-generated by drizzle-kit; hand-edit allowed only for documented exceptions (RLS policy refinement, backfill data steps, CREATE INDEX CONCURRENTLY)
    │   ├── README.md                     # generation flow, hand-edit exceptions list w/ examples, conflict resolution, journal explanation, RLS migration ordering (ALTER → backfill → NOT NULL → ENABLE RLS → policy)
    │   ├── meta/                         # drizzle-kit metadata (journal, snapshots) — never hand-edit
    │   └── 0000_<name>.sql               # numbered, lexical sort
    │
    └── seed.ts                           # idempotent seed for local dev + CI: upsert by deterministic key (slug, fixed UUID); demo organization + member + user using adm.tools demo@afframe.com mailbox; never run on staging/prod deploys

## AREA 10 - APP SOURCE

├── src/
│   ├── app/                              # Next 16 App Router; serves only app.<domain> subdomain (marketing site lives externally on apex)
│   │   ├── (auth)/                       # auth route group: login, signup, verify, reset
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── ...
│   │   ├── (app)/                        # authed route group: dashboard, settings, org-scoped pages
│   │   │   ├── layout.tsx                # auth gate + org context provider
│   │   │   ├── page.tsx                  # dashboard
│   │   │   ├── settings/                 # per-feature settings pages
│   │   │   └── ...
│   │   ├── api/                          # route handlers
│   │   │   ├── auth/[...all]/route.ts    # Better Auth catch-all (Area 9 generated schema consumer)
│   │   │   ├── webhooks/                 # external system callbacks (thin: verify signature, route to features/<x>/webhooks.ts)
│   │   │   │   ├── stripe/route.ts       # Stripe events → features/billing/webhooks.ts
│   │   │   │   └── ...
│   │   │   ├── health/route.ts           # liveness; CloudWatch + ALB consumer; no DB
│   │   │   └── ready/route.ts            # readiness; checks DB + pgmq queue depth
│   │   ├── .well-known/
│   │   │   └── security.txt/route.ts     # vuln disclosure standard (RFC 9116); complements root SECURITY.md
│   │   ├── layout.tsx                    # root layout: fonts, Sentry providers, Tailwind globals
│   │   ├── error.tsx                     # segment error boundary
│   │   ├── global-error.tsx              # root-layout error fallback (Next 16; production-required)
│   │   ├── not-found.tsx                 # global 404
│   │   ├── globals.css                   # Tailwind v4 @import + @theme inline (hex tokens, mirrors docs/DESIGN-SYSTEM.md)
│   │   └── favicon.ico                   # see public/ for full icon set
│   │
│   ├── components/
│   │   ├── README.md                     # primitives vs composed; shadcn-first; hex tokens only
│   │   └── ui/                           # shadcn primitives (kebab-case files)
│   │       ├── _TEMPLATE.tsx             # primitive template (Slot pattern, variant via cva)
│   │       ├── button.tsx
│   │       └── ...
│   │
│   ├── features/                         # feature slices (single source of business logic)
│   │   ├── README.md                     # slice anatomy (server/, ui/, schema.ts); when to extract to packages/; Better Auth wrapper boundary (no re-implementation of auth.api.*); features/jobs/ migration trigger to packages/jobs/ when worker isolation needed
│   │   ├── _TEMPLATE/                    # feature folder template
│   │   │   ├── server/                   # actions, queries, services
│   │   │   ├── ui/                       # feature UI components
│   │   │   └── schema.ts                 # Zod schemas (forms + API contracts)
│   │   ├── auth/                         # UI + custom flows (org-creation-on-signup, MFA UX); thin wrappers around Better Auth auth.api.*
│   │   │   ├── server/                   # wrapper actions, session helpers
│   │   │   ├── ui/                       # login form, signup form, MFA enrollment
│   │   │   └── schema.ts
│   │   ├── orgs/                         # tenancy UI: org switcher, members, invites; thin wrappers around Better Auth org plugin
│   │   │   ├── server/
│   │   │   ├── ui/
│   │   │   └── schema.ts
│   │   ├── billing/                      # Stripe (triggers `.mcp.json += stripe`)
│   │   │   ├── server/                   # subscription/portal handlers
│   │   │   ├── ui/                       # plan picker, billing portal link
│   │   │   ├── webhooks.ts               # HMAC verify + event router consumed by app/api/webhooks/stripe
│   │   │   └── schema.ts
│   │   ├── email/                        # transactional email; mailbox-keyed transports (configured via env per repo instance)
│   │   │   ├── server/                   # send.ts (per-mailbox transport from <smtp-provider>; mailbox purposes: noreply/support/admin/demo); template renderer
│   │   │   ├── templates/                # React Email .tsx templates per email type
│   │   │   └── schema.ts
│   │   └── jobs/                         # pgmq workers (Area 9 init.sql provisions queue); SST scheduled function poller — monitor invocations, switch tick or move to packages/jobs/ post-PMF
│   │       ├── server/                   # worker entry (5s tick poll pgmq)
│   │       ├── handlers/                 # one file per job type
│   │       └── schema.ts
│   │
│   ├── server/                           # cross-feature server-only utilities (NO business logic; that lives in features/)
│   │   ├── README.md                     # boundary: never client-imported (use "server-only" guard)
│   │   ├── actions.ts                    # base server-action wrapper (auth + zod + RLS context)
│   │   ├── api.ts                        # API response/error envelope helpers
│   │   └── rls.ts                        # SET LOCAL app.org_id per query session
│   │
│   ├── lib/                              # framework-agnostic utils (client/server-safe split; no Next-specific imports)
│   │   ├── README.md                     # client/server-safe split; consumers use exported `env` not process.env
│   │   ├── env.ts                        # zod env validation; parse + freeze; throws on boot; exports typed `env` (no separate types/env.d.ts)
│   │   ├── db.ts                         # Drizzle client singleton; imports `@/db/schema` (Area 9 barrel); RDS Proxy connection in prod
│   │   ├── auth.ts                       # Better Auth client export (RSC + browser variants); cookie domain scoped to app.<domain>
│   │   ├── logger.ts                     # pino instance + req-bound child loggers; pretty in dev, JSON in prod
│   │   ├── errors.ts                     # AppError class, error envelope, status mappings
│   │   ├── rate-limit.ts                 # token bucket via Postgres counter table (shared across Lambda instances; pgmq reserved for jobs, not counters)
│   │   ├── stripe.ts                     # Stripe SDK singleton
│   │   └── email.ts                      # nodemailer transports keyed by mailbox purpose; provider-agnostic — SMTP creds resolved from Area 8 secrets.ts
│   │
│   ├── hooks/                            # React hooks (client-side)
│   │   ├── README.md
│   │   ├── use-auth.ts                   # session + user from Better Auth
│   │   ├── use-org.ts                    # current org context
│   │   └── ...
│   │
│   ├── types/                            # shared TS types (NO env.d.ts — env types from lib/env.ts via z.infer)
│   │   ├── README.md
│   │   └── ...
│   │
│   ├── instrumentation.ts                # Next 16 telemetry entry: Sentry register; OTel placeholder skeleton (not active per Area 8 lock)
│   ├── sentry.client.config.ts           # client init: DSN, replay, tracing sample rate
│   ├── sentry.server.config.ts           # server init: DSN, profiling, integrations
│   ├── sentry.edge.config.ts             # edge runtime init
│   └── middleware.ts                     # rate-limit (per-IP+per-user) + auth check (redirect unauthed to /(auth)/login) + org resolution (from session) + Sentry request context (tag user/org/route); no marketing-redirect — marketing site external
│
└── public/
    ├── favicon.ico
    ├── icon.svg                          # adaptive icon
    ├── apple-icon.png                    # 180×180
    ├── opengraph-image.png               # 1200×630
    ├── manifest.webmanifest               # PWA manifest
    └── robots.txt                        # `User-agent: *` + `Disallow: /` — app subdomain not for indexing; sitemap dropped (no public pages on app subdomain)

## AREA 11 - TESTS

├── vitest.config.ts                      # config: projects (ui=jsdom for client components only — RSC paths via Playwright; server=node); setupFiles per project; coverage v8 per-path thresholds (lib/server 80%, features/server 70%, components 30%, default 50%); tsconfig path aliases via vite-tsconfig-paths
├── playwright.config.ts                  # config: chromium local + full matrix CI; baseURL from env; retries 2 in CI / 0 local; parallel; storageState for authed; webServer env-based (`pnpm dev` local, `pnpm build && pnpm start` in CI); reuseExistingServer in dev only
│
└── tests/
    ├── README.md                         # test pyramid policy (unit co-located, integration in features, e2e here); txn-rollback rule via withRollbackTx wrapper (never mock DB in integration); fixture lifecycle; a11y scan via @axe-core/playwright per spec
    ├── e2e/                              # Playwright specs (critical flows only; non-critical via integration tests)
    │   ├── README.md                     # e2e scope: critical flows (auth, orgs, billing, webhooks)
    │   ├── _TEMPLATE.spec.ts             # spec template: tag, fixture import, page object pattern, axe-core a11y scan step
    │   ├── auth.spec.ts                  # signup → verify email (mailpit) → login
    │   ├── orgs.spec.ts                  # org create → invite → member accept (Better Auth org plugin flow)
    │   ├── billing.spec.ts               # plan select → checkout → webhook → entitlement applied
    │   └── ...                           # add per critical flow
    │
    ├── fixtures/                         # shared deterministic test data (TS not JSON for type safety against Drizzle schema)
    │   ├── README.md                     # TS fixtures import schema types from @/db; never drift; importable in Vitest + Playwright
    │   ├── _TEMPLATE.ts                  # fixture template (typed export const)
    │   ├── orgs.ts                       # typed org fixtures
    │   └── users.ts                      # typed user fixtures
    │
    └── helpers/                          # test utilities
        ├── README.md
        ├── db.ts                         # withRollbackTx(db, async (tx) => {...}) wrapper using Drizzle db.transaction(); BEGIN before, ROLLBACK after; tests use tx not raw db
        ├── auth.ts                       # API-driven session fixture (preferred); direct DB session insert escape hatch (test-only)
        ├── mailpit.ts                    # query mailpit HTTP API for email assertions in e2e
        └── server.ts                     # spawn isolated test server (separate port)

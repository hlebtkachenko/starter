# docs/

> Authoritative project documentation. Source of truth for product, system, and operations.

## Map

| Path | Purpose | Audience |
|---|---|---|
| [PRODUCT.md](PRODUCT.md) | Personas, JTBD, feature matrix, positioning | PM, founder, sales |
| [SYSTEM.md](SYSTEM.md) | Backend + frontend architecture, data flow, tech-debt log | Engineers, agents |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Color (hex), type, spacing, components, motion | Designers, frontend |
| [DOMAIN.md](DOMAIN.md) | Glossary, ER diagram, lifecycle states | All |
| [roadmap/](roadmap/README.md) | Milestones, backlog, per-branch handoffs | All |
| [specs/](specs/README.md) | Feature specs (numbered, lexical sort) | Engineers |
| [adr/](adr/README.md) | Architecture decision records | Engineers, agents |
| [runbooks/](runbooks/README.md) | Ops procedures (deploy, restore, rotate, incident) | On-call, ops |
| [conventions/](conventions/README.md) | HOW we write code (naming, db, api, ui, tests, commits) | Engineers, agents |
| [api/](api/README.md) | API contract (OpenAPI + per-area notes) | API consumers |

## Update cadence

| Doc | Cadence |
|---|---|
| `STATE.md` (root) | Each session |
| `PRODUCT.md`, `VISION.md` (root) | Per milestone |
| `SYSTEM.md`, `DESIGN-SYSTEM.md`, `DOMAIN.md` | When changed; ADR if breaking |
| `roadmap/ROADMAP.md` | Per milestone |
| `specs/<n>-*.md` | Per feature |
| `adr/<n>-*.md` | Append-only, never edit accepted |
| `runbooks/*.md` | After each incident drill |
| `conventions/*.md` | ADR required to change |
| `api/openapi.yaml` | Generated from code; per release |

## README per dir

Required at every significant subdir. Route groups (`(auth)/`, `(app)/`) and per-feature subfolders (`server/`, `ui/`) may skip — context comes from parent.

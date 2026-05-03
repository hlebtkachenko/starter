# .claude/

> Project-level Claude Code config. Loaded automatically when the agent runs in this repo.

## Layout

| Path | Purpose |
|---|---|
| `settings.json` | Permissions, hooks, env, model defaults (committed) |
| `settings.local.json` | Per-machine overrides (gitignored) |
| `rules/` | Hard taboos / invariants by area |
| `commands/` | Project slash commands |
| `skills/` | Project skills (folder-per-skill, `SKILL.md` body) |
| `agents/` | Project subagents (one md file each) |
| `hooks/` | Lifecycle hook scripts (sh / py / ts) |
| `scripts/` | Manual / command-invoked utilities (non-lifecycle) |

## Scripts boundary

Three folders hold scripts. They differ by **trigger**:

| Folder | Triggered by | Examples |
|---|---|---|
| `.claude/hooks/` | Claude Code lifecycle event | session-start, pre-tool-use |
| `.claude/scripts/` | Slash command, agent action, manual run | boot-digest, format |
| `.github/scripts/` | CI workflow, lefthook | check-paired-files |
| `scripts/` (root) | Local human dev | bootstrap, doctor, db-reset |

When in doubt: who pulls the trigger decides where the script lives.

## Loading order

1. `settings.json` (committed).
2. `settings.local.json` (gitignored, overrides committed).
3. `rules/*` loaded into agent context as hard constraints.
4. Hooks fire on lifecycle events.
5. Skills + commands + subagents available on demand.

## Conventions

- Skill folder template: `_TEMPLATE/SKILL.md` (matches Anthropic convention).
- Hook scripts: `kebab-case.sh` (or `.py`, `.ts`).
- Subagents + commands: `kebab-case.md`.

# Lifecycle hooks

> Scripts fired automatically by Claude Code on lifecycle events.

## Events

| Event | When | Stdin | Exit |
|---|---|---|---|
| `SessionStart` | Agent boots in this repo | empty | `0` continue |
| `UserPromptSubmit` | Each user message before it reaches the model | `{ prompt }` | `0` continue (may inject `additionalContext`) |
| `PreToolUse` | Before any tool invocation | `{ tool, input }` | `0` continue · `2` block |
| `PostToolUse` | After any tool invocation | `{ tool, input, result }` | `0` continue |
| `Stop` | End of agent turn | `{ summary }` | `0` continue |

## I/O contract

- Hook reads JSON from stdin.
- Hook writes either:
  - JSON to stdout: `{ "hookSpecificOutput": { "additionalContext": "<text>" } }` (UserPromptSubmit) or similar.
  - Or just exits with code (0 = continue, 2 = block, other = error logged but non-fatal).
- Anything written to stderr is logged, not surfaced.

## Polyglot

`.sh` (bash), `.py`, `.ts` (via `tsx`/`bun`) all valid. Keep dependencies minimal: these run on every lifecycle event.

## Index

| Hook | File | Purpose |
|---|---|---|
| SessionStart | [session-start.sh](session-start.sh) | Boot digest + STATE inject |
| UserPromptSubmit | [user-prompt-submit.sh](user-prompt-submit.sh) | Inject STATE pointer |
| PreToolUse | [pre-tool-use.sh](pre-tool-use.sh) | Gate risky tools |
| PostToolUse | [post-tool-use.sh](post-tool-use.sh) | Format on edit |
| Stop | [stop.sh](stop.sh) | Append turn log to handoff |

## Exit-code conventions

- `0`: continue normally.
- `2`: block the operation; surface stderr as the reason.
- other: error logged; agent continues (best-effort hooks).

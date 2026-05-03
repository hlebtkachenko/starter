#!/usr/bin/env bash
set -euo pipefail

# UserPromptSubmit — inject pointer to STATE.md + active handoff so the model has fresh context.

input="$(cat || true)"

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
handoff_path="docs/roadmap/handoffs/HANDOFF-${branch//\//-}.md"

context=""
if [ -f STATE.md ]; then
  context+="See STATE.md for current milestone, blockers, KPIs.\n"
fi
if [ -f "$handoff_path" ]; then
  context+="Active handoff: $handoff_path.\n"
fi

if [ -n "$context" ]; then
  printf '{"hookSpecificOutput":{"additionalContext":"%s"}}\n' "$context"
fi

exit 0

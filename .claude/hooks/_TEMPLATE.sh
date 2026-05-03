#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# <hook-name> — <event>
# Receives JSON on stdin per Claude Code hook contract.
# Exits 0 to continue, 2 to block.

input="$(cat || true)"

# Parse input (jq optional; fall back to noop if absent)
if command -v jq >/dev/null 2>&1; then
  : # tool="$(echo "$input" | jq -r '.tool // empty')"
fi

# Decision logic here.

# To inject context (UserPromptSubmit only):
#   echo '{"hookSpecificOutput":{"additionalContext":"<text>"}}'

exit 0

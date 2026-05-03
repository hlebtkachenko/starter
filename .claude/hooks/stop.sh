#!/usr/bin/env bash
set -euo pipefail

# Stop — append a turn marker to the active handoff (best-effort).

input="$(cat || true)"

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
handoff_path="docs/roadmap/handoffs/HANDOFF-${branch//\//-}.md"

if [ -f "$handoff_path" ]; then
  ts="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf '\n<!-- turn: %s -->\n' "$ts" >> "$handoff_path"
fi

exit 0

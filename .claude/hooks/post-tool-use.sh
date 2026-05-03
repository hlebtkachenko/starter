#!/usr/bin/env bash
set -euo pipefail

# PostToolUse — best-effort format on Edit/Write. Idempotent, fail-soft.

input="$(cat || true)"

if ! command -v jq >/dev/null 2>&1; then
  exit 0
fi

tool="$(echo "$input" | jq -r '.tool // empty')"
file="$(echo "$input" | jq -r '.input.file_path // empty')"

case "$tool" in
  Edit|Write)
    case "$file" in
      *.ts|*.tsx|*.js|*.jsx|*.json|*.jsonc|*.md|*.yml|*.yaml)
        if [ -x node_modules/.bin/biome ]; then
          node_modules/.bin/biome format --write "$file" >/dev/null 2>&1 || true
        fi
        ;;
    esac
    ;;
esac

exit 0

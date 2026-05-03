#!/usr/bin/env bash
set -euo pipefail

# PreToolUse — gate risky operations.
# Exits 2 to block; 0 to continue.

input="$(cat || true)"

if ! command -v jq >/dev/null 2>&1; then
  exit 0
fi

tool="$(echo "$input" | jq -r '.tool // empty')"
cmd="$(echo "$input" | jq -r '.input.command // empty')"

case "$tool" in
  Bash)
    # Block direct push to master
    if echo "$cmd" | grep -Eq 'git push.*\b(master|main)\b'; then
      echo "Direct push to master/main is blocked. Open a PR." >&2
      exit 2
    fi
    # Block force push to protected branches
    if echo "$cmd" | grep -Eq 'git push.*--force.*\b(master|main)\b'; then
      echo "Force push to master/main is blocked." >&2
      exit 2
    fi
    # Block rm -rf on data dirs
    if echo "$cmd" | grep -Eq 'rm -rf.*(\.git|node_modules|db/migrations|/)'; then
      echo "Refusing rm -rf on protected path. Confirm with maintainer." >&2
      exit 2
    fi
    ;;
  Edit|Write)
    file="$(echo "$input" | jq -r '.input.file_path // empty')"
    # Block edits to merged migrations (append-only)
    if [[ "$file" =~ ^db/migrations/[0-9]{4}_.*\.sql$ ]]; then
      if git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
        echo "Migrations are append-only. Add a new migration instead." >&2
        exit 2
      fi
    fi
    ;;
esac

exit 0

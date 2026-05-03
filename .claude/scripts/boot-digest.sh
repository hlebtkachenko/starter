#!/usr/bin/env bash
set -euo pipefail

# Repo state snapshot — printed at SessionStart for cold-start context.

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
ahead_behind="$(git rev-list --left-right --count HEAD...@{u} 2>/dev/null || echo "?\t?")"
dirty_count="$(git status --porcelain | wc -l | tr -d ' ')"

echo "=== boot digest ==="
echo "branch: $branch"
echo "ahead/behind upstream: $ahead_behind"
echo "uncommitted files: $dirty_count"
echo

if [ -f STATE.md ]; then
  echo "--- STATE.md (top) ---"
  head -n 40 STATE.md
  echo
fi

if command -v gh >/dev/null 2>&1; then
  echo "--- my open PRs ---"
  gh pr list --author '@me' --state open --json number,title,statusCheckRollup --jq '.[] | "#\(.number) \(.title)"' 2>/dev/null || true
  echo
fi

handoff_path="docs/roadmap/handoffs/HANDOFF-${branch//\//-}.md"
if [ -f "$handoff_path" ]; then
  echo "--- active handoff ---"
  echo "$handoff_path"
fi

echo "=== /boot digest ==="

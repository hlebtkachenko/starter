#!/usr/bin/env bash
set -euo pipefail

# GitHub state probe — PR statuses, recent CI runs, reviews.

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not installed" >&2
  exit 1
fi

echo "=== gh state ==="

echo "--- my open PRs ---"
gh pr list --author '@me' --state open \
  --json number,title,headRefName,reviewDecision,statusCheckRollup \
  --jq '.[] | "#\(.number) \(.title) [\(.reviewDecision // "no-review")] [\(.headRefName)]"' || true
echo

echo "--- last 5 workflow runs ---"
gh run list --limit 5 --json status,conclusion,name,headBranch,createdAt \
  --jq '.[] | "\(.createdAt) \(.name) on \(.headBranch): \(.status)/\(.conclusion // "-")"' || true
echo

echo "--- pending reviews on my PRs ---"
gh pr list --author '@me' --state open --json number,reviewRequests \
  --jq '.[] | select((.reviewRequests | length) > 0) | "#\(.number) waiting on \(.reviewRequests | map(.login // .name) | join(\", \"))"' || true

echo "=== /gh state ==="

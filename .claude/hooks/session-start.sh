#!/usr/bin/env bash
set -euo pipefail

# SessionStart — print boot digest to stderr (visible in Claude Code session log).

if [ -x .claude/scripts/boot-digest.sh ]; then
  bash .claude/scripts/boot-digest.sh >&2 || true
fi

exit 0

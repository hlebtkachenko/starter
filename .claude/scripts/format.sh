#!/usr/bin/env bash
set -euo pipefail

# Idempotent format pass: biome + eslint --fix + knip.
# Preserves CI exit codes when run with --strict.

strict="${1:-}"

run() {
  echo "→ $*"
  if [ "$strict" = "--strict" ]; then
    "$@"
  else
    "$@" || true
  fi
}

if [ -x node_modules/.bin/biome ]; then
  run pnpm exec biome format --write .
  run pnpm exec biome check --write .
fi

if [ -x node_modules/.bin/eslint ]; then
  run pnpm exec eslint --fix .
fi

if [ -x node_modules/.bin/knip ]; then
  run pnpm exec knip
fi

echo "format: done"

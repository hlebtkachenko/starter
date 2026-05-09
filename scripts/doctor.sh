#!/usr/bin/env bash
set -euo pipefail

# doctor.sh — read-only environment diagnosis. Exits 1 on any failure.

pass=0
fail=0

check() {
  local label="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    printf '\033[1;32m✓\033[0m %s\n' "$label"
    pass=$((pass+1))
  else
    printf '\033[1;31m✗\033[0m %s\n' "$label"
    fail=$((fail+1))
  fi
}

check "mise installed"          command -v mise
check "node 24+ resolved"       bash -c 'mise current node | grep -E "^(2[4-9]|[3-9][0-9])\."'
check "pnpm resolved"           command -v pnpm
check "docker daemon up"        docker info
check "postgres container up"   bash -c 'docker compose ps postgres | grep -q "healthy\|running"'
# PROJECT NAME slot in `-d starter_dev` — keep in sync with docker-compose.yml POSTGRES_DB when forking template.
check "pgmq extension loaded"   bash -c 'docker compose exec -T postgres psql -U postgres -d starter_dev -c "SELECT 1 FROM pg_extension WHERE extname='\''pgmq'\''" | grep -q 1'
check "mailpit up"              bash -c 'docker compose ps mailpit | grep -q "healthy\|running"'
check ".env.local present"      bash -c 'test -e .env.local || test -L .env.local'
check "port 3000 free"          bash -c '! lsof -i :3000'
check "git remote reachable"    bash -c 'ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"'
check "gh authenticated"        gh auth status

echo
printf 'pass: %d  fail: %d\n' "$pass" "$fail"
[ "$fail" -gt 0 ] && exit 1 || exit 0

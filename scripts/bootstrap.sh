#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# bootstrap.sh — one-shot first-run setup. Idempotent.

info() { printf '\033[1;34mℹ\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

step() { info "→ $*"; }

# 1. Toolchain
step "mise install"
command -v mise >/dev/null 2>&1 || err "mise not installed; see https://mise.jdx.dev"
mise install

# 2. Dependencies
step "pnpm install"
pnpm install

# 3. Env file
step "env check"
if [ ! -e .env.local ] && [ ! -L .env.local ]; then
  cp .env.example .env.local
  ok "created .env.local from .env.example — populate values before running"
else
  ok ".env.local present"
fi

# 4. Local services
step "docker compose up --wait"
command -v docker >/dev/null 2>&1 || err "docker not installed"
docker compose up --wait

# 5. DB migrate + seed
# Gated on the underlying tools being installed. The scaffold scripts reference
# drizzle-kit (db:migrate, db:generate, db:studio) and tsx (db:seed) before
# those packages are added to devDependencies. First feature PR that adds them
# unlocks these steps; until then, skip with a hint instead of failing bootstrap.
if [ -x node_modules/.bin/drizzle-kit ]; then
  step "pnpm db:migrate"
  pnpm db:migrate
else
  info "skip pnpm db:migrate — drizzle-kit not installed yet (add with first DB-touching PR)"
fi

if [ -x node_modules/.bin/tsx ]; then
  step "pnpm db:seed"
  pnpm db:seed
else
  info "skip pnpm db:seed — tsx not installed yet (add with first DB-touching PR)"
fi

ok "bootstrap complete"
echo
echo "Next:"
echo "  pnpm dev          # http://localhost:3000"
echo "  pnpm test         # unit tests"
echo "  pnpm test:e2e     # playwright"
echo "  bash scripts/doctor.sh   # diagnose"

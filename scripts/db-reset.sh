#!/usr/bin/env bash
set -euo pipefail

# db-reset.sh — wipe + remigrate + reseed local DB.

usage() {
  cat <<EOF
Usage: $(basename "$0") [--yes]

Wipes the local docker postgres volume, restarts the container,
runs migrations, and seeds. Confirms before destruction unless --yes is given.
EOF
}

force="${1:-}"

if [ "$force" != "--yes" ]; then
  read -rp "Wipe local DB volume + reseed? [y/N] " ans
  case "$ans" in
    y|Y|yes|YES) ;;
    *) echo "aborted"; exit 0;;
  esac
fi

docker compose down postgres
docker volume rm "$(basename "$PWD" | tr '[:upper:]' '[:lower:]')_postgres_data" 2>/dev/null || true
docker compose up --wait postgres

pnpm db:migrate
pnpm db:seed

echo "db reset complete"

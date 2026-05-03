#!/usr/bin/env bash
set -euo pipefail

# tunnel.sh — cloudflared quick tunnel. HTTPS URL printed on start.
# Use for: receiving Stripe webhooks, OAuth redirects, mobile QA against laptop dev server.

port="${1:-3000}"

command -v cloudflared >/dev/null 2>&1 || {
  echo "cloudflared not installed. brew install cloudflared" >&2
  exit 1
}

cleanup() { echo; echo "tunnel closed"; }
trap cleanup INT TERM

cloudflared tunnel --url "http://localhost:${port}"

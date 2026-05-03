#!/usr/bin/env bash
set -euo pipefail

# Enforce .github/related-files.yml.
# - For each pair: if any `when_changed` glob matched, at least one `require_one_of` glob must also match.
# - severity: block → exit 1; warn → log + continue.
# - forbid_in_master_pr: any matching file fails.

CONFIG=".github/related-files.yml"
[ -f "$CONFIG" ] || { echo "no $CONFIG; skipping"; exit 0; }
command -v yq >/dev/null 2>&1 || { echo "yq required" >&2; exit 1; }

base="${GITHUB_BASE_REF:-master}"

# Resolve diff against base
git fetch --no-tags --depth=200 origin "$base" >/dev/null 2>&1 || true
changed="$(git diff --name-only "origin/$base"...HEAD 2>/dev/null || git diff --name-only "$base"...HEAD)"

if [ -z "$changed" ]; then
  echo "no changes vs $base; skipping"
  exit 0
fi

fail=0
warn=0

# Forbidden files
mapfile -t forbids < <(yq -r '.forbid_in_master_pr[]?' "$CONFIG")
for pat in "${forbids[@]:-}"; do
  while IFS= read -r f; do
    if [[ "$f" == $pat ]]; then
      echo "::error file=$f::forbidden in master PR ($pat)"
      fail=1
    fi
  done <<< "$changed"
done

# Pairs
n=$(yq '.pairs | length' "$CONFIG")
for i in $(seq 0 $((n-1))); do
  name=$(yq -r ".pairs[$i].name" "$CONFIG")
  severity=$(yq -r ".pairs[$i].severity // \"block\"" "$CONFIG")
  mapfile -t triggers < <(yq -r ".pairs[$i].when_changed[]?" "$CONFIG")
  mapfile -t requireds < <(yq -r ".pairs[$i].require_one_of[]?" "$CONFIG")

  triggered=0
  for pat in "${triggers[@]:-}"; do
    while IFS= read -r f; do
      [[ "$f" == $pat ]] && triggered=1
    done <<< "$changed"
  done

  [ "$triggered" = "1" ] || continue

  satisfied=0
  for pat in "${requireds[@]:-}"; do
    while IFS= read -r f; do
      [[ "$f" == $pat ]] && satisfied=1
    done <<< "$changed"
  done

  if [ "$satisfied" = "0" ]; then
    msg="paired-files [$name]: changed ${triggers[*]} but none of ${requireds[*]} also changed"
    if [ "$severity" = "block" ]; then
      echo "::error::$msg"
      fail=1
    else
      echo "::warning::$msg"
      warn=1
    fi
  fi
done

if [ "$fail" = "1" ]; then exit 1; fi
exit 0

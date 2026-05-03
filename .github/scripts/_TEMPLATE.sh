#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# <script-name> — <one-line purpose>
#
# Triggered by: <CI workflow | lefthook stage>
#
# Inputs:
#   GITHUB_BASE_REF (CI) — base branch for diff
#   GITHUB_HEAD_REF (CI) — current branch
#   (locally: derived from git)

base="${GITHUB_BASE_REF:-master}"
head="${GITHUB_HEAD_REF:-$(git rev-parse --abbrev-ref HEAD)}"

# Implement here. Exit non-zero on violation.

exit 0

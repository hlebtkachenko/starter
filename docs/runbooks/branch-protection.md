---
title: Branch protection
severity: meta
last_drilled: never
related_adrs: []
---

# Branch protection

> Deploy `master` branch protection from version-controlled JSON.

## Deploy

```bash
gh ruleset import .github/rulesets/main.json --repo <git-user>/<repo>
```

## Verify

```bash
gh ruleset list --repo <git-user>/<repo>
gh ruleset view <ruleset-id> --repo <git-user>/<repo>
```

Confirm:

- PR-only enforcement (no direct push).
- Required status checks: `ci`, `pr-checks`, `claude-review`.
- Required reviews: 1 (dismiss-stale on push).
- Force-push restricted.
- Deletion restricted.
- Blocked file extensions: `.env*`, `*.key`, `*.enc`.

## Drift detection

```bash
gh ruleset view <ruleset-id> --json > /tmp/live.json
diff <(jq -S . .github/rulesets/main.json) <(jq -S . /tmp/live.json)
```

If drift exists, decide: update `main.json` (live wins) or re-import (file wins). Document choice in commit message.

## Recovery if locked out

1. Repo Settings → Branches → temporarily disable ruleset.
2. Push fix.
3. Re-enable ruleset.
4. File post-mortem if this happens unintentionally.

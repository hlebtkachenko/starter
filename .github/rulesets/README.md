# Rulesets

> Branch protection as code. Apply via `gh ruleset import`.

## Apply

```bash
gh ruleset import .github/rulesets/main.json --repo <git-user>/<repo>
```

## Verify

```bash
gh ruleset list --repo <git-user>/<repo>
gh ruleset view <id> --repo <git-user>/<repo>
```

## Drift detection

```bash
gh ruleset view <id> --json > /tmp/live.json
diff <(jq -S . main.json) <(jq -S . /tmp/live.json)
```

## Rollback

```bash
gh ruleset delete <id> --repo <git-user>/<repo>
```

See [`docs/runbooks/branch-protection.md`](../../docs/runbooks/branch-protection.md).

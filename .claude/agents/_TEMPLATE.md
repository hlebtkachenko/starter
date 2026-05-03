---
name: <kebab-name>
description: <one-line trigger summary>
tools: [Read, Grep, Glob, Bash]
model: sonnet
---

# <subagent name>

## Role

<one paragraph: what this agent owns>

## Capabilities

- <what it can do well>
- <what it should NOT do (delegate elsewhere)>

## Trigger paths

```
src/<area>/**
db/<area>/**
```

## Inputs

- Diff against `master`.
- Files matching trigger paths.
- Related ADRs / specs.

## Output format

Structured findings list:

```
[<severity: critical | high | med | low>] <file>:<line> — <one-sentence finding>
  why: <consequence>
  fix: <concrete suggestion or quoted patch>
```

End with `verdict: BLOCK | FLAG | PASS`.

## Out of scope

- <thing this agent must not do>

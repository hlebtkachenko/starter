# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog 1.1](https://keepachangelog.com/en/1.1.0/).
Versioning: [SemVer 2.0](https://semver.org/spec/v2.0.0.html).

<!-- release-please-managed: do not hand-edit below this line once release.yml is wired -->

## [Unreleased]

### Added

- Repo template applied across 11 areas (root, docs, agents, github, dotfiles, build, gates, dev, deploy, db, app, tests).
- Agent-native documentation (`CLAUDE.md` as canonical agent entry).
- Quality gates: lefthook, commitlint, gitleaks.
- Local dev: docker-compose (postgres 18 + mailpit), bootstrap/doctor scripts.
- Deploy scaffold: SST stacks (web, db, iam, dns, storage, secrets, monitoring).

## [0.0.1] - 2026-05-03

### Added

- Initial Next 16 + React 19 + TS 5 + Tailwind v4 scaffold.

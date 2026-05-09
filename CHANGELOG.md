# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog 1.1](https://keepachangelog.com/en/1.1.0/).
Versioning: [SemVer 2.0](https://semver.org/spec/v2.0.0.html).

<!-- release-please-managed: do not hand-edit below this line once release.yml is wired -->

## [0.0.3](https://github.com/hlebtkachenko/starter/compare/v0.0.2...v0.0.3) (2026-05-09)


### Fixed

* **ci:** fix showcase-audit spawning and runner ghost-lock ([8835040](https://github.com/hlebtkachenko/starter/commit/883504077bd36ec1a4a9ad8bf96bd37289f37d85))
* **ci:** fix showcase-audit spawning and runner ghost-lock ([ae95d81](https://github.com/hlebtkachenko/starter/commit/ae95d81e2005db149b61e1d8f8194d287e60eb1a))

## [0.0.2](https://github.com/hlebtkachenko/starter/compare/v0.0.1...v0.0.2) (2026-05-09)


### Added

* **agents:** seed /digest slash command, sync SPEC-000 with .claude/scripts/ ([#14](https://github.com/hlebtkachenko/starter/issues/14)) ([5361363](https://github.com/hlebtkachenko/starter/commit/536136315a7f70c2883dd318d1c5c0724f80d83d))
* **gates:** add no-raw-interactive-html + no-bare-rounded ESLint rules ([d57ed4a](https://github.com/hlebtkachenko/starter/commit/d57ed4a06012b52ecd2cb91f3964e576c552dc36))
* scaffold full repo template across 11 areas ([#1](https://github.com/hlebtkachenko/starter/issues/1)) ([9e8ace3](https://github.com/hlebtkachenko/starter/commit/9e8ace39ce73282b839a99c95d7b411956fe7c95))
* **ui:** add 10 utility hooks from shadcn-hooks ([2010757](https://github.com/hlebtkachenko/starter/commit/201075714b7d1a039a6b5690f0f9720e5b389ff3))
* **ui:** add 16 components from 7 registries ([64ae6d8](https://github.com/hlebtkachenko/starter/commit/64ae6d829e316086289cc3f261694e46efd4a3bc))
* **ui:** add 18 ReUI compositions + reui-badge primitive ([c16c3de](https://github.com/hlebtkachenko/starter/commit/c16c3de4bb1d3c35dba36dde76c7d6b38c730804))
* **ui:** add 23 components from cult-ui and diceui registries ([a54e836](https://github.com/hlebtkachenko/starter/commit/a54e836dca9b7a7404a50543172d426694b6bf1f))
* **ui:** add 34 components from 8 new registries ([4e700d2](https://github.com/hlebtkachenko/starter/commit/4e700d24d7584c18614eb10960b8a02c3f0a9c0e))
* **ui:** add 6 new components from external registries + showcase New Components section ([7093fae](https://github.com/hlebtkachenko/starter/commit/7093fae10c2a56ccb9710036840305d3569ee899))
* **ui:** add 8 components from Eldora UI and Evil Charts ([d2691eb](https://github.com/hlebtkachenko/starter/commit/d2691eb1349f377594150a62d43cf4042b001055))
* **ui:** add ring-loader component from loading-ui registry ([90b4bc6](https://github.com/hlebtkachenko/starter/commit/90b4bc6f148ed099a0ae4404633ed73f2f21e9f1))
* **ui:** component registry phase 3 (registry-driven /showcase) ([#21](https://github.com/hlebtkachenko/starter/issues/21)) ([97f830d](https://github.com/hlebtkachenko/starter/commit/97f830dcb51e018b25bb2fd25fc262180c5ba175))


### Fixed

* **ci:** real CODEOWNERS user, real status-check names, spec drift ([#15](https://github.com/hlebtkachenko/starter/issues/15)) ([3a65598](https://github.com/hlebtkachenko/starter/commit/3a655982a923dc4ddd8b9c35fdcfe3007717fac5))
* **db:** drizzle reads .env.local, tag &lt;domain&gt; slot, soften barrel lint claim ([#20](https://github.com/hlebtkachenko/starter/issues/20)) ([191466a](https://github.com/hlebtkachenko/starter/commit/191466a84afa5de0ba5ea96655c6eb6536b1104c))
* **gates:** promote no-raw-interactive-html to error severity ([1cd7dd4](https://github.com/hlebtkachenko/starter/commit/1cd7dd43d4b170c51076a208c23fd24c20aace26))
* **infra:** replace &lt;project-name&gt; placeholders, gate bootstrap db steps ([#18](https://github.com/hlebtkachenko/starter/issues/18)) ([d96343a](https://github.com/hlebtkachenko/starter/commit/d96343aebc4d125a8cc5fb8500e1e9b22ee502ed))
* **infra:** replace known placeholders, tag slot remainders, drop dup COPY ([#19](https://github.com/hlebtkachenko/starter/issues/19)) ([38c6679](https://github.com/hlebtkachenko/starter/commit/38c6679e9d3e219960efcf5a2c6759e4b993ac55))
* **tests:** vitest projects migration, dotenv path, mailpit timeouts, polyfills ([#23](https://github.com/hlebtkachenko/starter/issues/23)) ([a2dcfd4](https://github.com/hlebtkachenko/starter/commit/a2dcfd44fecd5d40447f1b1af312f9977a5b2178))
* **ui:** add es-toolkit dep + fix exactOptionalPropertyTypes in devtools components ([64e76be](https://github.com/hlebtkachenko/starter/commit/64e76be509c156195b74893dccf863676d4bfe1d))
* **ui:** add ts-nocheck to evil chart library files for exactOptionalPropertyTypes ([e08edf9](https://github.com/hlebtkachenko/starter/commit/e08edf9f006d749cf081cbb8e16dfe33fcb29db4))
* **ui:** address 3 review findings in tryelements components ([1a681d8](https://github.com/hlebtkachenko/starter/commit/1a681d86aa39924f92b2ab044c9743abb0a8ebb7))
* **ui:** address remaining review findings in tryelements components ([9582ceb](https://github.com/hlebtkachenko/starter/commit/9582ceb4ec52e9c396461d58d633d68aa65c7c54))
* **ui:** fix biome format issues in parallel agent files ([6907b83](https://github.com/hlebtkachenko/starter/commit/6907b83574d68da76cd7da7b0f2014ca8080d306))
* **ui:** pin locale to en-US in Calendar and chart to prevent hydration mismatches ([#27](https://github.com/hlebtkachenko/starter/issues/27)) ([a30c2f8](https://github.com/hlebtkachenko/starter/commit/a30c2f81b5f85de0b6363f2a1c2eddb623f5017b))
* **ui:** refactor tryelements to shadcn primitives + fix autocomplete, PDF examples ([4c0281c](https://github.com/hlebtkachenko/starter/commit/4c0281cc5047bdd3f64e79918084619d2f9cac82))
* **ui:** replace src/public placeholders, harden logger and error wrappers ([#22](https://github.com/hlebtkachenko/starter/issues/22)) ([81054a0](https://github.com/hlebtkachenko/starter/commit/81054a0d77e46a60bc8cf734646630b68b457f44))
* **ui:** resolve 3 hydration mismatches on /showcase ([0148bfd](https://github.com/hlebtkachenko/starter/commit/0148bfdb2a7b701421dec882d89164a12f2630ad))
* **ui:** resolve 9 showcase issues + add cropper variants ([5cc0fde](https://github.com/hlebtkachenko/starter/commit/5cc0fde0a5e0d0bf7aa4a01695bab8c133b1fc71))
* **ui:** targeted eslint disables, string truncation, remove broken parallel agent artifacts ([2717d6d](https://github.com/hlebtkachenko/starter/commit/2717d6d94b1885ea271581aa804d6ddd2e3b09f0))


### Documentation

* add handoff for new-components branch ([85b2751](https://github.com/hlebtkachenko/starter/commit/85b275177480b433c622217834867e046bfcd426))
* ADRs 001-002, PRODUCT skeleton, SPEC-000 enumerates extras ([#13](https://github.com/hlebtkachenko/starter/issues/13)) ([107be6d](https://github.com/hlebtkachenko/starter/commit/107be6d54bc6e6125cceeb178487b3af13f9c9fa))

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

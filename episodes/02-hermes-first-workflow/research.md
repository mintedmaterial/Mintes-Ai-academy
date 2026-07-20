# Research Notes

## Primary sources
- Quickstart: https://hermes-agent.nousresearch.com/docs/getting-started/quickstart
- Profiles: https://hermes-agent.nousresearch.com/docs/user-guide/profiles
- Cron: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron
- Working with skills: https://hermes-agent.nousresearch.com/docs/guides/work-with-skills
- Source repository: https://github.com/NousResearch/hermes-agent

## Verified current local evidence
- `hermes --version` returned `Hermes Agent v0.18.2 (2026.7.7.2)` on Windows.
- `hermes config path` returned the Cleo profile config path.
- `hermes config check` reported config version 33 and a valid configuration.
- `hermes mcp list` showed Cloudflare, Hostinger VPS, and Composio configured; the episode intentionally does not depend on them.
- `hermes profile list` showed separate profiles and gateway state, including Cleo, LocDev, Auditor, Curator, and PR-Checker.
- `hermes cron list --all` showed active and paused jobs; the episode uses a harmless local delivery example instead of copying production jobs.

## Key facts to teach
1. The official quickstart recommends making one normal chat work before layering on gateway, cron, skills, voice, or routing.
2. A profile is a separate Hermes home directory with its own config, `.env`, SOUL, memories, sessions, skills, cron jobs, and state database.
3. A cron job runs in a fresh agent session. Jobs can be one-shot or recurring, pause/resume/edit/trigger/remove, attach skills, deliver locally or to a platform, and run in no-agent mode.
4. Unpinned LLM-driven jobs follow the configured default only while the provider/model snapshot remains consistent; pinning avoids silent spend/config drift.
5. The tutorial must show real output but sanitize secrets, account IDs, tokens, and private routes.

## Episode 1 format cues
The companion Cloudflare episode used a concrete promise, architecture visuals, a live proof path, reusable assets, and a matching blog post. Episode 2 keeps that structure but uses Hermes-native terminal scenes and a small operating-model diagram.

# Live proof log (sanitized)

Captured from the local Windows Hermes installation on 2026-07-20. Secrets and private identifiers intentionally omitted.

```text
$ hermes --version
Hermes Agent v0.18.2 (2026.7.7.2)

$ hermes config path
C:\Users\Minte\AppData\Local\hermes\profiles\cleo\config.yaml

$ hermes config check
Configuration Status
Config version: 33 ✓

$ hermes mcp list
Cloudflare       enabled
Hostinger VPS    enabled
Composio         enabled

$ hermes profile list
cleo              running
locdev            running
auditor            running
curator           running
pr-checker        running

$ hermes cron list --all
active and paused jobs listed; private delivery targets redacted
```

The screenshot-style scene cards are privacy-safe visualizations of these verified outputs, not claims that private configuration should be copied verbatim.

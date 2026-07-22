#!/usr/bin/env node

import fs from "node:fs";

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error("GITHUB_EVENT_PATH is required");
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const body = event.pull_request?.body ?? "";
const required = [
  "## Issue",
  "Closes #",
  "## Handoff evidence",
  "- Repository:",
  "- Base branch:",
  "- Base commit:",
  "- Head branch:",
  "- Commit:",
  "- Implementer/owner:",
  "- Runtime profile/lane:",
  "- Absolute workspace/worktree path:",
  "- Changed files:",
  "- Exact CI run URL and commit:",
  "- Reviewer identity and outcome:",
  "- Independent verification result:",
];

const missing = required.filter((marker) => !body.includes(marker));
if (missing.length) {
  console.error("PR contract missing:");
  for (const marker of missing) console.error(`- ${marker}`);
  process.exit(1);
}

const placeholderPatterns = [
  /^- (Repository|Base branch|Base commit|Head branch|Commit|Implementer\/owner|Runtime profile\/lane|Absolute workspace\/worktree path|Changed files|Exact CI run URL and commit|Reviewer identity and outcome|Independent verification result):\s*$/m,
];
for (const pattern of placeholderPatterns) {
  if (pattern.test(body)) {
    console.error("PR contract contains an empty required handoff field");
    process.exit(1);
  }
}

console.log("PR contract passed: issue linkage and required handoff fields are present.");

#!/usr/bin/env node

import fs from "node:fs";

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error("GITHUB_EVENT_PATH is required");
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const body = event.pull_request?.body ?? "";
const expectedRepository = "mintedmaterial/Mintes-Ai-academy";
const sha = "[0-9a-f]{40}";
const branch = "[A-Za-z0-9._/-]+";
const required = [
  "## Issue",
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

const field = (label) => {
  const match = body.match(new RegExp(`^- ${label}:\\s*(.+)$`, "m"));
  return match?.[1].trim().replace(/^`|`$/g, "") ?? "";
};
const failures = [];
const issue = body.match(/\bCloses\s+#(\d+)\b/i)?.[1];
if (!issue) failures.push("Closes #<issue-number>");
if (field("Repository") !== expectedRepository) failures.push(`Repository must be ${expectedRepository}`);
if (!/^main$/.test(field("Base branch"))) failures.push("Base branch must be main");
if (!new RegExp(`^${sha}$`).test(field("Base commit").replaceAll("`", ""))) failures.push("Base commit must be a 40-character SHA");
if (!new RegExp(`^${branch}$`).test(field("Head branch").replaceAll("`", ""))) failures.push("Head branch must be a valid branch name");
if (!new RegExp(`^${sha}$`).test(field("Commit").replaceAll("`", ""))) failures.push("Commit must be a 40-character SHA");

const nonEmptyFields = [
  "Implementer/owner",
  "Runtime profile/lane",
  "Absolute workspace/worktree path",
  "Changed files",
  "Reviewer identity and outcome",
  "Independent verification result",
];
for (const label of nonEmptyFields) {
  const value = field(label);
  if (!value || /^(tbd|todo|pending|placeholder|n\/a|none)$/i.test(value.replaceAll("`", "").trim())) {
    failures.push(`${label} must contain a meaningful value`);
  }
}

const ciValue = field("Exact CI run URL and commit");
const ciMatch = ciValue.match(/https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/actions\/runs\/\d+\s*@\s*`?([0-9a-f]{40})`?/i);
if (!ciMatch) failures.push("Exact CI run URL and commit must contain a GitHub Actions run URL and 40-character SHA");
else if (ciMatch[1].toLowerCase() !== field("Commit").replaceAll("`", "").toLowerCase()) failures.push("CI evidence SHA must match Commit");

if (failures.length) {
  console.error("PR contract invalid:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PR contract passed for ${expectedRepository} issue #${issue}.`);

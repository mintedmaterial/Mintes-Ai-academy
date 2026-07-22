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
const repository = event.repository?.full_name ?? expectedRepository;
const shaPattern = /^[0-9a-f]{40}$/i;
const branchPattern = /^[A-Za-z0-9._/-]+$/;
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

const failures = [];
const missing = required.filter((marker) => !body.includes(marker));
if (missing.length) for (const marker of missing) failures.push(`missing ${marker}`);

const field = (label) => {
  const match = body.match(new RegExp(`^- ${label}:\\s*(.+)$`, "m"));
  return match?.[1].trim().replace(/^`|`$/g, "") ?? "";
};
const issue = body.match(/\bCloses\s+#(\d+)\b/i)?.[1] ?? "";
if (!issue) failures.push("Closes #<issue-number> is required");
if (repository !== expectedRepository) failures.push(`event repository must be ${expectedRepository}`);
if (field("Repository") !== expectedRepository) failures.push(`Repository must be ${expectedRepository}`);
if (field("Base branch") !== (event.pull_request?.base?.ref ?? "main")) failures.push("Base branch does not match the pull request event");
if (field("Head branch") !== (event.pull_request?.head?.ref ?? "")) failures.push("Head branch does not match the pull request event");
if (!shaPattern.test(field("Base commit"))) failures.push("Base commit must be a 40-character SHA");
if (!shaPattern.test(field("Commit"))) failures.push("Commit must be a 40-character SHA");
if (!branchPattern.test(field("Head branch"))) failures.push("Head branch must be a valid branch name");
if (event.pull_request?.base?.sha && field("Base commit").toLowerCase() !== event.pull_request.base.sha.toLowerCase()) failures.push("Base commit does not match the pull request event");
if (event.pull_request?.head?.sha && field("Commit").toLowerCase() !== event.pull_request.head.sha.toLowerCase()) failures.push("Commit does not match the pull request event");

for (const label of [
  "Implementer/owner",
  "Runtime profile/lane",
  "Absolute workspace/worktree path",
  "Changed files",
  "Reviewer identity and outcome",
  "Independent verification result",
]) {
  const value = field(label);
  if (!value || /^(tbd|todo|pending|placeholder|n\/a|none)$/i.test(value)) failures.push(`${label} must contain a meaningful value`);
}

const ciValue = field("Exact CI run URL and commit");
const ciMatch = ciValue.match(/https:\/\/github\.com\/([^\s/]+\/[^\s/]+)\/actions\/runs\/(\d+)\s*@\s*`?([0-9a-f]{40})`?/i);
if (!ciMatch) {
  failures.push("Exact CI run URL and commit must contain a repository Actions URL, run ID, and SHA");
} else {
  if (ciMatch[1] !== expectedRepository) failures.push("CI evidence URL must belong to the target repository");
  if (ciMatch[3].toLowerCase() !== field("Commit").toLowerCase()) failures.push("CI evidence SHA must match Commit");
}

const token = process.env.GITHUB_TOKEN;
async function githubJson(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "mintes-ai-academy-pr-contract",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${path}`);
  return response.json();
}

if (token && !failures.length) {
  try {
    const issueData = await githubJson(`/repos/${expectedRepository}/issues/${issue}`);
    const labels = (issueData.labels ?? []).map((label) => typeof label === "string" ? label : label.name);
    if (!labels.includes("agent-ready")) failures.push(`issue #${issue} is not labeled agent-ready`);

    const runData = await githubJson(`/repos/${expectedRepository}/actions/runs/${ciMatch[2]}`);
    if (runData.head_sha?.toLowerCase() !== field("Commit").toLowerCase()) failures.push("CI run head SHA does not match Commit");
    if (runData.status !== "completed" || runData.conclusion !== "success") failures.push("CI run is not completed successfully");
  } catch (error) {
    failures.push(`GitHub evidence lookup failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error("PR contract invalid:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PR contract passed for ${expectedRepository} issue #${issue}.`);

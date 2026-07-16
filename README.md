# Minte AI Academy

A public, reproducible lab for Minte.Dev tutorials about Cloudflare, AI systems, and the tools used to build them.

The first lesson is **Minte Image Lab**, a local Cloudflare Workers AI playground used to teach how to build and deploy an image-generation Worker.

## What this repo contains

- A reusable dark editorial demo shell
- Cloudflare Workers AI example adapters
- Episode scripts and recording plans
- Slides, diagrams, thumbnail sources, and screenshot checklists
- Verification and teardown notes

## Run the first lab

Prerequisites: Node.js 20+, npm, Wrangler, and a Cloudflare account with Workers AI enabled.

```bash
npm install
npx wrangler login
npm run dev
```

Open the local URL printed by Wrangler. The frontend is local-first. Workers AI calls can incur usage charges even during local development.

## Build and validate

```bash
npm run build
npm run typecheck
npm run validate
```

## Episode 001

- [Brief](episodes/cloudflare/001-workers-ai-image-generator/brief.md)
- [Research](episodes/cloudflare/001-workers-ai-image-generator/research.md)
- [Script](episodes/cloudflare/001-workers-ai-image-generator/script.md)
- [Storyboard](episodes/cloudflare/001-workers-ai-image-generator/storyboard.md)
- [Recording plan](episodes/cloudflare/001-workers-ai-image-generator/recording-plan.md)
- [Troubleshooting](episodes/cloudflare/001-workers-ai-image-generator/troubleshooting.md)
- [Verification](episodes/cloudflare/001-workers-ai-image-generator/verification.md)

## Safety

This repository is public, but the demo should not be left running on a public URL. Use `npm run dev` locally, or deploy a temporary Worker for capture and remove it when finished.

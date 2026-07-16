# Research notes

## Current Cloudflare implementation facts

- Workers AI is accessed from a Worker through an AI binding.
- Wrangler configuration uses an `ai.binding` entry, exposing the binding as `env.AI`.
- Workers AI calls can incur usage charges during local development.
- A Worker project is limited to one AI binding.
- The example uses a model allowlist so the UI cannot send arbitrary model IDs.
- The example defaults to `@cf/black-forest-labs/flux-2-klein-4b`, with an optional 9B choice.

## Official references

- https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground
- https://developers.cloudflare.com/workers/wrangler/configuration/
- https://developers.cloudflare.com/workers-ai/

## What we are teaching

1. A frontend does not call the model directly.
2. The Worker receives a prompt and validates it.
3. The AI binding runs the model at Cloudflare.
4. The Worker returns image bytes to the browser.
5. The demo can be removed after the lesson.

## What we are not teaching yet

- Public production rate limiting
- Authentication
- R2 persistence
- Image reference inputs
- Multi-agent orchestration
- Sandbox execution

Those are later episodes.

## Accuracy note

Cloudflare model availability changes. Before recording, run the actual example and confirm the selected model is available in Colt's account. Do not read a model identifier on camera unless the live request succeeds.

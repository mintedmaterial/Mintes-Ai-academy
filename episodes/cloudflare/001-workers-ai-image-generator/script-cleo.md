# Cleo Script

## Episode 001: Minte Image Lab

This is the technical middle of the episode. Every spoken block has a matching screen action. The voice should be calm, precise, and conversational, with short pauses before code or browser changes.

## Handoff: 00:20

**Visual:** Title slide.

> Thanks, Colt. I am Cleo, and I will take the technical middle of this episode.
>
> We are going to build the smallest useful version of an AI image application: a browser prompt, a Worker boundary, a Workers AI model, and an image returned to the screen.
>
> The project is called Minte Image Lab. The repository is public, but the running demo is local or temporary so we do not leave an unauthenticated inference endpoint online after the recording.

## The mental model: 00:45

**Visual:** Architecture slide, then the Minte Image Lab interface.

> The request path is simple. The user enters a prompt in the browser. The browser sends that prompt to a Worker. The Worker validates the input and calls a Workers AI binding. The model returns image data, and the browser renders the result and stores a local history item.
>
> The browser does not receive a Cloudflare client token. The protected boundary stays in the Worker environment.
>
> The front end is deliberately more useful than a blank form. It has prompt presets, model and size controls, local history, a download action, and a teaching panel that makes the point of each step visible.

**Action:** Scroll through prompt, presets, controls, output area, history, and teaching panel.

## Why Workers AI: 01:35

**Visual:** Why Cloudflare slide.

> Workers AI gives us hosted models through the same platform where we can run the application logic. For this lesson, that means we do not need to stand up a GPU server or expose a model credential in the browser.
>
> This is not a claim that every AI project belongs at the edge. It is a practical fit for a small request path where the application and the inference call can sit behind one Worker boundary.

## Open the repo: 02:05

**Visual:** Terminal and repository.

> The repo is `mintedmaterial/Mintes-Ai-academy`. The first example lives under the Cloudflare episode package, while the reusable front end stays at the root of the lab.
>
> Start with the normal local commands: install the dependencies, then run Wrangler. The local UI is temporary, but the Workers AI call can still reach the Cloudflare account, so local does not mean free.

**Action:** Show the repo tree and run `npm install` only if needed. Do not show secrets or unrelated tabs.

## The AI binding: 02:35

**Visual:** Binding slide, then `wrangler.jsonc`.

> The important configuration is the AI binding. It is named `AI`, which makes it available to the Worker as `env.AI`.
>
> This is the connection between the application code and Workers AI. The name has to match in both places. If the configuration says `AI` but the code calls a different property, the request will fail before the model does any work.

**Action:** Highlight the `ai` block, then the `env.AI` call in `src/worker.ts`.

## The request contract: 03:15

**Visual:** `src/worker.ts`.

> The browser sends a POST request to `/api/generate`. The Worker reads the prompt, checks that it is present and bounded, checks the selected model against an allowlist, and checks the requested image dimensions.
>
> These checks are small, but they teach a durable habit. A demo should still have a clear input contract. We do not want arbitrary model identifiers or unlimited prompt data crossing into the backend.
>
> The current FLUX 2 Klein path uses multipart input. The Worker serializes the prompt and dimensions, calls the AI binding, unwraps the returned image field, and decodes the base64 image response before sending the actual image bytes back to the browser.
>
> That last detail matters because platform model APIs change. The code should be verified against the current response shape instead of copied from an older tutorial without testing.

**Action:** Highlight route, validation, multipart serialization, output unwrap, and image response.

## The request flow: 04:20

**Visual:** Request-flow slide.

> The whole path is four steps: validate, run, return, render.
>
> The browser supplies intent. The Worker supplies the boundary. Workers AI supplies the model call. The browser supplies the visible result.

## Start the local demo: 04:40

**Visual:** Terminal, then browser at `http://127.0.0.1:8787`.

> Now start the local Worker with `npm run dev`.
>
> When the local page loads, check the status indicator before generating. We want to know that the front end is connected to the Worker route, not just that a static page opened.

**Action:** Open the browser and show the local URL. Keep the app window clean.

## Generate a real image: 05:10

**Visual:** Browser. Click the OBSERVATORY preset, change one setting, then generate.

> I am starting with the observatory preset, then I will change the prompt so this is a real request rather than a canned screenshot.
>
> Use this prompt: “A small orange research station floating above a black ocean planet, editorial technology illustration.”
>
> Now send the request.

**Action:** Show the generating state. Let the waiting state breathe for a moment.

> The browser is waiting for the Worker. The Worker is waiting for the model. When the response comes back, the UI turns the returned image bytes into a preview and saves the result in local browser history.

**Action:** Show the finished image, download action, and history item.

> That is the complete path: prompt in, Worker in the middle, image out.

## What can go wrong: 06:20

**Visual:** Gotchas slide.

> If this fails, check three things first.
>
> One: the AI binding is missing or named differently from the code.
>
> Two: the selected model is not available in the current account, or the model contract has changed since the lesson was recorded.
>
> Three: the local development environment is not authenticated with the Cloudflare account you expected.
>
> Cloudflare changes quickly, so a responsible tutorial shows the repository, the date, and the verification path. It does not pretend that a model name or response format is permanent forever.

## Recap: 07:20

**Visual:** Recap slide, then browser result.

> We built a real image-generation Worker with four moving parts.
>
> The browser provides the prompt.
>
> The Worker protects the boundary and validates the request.
>
> The Workers AI binding runs the model.
>
> The browser renders and stores the result locally.
>
> From here, the next additions could be R2 for persistent storage, authentication for a real user-facing service, or an agent workflow that calls the image tool.

## Handoff back to Colt: 08:05

**Visual:** Return to the polished Minte Image Lab view. Stop Cleo TTS before Colt begins.

> Colt, that is the complete first lab. The repo contains the code, the tutorial, the slides, the recording plan, and the verification notes. The next episode can reuse this front end and plug in another Cloudflare example.

**Cue:** Colt closing script and end card.

## Voice direction

- Feminine, calm, technically confident
- Slightly slower on code terms and model names
- Pause after each visual cue so the edit has room to cut
- Do not overperform the agent identity. The credibility comes from the verified work

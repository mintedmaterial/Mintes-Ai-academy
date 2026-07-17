# Director Script: I Built an AI Image Lab on Cloudflare Workers AI

Target length: 8-10 minutes.

This episode uses the Minte AI Academy two-voice format. Colt owns the human introduction and closing. Cleo owns the complete technical lesson in the middle.

Use these companion files for the exact delivery tracks:

- `script-colt.md`
- `script-cleo.md`
- `two-voice-format.md`
- `recording-plan.md`

The original single-voice wording below is retained as a reference and fallback narration script. The recording plan and companion scripts are the current production source of truth.

## 00:00 Hook: show the result

[SCREEN: Start on Minte Image Lab with a finished generated image. Hold for three seconds. Slow zoom into the image and the Generate button.]

Today I am building a small AI image lab on Cloudflare Workers AI.

This is not a mockup and it is not a screenshot of somebody else's demo. The browser interface, the Worker, and the image request are all part of one small project that you can reproduce yourself.

By the end of this video, you will understand how the pieces fit together and have the structure you need to deploy your own prompt-to-image Worker.

[SLIDE: 01 title card]

The project is called Minte Image Lab. It is the first Cloudflare example in the Minte AI Academy.

## 00:35 What we are building

[SLIDE: 02 architecture]

The idea is simple. A user enters a prompt in the browser. The browser sends that prompt to a Worker. The Worker uses a Workers AI binding to run an image model. Then the Worker sends the generated image back to the browser.

The browser never needs a Cloudflare token. That is important. The secret boundary stays on the server side, inside the Worker environment.

[SCREEN: Scroll through the local UI. Point to prompt, model selector, size selector, history, and status.]

I also made the front end feel like a small product instead of a blank form. There are prompt presets, model and size controls, local browser history, a download action, and a teaching panel that tells us what each step is proving.

## 01:25 Why Workers AI

[SLIDE: 03 why Cloudflare]

Workers AI gives us access to hosted machine-learning models through the same platform where we can run our application logic. For this example, that means we do not need to stand up a GPU server, expose a model key in the browser, or build a separate inference service just to test the idea.

That does not mean every project should move to the edge automatically. It means the application and the inference call can live close together, behind one Worker boundary.

## 02:05 Create the Worker

[SCREEN: Terminal. Run the prepared setup command or open the repo.]

The repo is public, but the running demo is local-first. I can open it with Wrangler, record the lesson, and remove any temporary deployment afterward.

The important file is the Wrangler configuration. This is where we attach the Workers AI binding.

[SLIDE: 04 wrangler config]

The binding is named AI. In the Worker code, that becomes `env.AI`. That is the connection between our application code and Workers AI.

[SCREEN: Open wrangler.jsonc and highlight the ai binding.]

This is one of the reasons I like teaching from a real repo. You can see the configuration and the application code together instead of copying a mysterious command from a slide.

## 03:00 The request path

[SCREEN: Open src/worker.ts. Highlight the request route and validation.]

The browser sends a POST request to `/api/generate`. The Worker reads the prompt, checks the length, checks the selected model against an allowlist, and checks the requested image size.

These checks are deliberately small, but they teach an important habit. Even a demo should have a clear input contract. We do not want the browser sending arbitrary model identifiers or unlimited prompt data into the backend.

Then we call the AI binding with the prompt, model, width, and height. The result is decoded and returned as an image response.

[SLIDE: 05 request flow]

The whole request is four steps: validate, run, return, render.

## 04:10 Run it locally

[SCREEN: Terminal. Run `npm install` if needed, then `npm run dev`.]

Now I am starting the local Worker with Wrangler.

[SCREEN: Browser opens the local URL. Do not show credentials or unrelated tabs.]

The front end is local, but the Workers AI call still reaches the Cloudflare account. Local does not mean free. That is a detail worth remembering before you start clicking Generate repeatedly.

## 04:45 Generate a real image

[SCREEN: Click the OBSERVATORY preset. Change one setting. Click Generate. Keep the request status visible.]

I am starting with the observatory preset, then I will change the prompt so this is a real request rather than a canned screenshot.

[SCREEN: Type a prompt in your own voice. Suggested: “A small orange research station floating above a black ocean planet, editorial technology illustration.”]

Now I am sending the request.

[SCREEN: Wait on the generating state. Keep the terminal visible in a later cut if useful.]

The browser is waiting for the Worker. The Worker is waiting for the model. When the response comes back, the UI turns those image bytes into a preview and saves the result in local browser history.

[SCREEN: Show final image, download action, and history item.]

That is the complete path. Prompt in, Worker in the middle, image out.

## 06:00 What can go wrong

[SLIDE: 06 gotchas]

There are three things I would check first if this fails.

One: the AI binding is missing or named differently from the code.

Two: the selected model is not available in the current account or has changed since the tutorial was recorded.

Three: the image request is valid but the local development environment is not authenticated with the Cloudflare account you expected.

Cloudflare changes quickly, so a good tutorial should show the date, the repo, and the verification path. It should not pretend that a model name is permanent forever.

## 07:00 What we learned

[SLIDE: 07 recap]

We built a real image-generation Worker with four moving parts:

The browser provides the prompt.

The Worker protects the boundary and validates the request.

The Workers AI binding runs the model.

The browser renders and stores the result locally.

That is enough to build a useful first application. From here, the next logical additions are R2 for persistent storage, authentication for a real user-facing service, and eventually an agent workflow that can call the image tool.

## 07:45 Tease and CTA

[SCREEN: Return to the polished Minte Image Lab view.]

This is Minte Image Lab, the first Cloudflare lab in the Minte AI Academy. The repo, tutorial, and recording materials will be linked below.

The next episode can take this same lab and add persistent image storage with R2, or we can switch the adapter and explore another Cloudflare example.

If you want to follow along, start with the repo, use your own Cloudflare account, and never leave a public unauthenticated inference endpoint running just for a tutorial.

Subscribe for the next Cloudflare build, and check out skills.minte.dev for the wider Minte AI Academy ecosystem.

[END CARD: Minte AI Academy / Cloudflare Monday]

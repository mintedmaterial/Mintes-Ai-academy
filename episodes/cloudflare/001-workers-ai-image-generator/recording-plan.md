# Recording plan

## Format

This episode uses the Minte AI Academy two-voice format:

- Colt gives the human introduction and closing.
- Cleo narrates and drives the complete technical middle.
- The desktop capture shows browser, code or terminal, and the agent workspace together.

Read `two-voice-format.md` before recording.

## Before recording

- Close unrelated browser tabs and notifications.
- Do not show API tokens, account IDs, private domains, billing details, email, or personal messages.
- Open a dedicated Hermes recording conversation or prepared local transcript.
- Keep the terminal in the academy repo directory.
- Run `npm install` if needed and then `npm run dev`.
- Confirm the local UI loads.
- Confirm one real generation succeeds before the final take.
- Prepare the prompt in a text file for copy and paste.
- Open slides in the order listed below.
- Put Colt and Cleo on separate audio tracks.

## Screen layout

### Default three-panel layout

- Browser hero: 60 percent
- VS Code or terminal proof: 25 percent
- Hermes/Cleo panel: 15 percent

### Code layout

- VS Code: 55 percent
- Browser preview: 30 percent
- Hermes/Cleo panel: 15 percent

### Generation layout

- Browser result: 65 percent
- Terminal/logs: 20 percent
- Hermes/Cleo panel: 15 percent

Keep the Cleo panel large enough to read the active instruction, but never let it cover the code or image result.

## Capture order

### Capture A: Colt opening

- Browser at the finished Minte Image Lab result.
- Hold the image for three seconds.
- Colt reads the cold open from `script-colt.md`.
- Hand off to Cleo at the title slide.

### Capture B: Cleo handoff and product tour

- Start Cleo TTS with the handoff block.
- Show the title slide, then the architecture slide.
- Scroll through prompt, presets, model and size controls, output, history, and teaching panel.
- Keep the corresponding Cleo instruction visible in the agent panel.

### Capture C: Why Cloudflare and repo

- Cleo reads the Why Workers AI section.
- Show the Why Cloudflare slide.
- Show the repo tree and terminal.
- Do not show local environment files.

### Capture D: Config and code

- Show the binding slide.
- Open `wrangler.jsonc` with the AI binding highlighted.
- Open `src/worker.ts` showing `/api/generate`, validation, multipart input, `env.AI`, output unwrap, and image response.
- Show the request-flow slide.

### Capture E: Live run

- Cleo reads the local-run section.
- Terminal runs `npm run dev`.
- Browser opens the local URL.
- Click OBSERVATORY preset.
- Change the prompt to: `A small orange research station floating above a black ocean planet, editorial technology illustration.`
- Click Generate.
- Capture the generating state.
- Capture the finished image and local history.
- Let the actual wait remain visible long enough to feel real.

### Capture F: Gotchas and recap

- Show the gotchas slide while Cleo reads the failure checks.
- Show the recap slide.
- Return to the browser result.
- Stop Cleo TTS before Colt begins the closing.

### Capture G: Colt closing

- Colt reads the closing from `script-colt.md`.
- Show the repo link and end card.
- Hold the end card for four seconds.

## Slide cues

- Slide 01 at 00:20
- Slide 02 at 00:45
- Slide 03 at 01:35
- Slide 04 at 02:35
- Slide 05 at 04:20
- Slide 06 at 06:20
- Slide 07 at 07:20
- End card at 08:15

## Audio and edit notes

- Keep Colt and Cleo on separate tracks.
- Add a short audio gap at both handoffs.
- Do not let background music compete with Cleo's code explanations.
- If the live request takes longer than expected, keep the wait visible, then cut to the verified result without pretending it was instant.
- If a TTS line runs long, adjust the screen hold first. Do not speed up Cleo until the voice stops sounding natural.

## Teardown

- Stop the Wrangler process after recording.
- Remove any temporary Worker or Sandbox deployment.
- Confirm no public unauthenticated endpoint remains.
- Save the final screen recording and audio stems outside the public repo until the edit is approved.

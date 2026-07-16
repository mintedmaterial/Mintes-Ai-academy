# Recording plan

## Before recording

- Close unrelated browser tabs and notifications.
- Do not show API tokens, account IDs, private domains, billing details, email, or personal messages.
- Run `npm install` and `npm run dev`.
- Confirm the local UI loads.
- Confirm one real generation succeeds.
- Prepare a clean prompt in a text file for copy and paste.
- Keep the terminal in the academy repo directory.
- Open slides in the order listed below.

## Capture order

### Capture A: Hook

- Browser at the finished Minte Image Lab result.
- Hold the image for three seconds.
- Click the download action once.
- Return to the main view.

### Capture B: Product tour

- Prompt field.
- Preset cards.
- Model and size controls.
- Generate action.
- Local history.
- What This Teaches panel.

### Capture C: Repo and config

- Terminal showing the repo path.
- `wrangler.jsonc` with the AI binding highlighted.
- `src/worker.ts` showing `/api/generate`, validation, and `env.AI.run`.
- Do not show local environment files.

### Capture D: Live run

- Terminal running `npm run dev`.
- Browser local URL.
- Click OBSERVATORY preset.
- Change the prompt to: `A small orange research station floating above a black ocean planet, editorial technology illustration.`
- Click Generate.
- Capture the generating state.
- Capture the finished image and local history.

### Capture E: Verification

- Terminal response or browser result that confirms the image returned.
- Show the download action.
- Optional: open the downloaded PNG in a separate clean viewer.

## Slide cues

- Slide 01 at 00:15
- Slide 02 at 00:35
- Slide 03 at 01:25
- Slide 04 at 02:25
- Slide 05 at 03:40
- Slide 06 at 06:00
- Slide 07 at 07:00
- End card at 07:45

## Delivery style

Talk like a builder explaining a thing you just made. Keep the screen moving with purpose. If a live request takes longer than expected, let the waiting state breathe for a moment, then cut to the result without pretending the response was instant.

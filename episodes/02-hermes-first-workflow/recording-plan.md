# Recording Plan

The format is a narrated technical explainer with privacy-safe terminal visualizations. It is not a claim that every workflow step is being executed live during the recording. Live CLI evidence verifies the installed Hermes version, active config, available integrations, existing profiles, and scheduler state. The tutorial teaches the next safe commands and the verification gates viewers should run in their own profile.

Before recording, every command shown in the explainer was checked against the local Hermes CLI and official docs. Secrets, private IDs, and delivery targets remain off-screen.
- Use monospace terminal cards for commands and result excerpts.
- Keep the command on screen long enough to read.
- Use official docs links in the blog and YouTube description.
- Preserve raw narration stems and the final master.

## Render contract
- 1920×1080, H.264/AAC, 30 fps
- dark slate background, cyan Hermes accent, amber for warnings
- voice stems remain separate until the final mux
- verify with ffprobe, full decode, SHA-256, and sampled frames

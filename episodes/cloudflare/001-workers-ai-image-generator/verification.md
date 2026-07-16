# Verification checklist

Record these after the demo is tested.

- [ ] `npm run build` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run validate` passes.
- [ ] Local UI loads from Wrangler.
- [ ] One real Workers AI image request succeeds.
- [ ] Returned content type is `image/png`.
- [ ] Generated image downloads successfully.
- [ ] History survives a page refresh during the session.
- [ ] No secrets or private URLs appear in screenshots.
- [ ] Temporary deployed Worker is deleted after recording, if one was used.
- [ ] Final screen recording is 1920x1080 and the narration matches the screen.
- [ ] Thumbnail headline matches the actual lesson.

## Evidence fields

- Tested date:
- Wrangler version:
- Model tested:
- Local URL:
- Temporary Worker name, if used:
- Teardown result:
- Screenshot folder:
- Final render path:

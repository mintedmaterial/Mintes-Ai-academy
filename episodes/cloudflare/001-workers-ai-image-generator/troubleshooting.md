# Troubleshooting

## The page loads but Generate fails

Confirm `npm run dev` is running from the repository root and that the AI binding is named `AI` in `wrangler.jsonc`.

## Model access fails

Model availability changes. Check the current Workers AI model catalog and replace the model ID in the allowlist only after a direct test succeeds.

## Local development is not free

Workers AI calls can incur usage charges during local development. Use a small number of deliberate test requests and tear the demo down when finished.

## Browser shows a CORS error

The Worker adds permissive CORS headers for the local teaching demo. Do not copy that policy unchanged into a production service.

## Image is returned but does not render

Confirm the response content type is `image/png`, then inspect the response as a blob in the browser. Do not JSON-parse an image response.

## Do not ship these shortcuts

- Do not put a Cloudflare token in `public/app.js`.
- Do not leave the Worker deployed without rate limits or access control.
- Do not claim a model is current without testing it.
- Do not show private dashboard information in the recording.

interface Env {
  ASSETS: Fetcher;
  AI: Ai;
}

type GenerateRequest = { prompt?: unknown; model?: unknown; width?: unknown; height?: unknown };
const DEFAULT_MODEL = "@cf/black-forest-labs/flux-2-klein-4b";
const ALLOWED_MODELS = new Set(["@cf/black-forest-labs/flux-2-klein-4b", "@cf/black-forest-labs/flux-2-klein-9b"]);
const ALLOWED_SIZES = new Set([512, 768, 1024]);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}
function cors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-methods", "POST, OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  return new Response(response.body, { status: response.status, headers });
}
async function generate(request: Request, env: Env): Promise<Response> {
  let body: GenerateRequest;
  try { body = await request.json() as GenerateRequest; } catch { return cors(json({ error: "Send a JSON body." }, 400)); }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt || prompt.length > 500) return cors(json({ error: "Prompt must be between 1 and 500 characters." }, 400));
  const model = typeof body.model === "string" && ALLOWED_MODELS.has(body.model) ? body.model : DEFAULT_MODEL;
  const width = Number(body.width); const height = Number(body.height);
  if (!ALLOWED_SIZES.has(width) || !ALLOWED_SIZES.has(height)) return cors(json({ error: "Width and height must be 512, 768, or 1024." }, 400));
  try {
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("width", String(width));
    form.append("height", String(height));
    const serialized = new Response(form);
    const output = await env.AI.run(model, {
      multipart: {
        body: serialized.body,
        contentType: serialized.headers.get("content-type") || "multipart/form-data"
      }
    });
    const image = output && typeof output === "object" && "image" in output
      ? (output as { image: ArrayBuffer | string }).image
      : output;
    const body = typeof image === "string"
      ? Uint8Array.from(atob(image), (character) => character.charCodeAt(0))
      : image;
    const contentType = typeof image === "string" && image.startsWith("/9j/") ? "image/jpeg" : "image/png";
    const headers = new Headers({ "content-type": contentType, "cache-control": "no-store", "x-minte-model": model });
    return cors(new Response(body as unknown as BodyInit, { headers }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Workers AI request failed.";
    return cors(json({ error: message }, 502));
  }
}
export default { async fetch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === "/api/generate") {
    if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
    if (request.method !== "POST") return cors(json({ error: "Use POST /api/generate." }, 405));
    return generate(request, env);
  }
  return env.ASSETS.fetch(request);
} };

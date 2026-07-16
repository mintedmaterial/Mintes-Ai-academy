import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
const required = ["README.md", "AGENTS.md", "wrangler.jsonc", "public/index.html", "public/app.js", "public/styles.css", "episodes/cloudflare/001-workers-ai-image-generator/script.md", "episodes/cloudflare/001-workers-ai-image-generator/recording-plan.md"];
for (const file of required) await access(join(process.cwd(), file));
const html = await readFile(join(process.cwd(), "public/index.html"), "utf8");
if (!html.includes("Minte Image Lab")) throw new Error("Missing product marker");
console.log(JSON.stringify({ ok: true, checked: required.length, marker: "Minte Image Lab" }));

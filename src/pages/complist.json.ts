import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

export const GET: APIRoute = () => {
  const compNames = fs.readdirSync(path.join(process.cwd(), "src", "components", "solid"));
  return new Response(JSON.stringify(compNames));
};

import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "components", "solid");

export const GET: APIRoute = () => {
  let compNames = fs
    .readdirSync(dir)
    .map((item) => {
      return fs.statSync(path.join(dir, item)).isDirectory()
        ? [item, fs.readdirSync(path.join(dir, item, "demos"))]
        : false;
    })
    .filter(Boolean);

  return new Response(JSON.stringify(compNames));
};

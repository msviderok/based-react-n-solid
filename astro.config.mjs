// @ts-check
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/layout/solid",
    "/solid": "/layout/solid",
    "/react": "/layout/react",
    "/layout/solid-js": "/layout/solid",
  },
  integrations: [
    react({ include: ["**/react/**/*.{ts,tsx}"] }),
    solid({ include: ["**/solid/**/*.{ts,tsx}"] }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(fileURLToPath(import.meta.url), "../src"),
      },
    },
    server: {
      port: 4000,
    },
  },
});

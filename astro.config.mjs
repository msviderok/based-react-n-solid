// @ts-check
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({ include: ["**/react/**/*.{ts,tsx}"] }),
    solid({ include: ["**/solid/**/*.{ts,tsx}"] }),
  ],
});

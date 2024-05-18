import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import { loadEnv } from "vite";
const { CLOUDINARY_SECRET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: 'server'
});
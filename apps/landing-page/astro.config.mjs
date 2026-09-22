// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import styleXPlugin from "unplugin-stylex/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon(),
    react(),
    // @ts-expect-error unplugin-stylex Astro types are incompatible with Astro 7
    styleXPlugin({
      stylex: {
        // @ts-expect-error hydration errors
        dev: false,
        runtimeInjection: false,
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: process.cwd(),
        },
      },
    }),
  ],
  vite: {
    envDir: "../../",
  },
});

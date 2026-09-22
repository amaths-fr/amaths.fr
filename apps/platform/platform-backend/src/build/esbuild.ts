import { build } from "esbuild";

build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  packages: "bundle",
  external: ["node:*"],
  outfile: "dist/app.js",
  banner: {
    js: `
      import { createRequire } from 'node:module';
      const require = createRequire(import.meta.url);
    `,
  },
}).catch(console.error);

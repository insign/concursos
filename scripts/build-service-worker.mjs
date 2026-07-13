import { unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { injectManifest } from 'workbox-build';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const source = fileURLToPath(new URL('../src/service-worker.ts', import.meta.url));
const compiledSource = fileURLToPath(new URL('../dist/service-worker-source.js', import.meta.url));
const destination = fileURLToPath(new URL('../dist/service-worker.js', import.meta.url));

await build({
  root,
  configFile: false,
  publicDir: false,
  logLevel: 'warn',
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    emptyOutDir: false,
    minify: 'esbuild',
    outDir: outputDirectory,
    target: 'es2022',
    rollupOptions: {
      input: source,
      output: {
        entryFileNames: 'service-worker-source.js',
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});

const result = await injectManifest({
  globDirectory: outputDirectory,
  globPatterns: [
    'index.html',
    'offline/index.html',
    'favicon.svg',
    'icons/*.png',
    'manifest.webmanifest',
    '_astro/*.{css,woff,woff2,ttf}',
    '_astro/page.*.js',
    '_astro/PwaRuntime.*.js',
    '_astro/offline-db.*.js',
    '_astro/offline.*.js',
    '_astro/offline-packages.*.js',
    '_astro/preload-helper.*.js',
    '_astro/workbox-window.*.js',
  ],
  maximumFileSizeToCacheInBytes: 5_000_000,
  swSrc: compiledSource,
  swDest: destination,
});

await unlink(compiledSource);
if (result.count === 0) throw new Error('Service Worker gerado sem recursos de precache.');
console.log(`Service Worker generated with ${result.count} precached resources.`);

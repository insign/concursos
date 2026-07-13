// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import astroMermaid from 'astro-mermaid';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  output: 'static',
  site: 'https://concursos.helio.me',
  integrations: [
    astroMermaid({
      autoTheme: false,
      enableLog: false,
      theme: 'neutral',
      mermaidConfig: {
        securityLevel: 'strict',
      },
    }),
  ],
  markdown: {
    processor: unified({
      gfm: false,
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    syntaxHighlight: 'shiki',
  },
  vite: {
    plugins: [
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'service-worker.ts',
        injectRegister: false,
        registerType: 'prompt',
        manifestFilename: 'manifest.webmanifest',
        manifest: {
          id: '/',
          name: 'Concursos',
          short_name: 'Concursos',
          description: 'Portal offline para estudo de concursos públicos.',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          theme_color: '#275d55',
          background_color: '#eee9df',
          lang: 'pt-BR',
          icons: [
            { src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
            {
              src: '/icons/pwa-maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        injectManifest: {
          globPatterns: [
            'index.html',
            'offline/index.html',
            'favicon.svg',
            'icons/*.png',
            'manifest.webmanifest',
            '_astro/*.{css,woff,woff2,ttf}',
            '_astro/offline.*.js',
          ],
          maximumFileSizeToCacheInBytes: 5_000_000,
        },
      }),
    ],
  },
});

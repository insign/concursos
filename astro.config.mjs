// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import astroMermaid from 'astro-mermaid';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

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
});

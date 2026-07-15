# Concursos

Portal de estudos para concursos, construído com Astro e publicado como site estático. O projeto oferece conteúdo técnico, cheat sheets para impressão, questionários, preferências e progresso sincronizados, PWA e pacotes de concurso para uso offline.

O plano autoritativo da implementação está em [`final_plan.md`](./final_plan.md).

## Requisitos

- Node.js 22.12.0 ou superior.
- npm, com instalação reproduzível pelo `package-lock.json`.

## Comandos

| Comando | Ação |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Inicia o servidor local |
| `npm run check` | Valida Astro e TypeScript |
| `npm run test` | Executa toda a suíte Vitest |
| `npm run test:unit` | Executa os testes unitários |
| `npm run test:e2e` | Gera `dist/` e executa Playwright Chromium com os headers do Pages via Wrangler |
| `npm run icons` | Regenera os ícones locais da PWA |
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Visualiza o build localmente |

## Conteúdo

Os concursos ficam em `src/content/concursos/`. Grupos editoriais são obrigatórios, descritos por `grupo.json` e podem ser aninhados; eles não aparecem nas URLs públicas nem na identidade persistida. A única organização válida das fontes é:

```
src/content/assuntos/<concurso>/<grupo>/grupo.json
src/content/assuntos/<concurso>/<grupo>/<assunto>/
  conteudo.md
  cheat-sheet.md
  questoes.json

src/content/assuntos/<concurso>/<grupo-pai>/grupo.json
src/content/assuntos/<concurso>/<grupo-pai>/<grupo-filho>/grupo.json
src/content/assuntos/<concurso>/<grupo-pai>/<grupo-filho>/<assunto>/
  conteudo.md
  cheat-sheet.md
  questoes.json
```

Arquivos de assunto diretamente sob o concurso são proibidos. O slug final do assunto deve ser único por concurso; a URL pública permanece `/concursos/<concurso>/<assunto>/`. O build valida schemas, referências cruzadas, revisões e a presença do conjunto completo de arquivos.

Os identificadores `storageId` são persistidos em documentos locais e remotos. Depois de publicados, não devem ser alterados silenciosamente.

## Uso e dados

O alias escolhido no navegador identifica um perfil público; ele não representa autenticação nem privacidade. Respostas, preferências, progresso e a fila de sincronização permanecem no IndexedDB e são sincronizados com a API pública `https://kv.helio.me` quando há conexão. A página de configurações permite exportar e importar um backup de perfil.

Conteúdo já visitado pode ser lido offline. A interface também permite baixar ou remover atomicamente o pacote completo de um concurso. O tráfego do KV nunca é armazenado no Cache Storage.

## Deploy

A branch `main` está conectada ao projeto Cloudflare Pages `concursos`. Cada push executa `npm run build` e publica `dist/` em `https://concursos-ebs.pages.dev` e `https://concursos.helio.me`.

Os dois domínios devem manter CSP restritiva e `X-Robots-Tag: noindex, nofollow`. Isso orienta crawlers, mas não torna os dados privados.

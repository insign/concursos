# Concursos

Portal de estudos para concursos, construído com Astro e publicado como site estático. O projeto oferece conteúdo técnico, cheat sheets para impressão, questionários, preferências e progresso sincronizados, PWA e pacotes de concurso para uso offline.

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
src/content/assuntos/<concurso>/<grupo>/mega-revisao/index.md  # opcional
src/content/assuntos/<concurso>/<grupo>/<assunto>/
  conteudo.md
  cheat-sheet.md
  questoes.json

src/content/assuntos/<concurso>/<grupo-pai>/grupo.json
src/content/assuntos/<concurso>/<grupo-pai>/<grupo-filho>/grupo.json
src/content/assuntos/<concurso>/<grupo-pai>/<grupo-filho>/mega-revisao/index.md  # opcional
src/content/assuntos/<concurso>/<grupo-pai>/<grupo-filho>/<assunto>/
  conteudo.md
  cheat-sheet.md
  questoes.json
```

Arquivos de assunto diretamente sob o concurso são proibidos. O slug final do assunto deve ser único por concurso; a URL pública permanece `/concursos/<concurso>/<assunto>/`. O build valida schemas, referências cruzadas, revisões e a presença do conjunto completo de arquivos.

Os identificadores `storageId` são persistidos em documentos locais e remotos. Depois de publicados, não devem ser alterados silenciosamente.

Uma mega revisão é um documento autoral opcional do grupo. Sua abrangência deriva dos assuntos descendentes em ordem editorial; quando um subgrupo possui sua própria revisão, ele aparece como uma revisão delegada para evitar duplicação. A página estática usa a rota `/revisoes/<concurso>/<revisao>/`, entra no pacote offline e não participa de respostas, progresso, estudados, simulados ou sincronização.

## Uso e dados

O alias escolhido no navegador identifica um perfil público; ele não representa autenticação nem privacidade. Respostas, preferências, progresso e a fila de sincronização permanecem no IndexedDB e são sincronizados com a API pública `https://kv.helio.me` quando há conexão. A página de configurações permite exportar e importar um backup de perfil.

Ativar o primeiro alias ou trocar de alias exige conexão. Antes de alterar o perfil ativo, o navegador lê e valida preferências, todas as respostas do catálogo e progresso; um alias remoto existente é vinculado diretamente após esse preflight. Sem registro local do documento alvo, sua cópia remota é adotada; o progresso derivado ainda pode ser recalculado e republicado a partir das respostas resolvidas. Falhas de rede, validação ou aplicação preservam o alias atual e as pendências locais.

A sincronização arbitra cada documento completo pela maior versão remota observada: a versão maior vence mesmo com outbox pendente, empate pendente publica o estado local e empate limpo não grava. Uma pendência local sem versão remota previamente observada não possui linhagem comparável, é preservada e gera aviso se substituir um remoto existente; regressões ou recriações remotas seguem as salvaguardas específicas de cada documento. Escritas locais concorrentes continuam sendo reconciliadas no IndexedDB, mas o KV é last-write-wins e não oferece compare-and-set; portanto, não há garantia de sincronização perfeita entre clientes independentes.

Para o alias ativo, a página principal de um concurso oferece **Resumir leitura** quando o último conteúdo desse mesmo concurso possui uma posição salva. A ação abre a rota canônica em `#focus` e restaura o ponto sem exigir que a leitura anterior já estivesse no modo sem distrações.

Conteúdo já visitado pode ser lido offline. A interface também permite baixar ou remover atomicamente o pacote completo de um concurso. O tráfego do KV nunca é armazenado no Cache Storage.

## Deploy

A branch `main` está conectada ao projeto Cloudflare Pages `concursos`. Cada push executa `npm run build` e publica `dist/` em `https://concursos-ebs.pages.dev` e `https://concursos.helio.me`.

Os dois domínios devem manter CSP restritiva e `X-Robots-Tag: noindex, nofollow`. Isso orienta crawlers, mas não torna os dados privados.

# Project Agent Guide

Status: guia operacional autoritativo e documento vivo.

## Autoridade e leitura obrigatória

- Leia este arquivo antes de alterar o projeto.
- Leia `final_plan.md` integralmente antes de iniciar ou retomar uma fase de implementação.
- `final_plan.md` é a fonte autoritativa dos requisitos, contratos, riscos aceitos e definição de pronto.
- Este arquivo resume o estado real e as regras operacionais que todo agente deve observar automaticamente.
- Se o código, este arquivo e `final_plan.md` divergirem, não escolha silenciosamente. Investigue o histórico e corrija a documentação na mesma mudança ou peça decisão ao usuário.

## Estado atual

- Repositório: `https://github.com/insign/concursos`.
- Branch padrão: `main`.
- Plano âncora: `803a1a4`.
- Projeto: Astro 7 estático, Node.js 22.12.0 ou superior, npm e TypeScript strict.
- Pipeline editorial: Unified via `@astrojs/markdown-remark`, GFM, KaTeX local, Shiki e `astro-mermaid`/Mermaid client-side.
- Domínio: `https://concursos.helio.me`.
- Cloudflare Pages: projeto `concursos`, URL `https://concursos-ebs.pages.dev`.
- O Pages já possui Git integration com `insign/concursos` e faz deploy de `main`.
- Build do Pages: `npm run build`.
- Diretório publicado: `dist`.
- O scaffold, o projeto Pages, a Git integration e o custom domain já existem. Não os recrie.
- A implementação, os testes integrados, a revisão independente, a documentação e a validação de produção foram concluídos em 14 de julho de 2026 conforme `final_plan.md`.

## Comandos atuais

```bash
npm install
npm run dev
npm run check
npm run test
npm run test:unit
npm run test:e2e
npm run icons
npm run build
npm run preview
```

- Execute `npm run test:unit`, `npm run check` e `npm run build` após mudanças em conteúdo, schemas ou catálogo.
- `npm run test` executa a suíte Vitest completa; `npm run test:e2e` executa Playwright Chromium sobre `dist` servido por `wrangler pages dev`, para aplicar `public/_headers`.
- `npm run icons` regenera os ícones da PWA; execute-o somente quando a fonte ou a geração de ícones mudar.
- Use Wrangler v4 instalado no projeto para diagnóstico do Pages.
- Não use `wrangler pages project create`: isso criaria um projeto Direct Upload separado e sem a Git integration existente.

## Restrições técnicas

- Preserve saída Astro totalmente estática.
- Use npm e mantenha `package-lock.json` sincronizado.
- Preserve TypeScript strict.
- Não adicione React, Vue, Svelte, Tailwind, Axios ou estado global sem necessidade concreta e aprovação explícita.
- Use componentes Astro e JavaScript/TypeScript nativo para interatividade.
- Não adicione adapter Cloudflare enquanto o projeto permanecer estático.
- Não introduza backend, autenticação ou CMS fora do escopo aprovado.
- Prefira a menor mudança correta e preserve a arquitetura descrita no plano.

## Markdown técnico

- O Astro 7 usa explicitamente o processador Unified configurado em `astro.config.mjs`; preserve e revalide GFM e a renderização KaTeX ao alterar o pipeline Markdown.
- KaTeX é renderizado no build, e seu CSS e suas fontes são empacotados localmente. Não adicione CDN.
- Mermaid é transformado por `astro-mermaid`, renderizado no navegador e deve permanecer com `securityLevel: "strict"`.
- Páginas com diagramas devem incluir `MermaidRuntime.astro`, que expõe `window.mermaidReady`, marca `data-render-status` e preserva fallback textual em falha.
- Controles de impressão devem aguardar `window.mermaidReady` antes de chamar `window.print()`.
- Mantenha carregamento condicional: páginas sem diagramas não devem importar o runtime Mermaid no navegador.

## Conteúdo e rotas

- A hierarquia canônica é concurso -> assunto.
- Cada assunto terá conteúdo completo, cheat sheet e questões.
- Conteúdo e cheat sheet ficam em Markdown; questões ficam em JSON.
- As quatro Content Collections ficam em `src/content.config.ts`: `concursos`, `conteudos`, `cheatSheets` e `questoes`.
- Schemas Zod reutilizáveis ficam em `src/lib/content-schema.ts`; mantenha objetos estritos e versões conhecidas.
- `src/lib/catalog.ts` relaciona as collections, e a página raiz chama `getCatalog()` para que toda validação cruzada execute no build.
- O caminho gera o ID canônico: arquivo do concurso para `<concurso>` e pasta do assunto para `<concurso>/<assunto>`.
- Todo assunto deve possuir `conteudo.md`, `cheat-sheet.md` e `questoes.json`; arquivos ausentes ou órfãos devem falhar no build.
- Preserve IDs e `storageId` estáveis; nunca use posição de array como identidade.
- Não duplique metadados que possam ser derivados de sua fonte canônica.
- `BaseLayout.astro` concentra metadados, CSS global e cabeçalho; `StudyLayout.astro` concentra breadcrumbs, abas e navegação entre assuntos.
- As abas de conteúdo, cheat sheet e questões são rotas estáticas e links reais com `aria-current="page"`.
- Conteúdo e cheat sheet devem continuar legíveis sem JavaScript; só Mermaid e controles interativos dependem do navegador.
- `src/styles/global.css` define a linguagem editorial responsiva, e `src/styles/print.css` preserva o cheat sheet e remove navegação/controles na impressão.
- `Questionnaire.astro` usa controles nativos e delega o estado da sessão a `questionnaire-controller.ts`.
- Os layouts `single`, `ten` e `all` são apenas apresentações; `all` deve continuar carregando blocos de dez progressivamente.
- `immediate` revela correção por seleção; `on-submit` só revela após todas as questões e uma assinatura válida.
- Alterar qualquer resposta invalida a assinatura de submissão; hash e pontuação ficam em `src/lib/questionnaire.ts`.
- Embaralhamento usa `question-order.ts` e deve permanecer determinístico por usuário, concurso, assunto e revisão do conjunto.
- Consulte `final_plan.md` para schemas, revisões, rotas e regras editoriais completas.

## KV, offline e sincronização

- O endpoint aprovado é `https://kv.helio.me`.
- A API é pública, sem autenticação, last-write-wins e usa PUT de documento completo.
- Nunca envie `Authorization`, credenciais ou dados sensíveis.
- Nunca faça PUT parcial nem trate CORS como autorização.
- Valide todo JSON remoto antes de usá-lo.
- Nunca coloque respostas da API KV no Cache Storage do Service Worker.
- IndexedDB é a persistência local para respostas e outbox; `localStorage` não substitui a outbox.
- `src/lib/identity.ts` valida aliases sem normalização; segmentos usam `^[a-z0-9]+(?:-[a-z0-9]+)*$` e os limites do plano.
- IDs de respostas usam `concursos--<alias>--<contestStorageId>--<subjectStorageId>`; preferências usam `concursos--<alias>--preferencias`; progresso usa `concursos--<alias>--progresso`.
- Alias, concurso e assunto têm limites respectivos de 32, 20 e 32 caracteres; o ID remoto completo deve ter no máximo 100 caracteres.
- O alias ativo é o único dado de identidade em `localStorage`, na chave `concursos:active-alias`; ele é público e não é conta ou segredo.
- `src/lib/offline-db.ts` possui stores para respostas, preferências, progresso, downloads, leases e quarentena.
- Cada resposta local mantém documento atual, snapshot-base, metadados remotos, IDs sujos, outbox, tentativas, erro e aviso de conflito.
- Escritas locais concorrentes mesclam somente os IDs de questões marcados como sujos com o registro IndexedDB mais recente, preservando respostas gravadas por outras abas.
- Toda seleção e finalização deve concluir a transação IndexedDB antes de anunciar salvamento local; a finalização reconcilia e assina o registro durável mais recente dentro da mesma transação, nunca o snapshot potencialmente obsoleto da aba.
- Trocar de alias nunca reutiliza respostas do perfil anterior; pendências exigem sincronização online ou descarte explícito offline.
- O backup de perfil usa schema v1 com `schemaVersion`, `exportedAt`, `sourceAlias`, documentos de respostas identificados pelos `contestStorageId` e `subjectStorageId` estáveis, e preferências; não exporta metadados internos de sincronização, progresso, leases, quarentena ou downloads.
- A exportação aguarda escritas locais, inclui apenas assuntos do catálogo atual e reconcilia respostas às revisões e opções atuais das questões.
- A importação exige confirmação explícita, sempre grava no alias ativo e valida estritamente o schema e o catálogo atual; ela sobrepõe atomicamente os assuntos importados, preserva assuntos locais não relacionados, substitui preferências, reconstrói progresso e tenta novamente snapshots de perfil obsoletos até três vezes. Dados importados permanecem pendentes para sincronização.
- `src/lib/kv-client.ts` é o único cliente do KV: usa `fetch`, timeout, limite operacional de corpo e retry limitado para 429, sem `Authorization`.
- `src/lib/sync.ts` coordena uma fila serial limitada a duas requisições por segundo, protegida por lease IndexedDB e acordada entre abas por `BroadcastChannel`; renovar exige um lease existente, não expirado e do mesmo owner, nunca readquire um lease perdido, e qualquer falha interrompe a operação antes de novas leituras, retries ou escritas remotas.
- O catálogo estático `/sync-catalog.json` fornece schemas editoriais ao coordenador; ele não contém identidade nem estado do usuário.
- Todo JSON remoto é validado antes do merge; documento malformado vai para quarentena e nunca substitui estado local válido.
- O merge é por questão: mudança local exclusiva usa local, remota exclusiva usa remoto e conflito na mesma questão usa o último remoto observado.
- O PUT sempre envia o documento completo mais recente. Uma edição local concluída durante o PUT permanece pendente e não é apagada pela confirmação remota.
- Saltos de versão, regressão e mudança de `created_at` geram aviso; um cliente com catálogo editorial mais antigo recusa reconciliar ou sobrescrever documento local ou remoto com `questionSetRevision` mais nova; não alegue recuperação ou sincronização perfeita.
- Gatilhos atuais: seleção/finalização, inicialização, `online`, foco, visibilidade, retry manual e troca de perfil.
- Preferências são cacheadas no IndexedDB, sincronizadas no documento global e mescladas por campo; no mesmo campo alterado dos dois lados, o remoto observado prevalece.
- Progresso é uma visão materializada das respostas, não sua fonte; no modo `on-submit`, `correct` só existe depois de submissão válida.
- Progresso mescla por assunto e maior `answerVersion`; revisão divergente aparece como desatualizada, e Configurações oferece recálculo sequencial local.
- Escritas locais concorrentes de preferências mesclam somente os campos sujos, e atualizações de progresso mesclam somente os assuntos alterados com o registro IndexedDB mais recente.
- Cada atualização local de um assunto do progresso lê a preferência vigente e grava o assunto na mesma transação `preferences` + `progress`, impedindo abas com modo de correção obsoleto de reintroduzir `correct`.
- Não publique progresso antes de sincronizar respostas pendentes do catálogo atual e preferências. Mudanças de `correctionMode` persistem a preferência, sanitizam imediatamente o progresso local não submetido e gravam o marcador de rematerialização na mesma transação IndexedDB.
- Antes do primeiro PUT de progresso e em cada retry por 429, confira as revisões exatas de progresso e preferências e a ausência de respostas pendentes; filtre assuntos removidos do catálogo e mantenha registros de respostas órfãos como erros sem bloquear o progresso válido.
- Falha de preferências ou progresso permanece recuperável e nunca invalida o documento de respostas.
- Não declare sincronização perfeita, pois a API não possui compare-and-set.

## PWA e Cloudflare

- Preserve a Git integration e o deploy automático existentes.
- Use previews do Pages durante a implementação.
- Mantenha `concursos.helio.me` e `concursos-ebs.pages.dev` com `noindex, nofollow`.
- `noindex` não oferece privacidade.
- O tráfego KV deve permanecer NetworkOnly no Service Worker.
- `vite-plugin-pwa` integra manifesto e Service Worker ao Astro; `scripts/finalize-security.mjs` é executado imediatamente após o build Astro e antes dos inventários offline e do build final do Service Worker por `scripts/generate-offline-inventories.mjs` e `scripts/build-service-worker.mjs`.
- Os caches persistentes são `shared-assets-v1`, `runtime-pages-v1`, `runtime-media-v1` e os pacotes de concurso `contest--...`.
- Downloads, remoção e limpeza de pacotes devem ser serializados por Web Locks; se o navegador não puder coordená-los com segurança, a operação deve ser recusada.
- Pacotes devem armazenar a resposta original de assets same-origin e usar `ignoreVary`; os inventários devem descobrir dependências transitivas de CSS e JavaScript e classificar imagens editoriais como assets do pacote, não compartilhados.
- Downloads de concurso devem ser atômicos, preservar o cache anterior até a atualização por hash ser ativada e limpar caches de concurso órfãos; a promoção deve remover rotas visitadas equivalentes sem barra, com barra e `index.html` do cache de páginas. Assets compartilhados são intencionalmente retidos para páginas já visitadas.
- Atualizações automáticas só podem recarregar depois que o estado local estiver durável.
- O Playwright continua bloqueando Service Workers por padrão e serve `dist` com `wrangler pages dev` para que os headers de Pages sejam aplicados; `tests/e2e/pwa.spec.ts` os habilita explicitamente.
- A zona `helio.me` possui uma Cache Rule restrita ao caminho `/service-worker.js` que respeita o Browser TTL da origem. Preserve e revalide essa exceção, pois o Browser Cache TTL global da zona não pode sobrepor o `max-age=0` emitido por `public/_headers` para o Service Worker.
- Valide PWA, Service Worker, CSP, caches, TLS e headers no domínio real antes de concluir.

## Segurança

- Nunca commite `.env`, tokens, credenciais ou segredos.
- Não exponha credenciais da Cloudflare ou GitHub em comandos, logs, bundle ou documentação.
- Mantenha Mermaid em `securityLevel: "strict"`.
- Preserve `X-Robots-Tag: noindex, nofollow` e a meta tag equivalente.
- O Astro gera uma meta CSP por página com hashes SHA-256 para scripts; `script-src` nunca pode permitir `unsafe-inline` nem `unsafe-eval`.
- `scripts/finalize-security.mjs` deve validar a CSP gerada e substituir somente `style-src`, permitindo estilos inline exigidos por KaTeX, Shiki e Mermaid.
- `public/_headers` é a fonte da CSP HTTP e de `frame-ancestors`, `X-Robots-Tag`, `Permissions-Policy`, `X-Content-Type-Options`, políticas de referrer e frame, e cache de assets hashados, manifesto e Service Worker.
- CSP deve permitir somente `'self'` e `https://kv.helio.me` em `connect-src`; `font-src` pode incluir `data:` para fontes Mermaid, e `unsafe-eval` permanece proibido.
- `robots.txt` deve permitir crawling para que crawlers observem o `noindex`; `noindex` não oferece privacidade.
- A página 404 própria deve usar `BaseLayout` e preservar a meta `noindex` e a CSP.
- Trate o alias do usuário como identificador público, não como conta ou segredo.

## Git e validação

- Trabalhe em `main`, salvo instrução explícita diferente.
- Antes de editar, leia o status, o diff, os commits recentes e o plano ativo.
- Nunca reverta ou sobrescreva mudanças do usuário ou de outros agentes.
- Faça commits e push somente quando autorizados pelas regras da sessão ou pelo usuário.
- Antes de um commit, revise o diff completo, execute os checks aplicáveis e não inclua arquivos não relacionados.
- Após push, confirme o deployment automático do Pages quando a mudança afetar produção.

## Manutenção deste arquivo

Este `AGENTS.md` é um documento vivo, não um snapshot descartável.

Atualize-o na mesma mudança quando ocorrer qualquer alteração relevante em:

- comandos ou scripts;
- dependências estruturais;
- diretórios, módulos ou entry points;
- fontes canônicas de dados;
- schemas e formatos persistidos;
- invariantes de KV, IndexedDB ou sincronização;
- estratégia PWA e caches;
- testes e gates obrigatórios;
- build, deploy, domínio ou headers;
- segurança, escopo ou restrições arquiteturais.

Não atualize este arquivo para detalhes locais que não orientem trabalho futuro.

Ao concluir cada fase de `final_plan.md`:

1. Compare a implementação real com este arquivo.
2. Atualize regras e comandos que mudaram.
3. Registre novas invariantes que futuros agentes precisam preservar.
4. Remova instruções superadas.
5. Valide que todos os caminhos e comandos citados existem.

A última fase do projeto deve fazer uma revisão integral deste arquivo contra o código, testes, deployment e documentação reais. O projeto não está concluído enquanto o `AGENTS.md` estiver desatualizado.

## Fora de escopo

- Autenticação e autorização.
- Privacidade garantida.
- Backend Astro.
- CMS visual.
- Histórico de tentativas.
- Ranking e comentários.
- Migração automática entre aliases.
- Resolução perfeita de concorrência.

Consulte `final_plan.md` para a especificação completa e para qualquer decisão não resumida aqui.

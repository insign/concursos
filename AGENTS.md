# Project Agent Guide

Status: guia operacional autoritativo e documento vivo.

## Autoridade e leitura obrigatória

- `final_plan.md` FOI a fonte autoritativa dos requisitos, contratos, riscos aceitos e definição de pronto.
- `ROADMAP.md` é a fonte autoritativa do backlog editorial, do conteúdo programático e do estado de produção de cada assunto.

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
- Execute `npm run test:e2e` após mudanças em PWA ou Service Worker, pacotes offline, persistência ou sincronização no navegador, CSP, headers, `noindex`, Mermaid, impressão ou comportamento observado no Pages.
- `npm run icons` regenera os ícones da PWA; execute-o somente quando a fonte ou a geração de ícones mudar.
- Use Wrangler v4 instalado no projeto para diagnóstico do Pages.
- Não use `wrangler pages project create`: isso criaria um projeto Direct Upload separado e sem a Git integration existente.

## Restrições técnicas

- Preserve saída Astro totalmente estática.
- Use npm e mantenha `package-lock.json` sincronizado.
- Preserve TypeScript strict.
- Use componentes Astro e JavaScript/TypeScript nativo para interatividade, salvo instrução expressa.
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

- A hierarquia canônica é concurso -> um ou mais grupos -> assunto.
- Cada assunto terá conteúdo completo, cheat sheet e questões.
- Conteúdo e cheat sheet ficam em Markdown; questões ficam em JSON.
- As cinco Content Collections ficam em `src/content.config.ts`: `concursos`, `grupos`, `conteudos`, `cheatSheets` e `questoes`.
- Schemas Zod reutilizáveis ficam em `src/lib/content-schema.ts`; mantenha objetos estritos e versões conhecidas.
- Todo grupo deve ter um descritor estrito `grupo.json`; grupos são obrigatórios, podem ser aninhados e arquivos de assunto diretamente sob o concurso são proibidos.
- `src/lib/catalog.ts` relaciona as collections, e a página raiz chama `getCatalog()` para que toda validação cruzada execute no build.
- O caminho gera o ID canônico interno completo: arquivo do concurso para `<concurso>`, descritor de grupo para `<concurso>/<grupo-1>[/<grupo-n>...]` e pasta do assunto para `<concurso>/<grupo-1>[/<grupo-n>...]/<assunto>`; o slug final do assunto deve ser único dentro de cada concurso.
- As URLs públicas permanecem curtas, em `/concursos/<concurso>/<assunto>/`, independentemente da profundidade dos grupos internos.
- Grupos não têm `storageId` e não participam da identidade de KV, IndexedDB, backup, progresso, sincronização ou offline.
- `contest.subjects` permanece a projeção plana para rotas, persistência e offline; `contest.children` é a árvore editorial.
- Todo assunto deve possuir `conteudo.md`, `cheat-sheet.md` e `questoes.json`; arquivos ausentes ou órfãos devem falhar no build.
- O `/sync-catalog.json` mantém apenas o schema necessário para respostas, sem `origin`, para compatibilidade com clientes PWA já publicados; o filtro de origem usa o `QuestionSet` editorial entregue na página estática.
- Preserve IDs e `storageId` estáveis; nunca use posição de array como identidade.
- Não duplique metadados que possam ser derivados de sua fonte canônica.
- `BaseLayout.astro` concentra metadados, CSS global e cabeçalho; `StudyLayout.astro` concentra breadcrumbs, abas e navegação entre assuntos.
- As abas de conteúdo, cheat sheet e questões são rotas estáticas e links reais com `aria-current="page"`.
- Conteúdo e cheat sheet devem continuar legíveis sem JavaScript; só Mermaid e controles interativos dependem do navegador.
- `src/styles/global.css` define a linguagem editorial responsiva, e `src/styles/print.css` preserva o cheat sheet e remove navegação/controles na impressão.
- `Questionnaire.astro` usa controles nativos e delega o estado da sessão a `questionnaire-controller.ts`.
- Os layouts `single`, `ten` e `all` são apenas apresentações; `all` deve continuar carregando blocos de dez progressivamente.
- O filtro de origem do questionário é efêmero: altera apenas o subconjunto exibido, a contagem, paginação e embaralhamento; nunca o persista em preferências, `localStorage`, IndexedDB, KV ou backup. Respostas, finalização, assinatura, pontuação, sincronização e progresso permanecem sobre o `QuestionSet` completo.
- `immediate` revela correção por seleção; `on-submit` só revela após todas as questões e uma assinatura válida.
- Alterar qualquer resposta invalida a assinatura de submissão; hash e pontuação ficam em `src/lib/questionnaire.ts`.
- Embaralhamento usa `question-order.ts`: a ordem inicial permanece determinística por usuário, concurso, assunto e revisão do conjunto; a ação explícita de gerar nova ordem usa aleatoriedade efêmera e nunca altera a identidade ou a persistência das respostas.
- Consulte `final_plan.md` para schemas, revisões, rotas e regras editoriais completas.

## Fluxo editorial para novos conteúdos

### Seleção e estado no roadmap

- Ao receber uma solicitação para adicionar conteúdo, leia `ROADMAP.md` antes de pesquisar ou editar arquivos.
- Os títulos de matérias no roadmap organizam grupos editoriais. Cada assunto editorial deve formar uma unidade de estudo coesa, ser atribuído a um ou mais títulos de grupo coesos representados por `grupo.json` e ter sua própria pasta contendo `conteudo.md`, `cheat-sheet.md` e `questoes.json`.
- Um assunto pode corresponder a um item principal, reunir itens intrinsecamente relacionados ou cobrir uma parte coesa de um item excessivamente amplo. O roadmap deve registrar explicitamente todos os itens, subitens e recortes abrangidos, sem omissão ou duplicação de escopo.
- Não combine itens apenas por pertencerem à mesma matéria. O agrupamento deve possuir unidade conceitual, normativa, cronológica ou de processo e permanecer viável para estudo isolado; a divisão deve ser usada quando um único item produzir material excessivamente longo ou heterogêneo.
- Se o usuário indicar um assunto, selecione esse item; caso contrário, selecione o primeiro assunto pendente na ordem do roadmap.
- Trabalhe em um assunto por vez, salvo pedido explícito para processar um lote.
- Não selecione um item já marcado como em progresso ou em revisão por outro trabalho concorrente.
- Marque o assunto como `[>] Em progresso` e publique essa reserva em commit próprio antes da pesquisa. Se o push for rejeitado, sincronize o estado e reavalie a seleção antes de continuar.
- Mova o assunto para `[R] Em revisão` durante a conferência final e mantenha esse estado no commit que publica o conteúdo, até a CI e o deployment terminarem com sucesso.
- Só depois do deployment bem-sucedido marque `[x] Concluído` em um commit de estado do roadmap e envie-o ao remoto.
- Use `[!] Bloqueado` quando uma fonte, requisito ou validação impedir a conclusão e registre objetivamente o motivo no item.
- Se uma retificação ou mudança normativa afetar um assunto concluído, reabra o item, registre fonte, data e impacto, atualize as revisões editoriais aplicáveis e repita todos os gates antes de retorná-lo a `[x]`.
- O concurso `tce-ma-2026-analista-administracao` já existe no catálogo. Não o recrie nem altere seu `storageId` ao adicionar os assuntos previstos no roadmap.
- Só crie outro arquivo de concurso quando o usuário solicitar um concurso ou cargo que ainda não esteja cadastrado.

### Pesquisa e fontes

- Use o subagente `researcher` para pesquisar o assunto antes de redigir. O briefing deve informar concurso, cargo, matéria e todos os itens, subitens e recortes do edital atribuídos ao assunto selecionado.
- Toda pesquisa que envolva o Brasil, legislação brasileira ou conteúdo editorial brasileiro deve usar português brasileiro no briefing ao `researcher`, nas consultas aos provedores e no relatório solicitado. Preserve citações exatas, nomes oficiais, títulos de fontes e termos técnicos necessários no idioma original; o prompt ao `urlreader` deve ser escrito em português, mas o conteúdo extraído deve permanecer no idioma original e sem tradução ou síntese.
- Solicite material completo e relevante para aprendizagem e cobrança em concursos, incluindo provas similares, sem limitar a pesquisa a resumos superficiais.
- Priorize edital e retificações, legislação e páginas oficiais, provas e gabaritos oficiais, documentação técnica primária e referências acadêmicas reconhecidas.
- Use o subagente `urlreader` para ler integralmente as páginas mais relevantes e resolver lacunas, divergências ou detalhes que snippets de busca não sustentem.
- O `urlreader` deve retornar o conteúdo extraído do URL, sem síntese, interpretação, contextualização ou agregação de valor; a análise e a decisão sobre esse conteúdo são responsabilidade do agente que o chamou.
- Em matérias jurídicas ou normativas, confira vigência, alterações, entendimento aplicável e corte temporal definido pelo edital.
- Nunca apresente como fato uma afirmação sem apoio nas fontes consultadas. Se fontes confiáveis divergirem, explique o recorte adotado no conteúdo.
- Termine `conteudo.md` com uma seção de referências que identifique título, entidade responsável e URL de cada fonte efetivamente usada; para normas e jurisprudência, registre também versão, publicação ou vigência relevante e data de acesso.
- Em Markdown editorial, nunca exponha uma URL crua como texto visível. Todo link deve usar um título curto, descritivo e contextual na forma `[título](URL)`, inclusive nas referências, preservando o endereço completo apenas no destino do link.

### Conteúdo completo

- Antes de escrever, inspecione os schemas e um assunto existente para preservar caminhos, frontmatter, IDs, estilo Markdown e contratos do catálogo.
- Salve o material em `src/content/assuntos/<concurso>/<grupo>/.../<assunto>/conteudo.md`, sob um ou mais grupos com `grupo.json`, e cubra integralmente todos os itens, subitens e recortes atribuídos ao assunto no roadmap.
- Defina `order` conforme a numeração fixa do assunto no roadmap; não renumere assuntos já publicados por mudança de status, omissão ou renomeação.
- Escreva para aprendizagem: apresente fundamentos, desenvolvimento gradual, exemplos, comparações, classificações, exceções, fórmulas, aplicações e erros recorrentes de prova.
- Organize o texto em uma ordem pedagógica própria quando a ordem bruta do edital não for a melhor sequência de aprendizagem, sem omitir nenhum tópico.
- Use tabelas, fórmulas, código, imagens ou Mermaid apenas quando melhorarem a compreensão e respeite todas as regras locais do pipeline Markdown.
- O conteúdo deve ensinar corretamente os conceitos necessários para responder ao banco de questões; não insira respostas artificiais apenas para espelhar perguntas específicas.

### Cheat sheet

- Produza `cheat-sheet.md` depois de concluir o conteúdo completo e de revisar as fontes principais.
- Não adicione frontmatter ao cheat sheet nem repita metadados pertencentes ao assunto.
- Use formulações afirmativas, curtas e precisas para relembrar conceitos, classificações, fórmulas, exceções e pegadinhas relevantes.
- Otimize a estrutura para leitura rápida e impressão, com títulos claros, listas e tabelas compactas quando apropriado.
- Não introduza no cheat sheet afirmações ausentes, mais amplas ou contraditórias em relação ao conteúdo completo.

### Questões

- Salve pelo menos 50 questões em `questoes.json`; esse é um mínimo editorial obrigatório, não um limite máximo nem uma validação do schema.
- Toda questão deve declarar `origin` como `authorial` ou `previous_exam`. Use `previous_exam` apenas para questão oficial ou adaptação de prova anterior verificável; use `authorial` para questão explicitamente autoral, inclusive inspirada sem reprodução literal. Revise fontes ausentes ou ambíguas antes de classificar; nunca infira origem no navegador a partir da explicação.
- Distribua as questões entre todos os subitens relevantes do edital, com variedade de dificuldade, formulação e aplicação, evitando duplicações disfarçadas.
- Prefira questões reais de concursos anteriores obtidas de provas e gabaritos oficiais. Não use como fonte primária bancos pagos, compilações sem proveniência ou gabaritos não verificáveis.
- Só identifique uma questão como oficial quando enunciado, alternativas, prova e gabarito puderem ser verificados. Preserve o sentido original e normalize apenas a formatação necessária ao formato do projeto.
- Quando adaptar uma questão por mudança legislativa, formato incompatível ou necessidade didática, identifique-a explicitamente como adaptada. Nunca atribua questão autoral a uma banca.
- Questões reais desatualizadas devem ser excluídas ou adaptadas de forma explícita para refletir o conteúdo vigente e o recorte do edital.
- Cada explicação deve justificar a alternativa correta, esclarecer os distratores relevantes e terminar com uma destas convenções textuais de proveniência:
- `Fonte: questão oficial; <banca>; <concurso/prova>; <ano>; questão <número>; <URL oficial>.`
- `Fonte: questão adaptada de <banca/prova/ano/número/URL>; adaptação: <motivo>.`
- `Fonte: questão autoral baseada em <referências do conteúdo>.`
- `origin` é metadado editorial de seleção: uma alteração exclusiva de origem preserva IDs, ordem, enunciado, opções, gabarito, explicação, `question.revision` e `questionSetRevision`.
- Preserve IDs permanentes e aplique as regras de `questionSetRevision` e `question.revision` de `final_plan.md` ao alterar conjuntos já publicados.

### Double-check, validação e publicação

- Faça uma segunda conferência separada da redação para comparar edital, fontes, conteúdo completo, cheat sheet e questões.
- Confirme que todo subitem do edital foi ensinado, que cada gabarito é correto, que os distratores não criam ambiguidade e que as respostas estão sustentadas pelo conteúdo.
- Confira quantidade, IDs, revisões, duplicações, ortografia, links, atribuições de questões reais, consistência entre os três arquivos e correspondência única do `order` com a numeração fixa do roadmap.
- Reabra fontes primárias para afirmações de maior risco e use nova pesquisa quando houver dúvida ou divergência; não aprove conteúdo com incerteza factual conhecida.
- Execute `npm run test:unit`, `npm run check` e `npm run build` para toda adição ou alteração de conteúdo.
- Execute `npm run test:e2e` quando o conteúdo introduzir Mermaid ou elementos que exijam revalidar impressão, CSP ou comportamento observado no navegador.
- Submeta a mudança ao fluxo de revisão independente, com atenção especial a cobertura do edital, correção factual, qualidade pedagógica, schemas, revisões e regressões.
- Mantenha o item em revisão enquanto qualquer correção aprovada estiver pendente e repita os gates afetados depois de corrigir.
- Uma solicitação para adicionar conteúdo autoriza os commits e pushes de reserva, publicação e conclusão somente dos arquivos do assunto selecionado, do estado correspondente no roadmap e de arquivos canônicos estritamente necessários, salvo instrução contrária do usuário.
- Antes de cada commit, revise status e diff, não inclua mudanças alheias e nunca inclua credenciais.
- Publique o conteúdo com o item em `[R]`, envie para `origin/main` e confirme CI e deployment automático do Pages.
- Se o push, a CI ou o deployment falhar, não declare a entrega concluída; corrija a falha mantendo `[R]` ou registre o item como `[!] Bloqueado`.
- Depois do deployment bem-sucedido, altere somente o estado aplicável para `[x]`, faça o commit de conclusão e envie-o ao remoto.

## KV, offline e sincronização

- O endpoint aprovado é `https://kv.helio.me`.
- A API é pública, sem autenticação, last-write-wins e usa PUT de documento completo.
- Nunca envie `Authorization`, credenciais ou dados sensíveis.
- Nunca faça PUT parcial nem trate CORS como autorização.
- Valide todo JSON remoto antes de usá-lo.
- Nunca coloque respostas da API KV no Cache Storage do Service Worker.
- IndexedDB é a persistência local para respostas e outbox; `localStorage` não substitui a outbox.
- `src/lib/identity.ts` valida aliases sem normalização; segmentos usam `^[a-z0-9]+(?:-[a-z0-9]+)*$` e os limites do plano.
- IDs de respostas usam `concursos--<alias>--<contestStorageId>--<subjectStorageId>`; preferências usam `concursos--<alias>--preferencias`; progresso usa `concursos--<alias>--progresso`; assuntos estudados usam `concursos--<alias>--estudados`.
- O documento de estudados (`src/lib/studied.ts`, schema versionado `{ schemaVersion: 1, studiedSubjectIds: string[], updatedAt }`) é a marcação EXPLÍCITA de assuntos estudados, separada do `progresso` (visão materializada, que é rematerializada por respostas e apagaria a marcação). É um documento global independente (sem acoplamento a preferences/progress), sincronizado pelo MESMO coordenador: cada `studiedSubjectId` (`<contestStorageId>--<subjectStorageId>`) é um campo sujo mesclado a partir do registro IndexedDB mais recente; a arbitragem remota é por documento completo (last-write-wins por versão, sem CAS); `updatedAt` é informativo e nunca entra em merge/arbitragem.
- Alias, concurso e assunto têm limites respectivos de 32, 20 e 32 caracteres; o ID remoto completo deve ter no máximo 100 caracteres.
- O alias ativo é o único dado de identidade em `localStorage`, na chave `concursos:active-alias`; ele é público e não é conta ou segredo.
- Ativar o primeiro alias ou trocar de alias exige conexão e um preflight completo do alvo: leia e valide preferências, assuntos estudados, todas as respostas enumeradas por `/sync-catalog.json` e progresso antes de qualquer PUT ou alteração do `localStorage`; alias remoto existente exige confirmação explícita.
- O alias ativo deve permanecer inalterado em falha de rede, catálogo, validação, lease, confirmação ou aplicação. Revalide-o após operações assíncronas e imediatamente antes do commit; sincronize pendências do alias atual quando possível e só execute descarte explicitamente autorizado depois de preparar o alvo.
- `src/lib/offline-db.ts` possui stores para respostas, preferências, progresso, estudados, downloads, leases e quarentena. O `OFFLINE_DB_VERSION` é 2; o `upgrade` é aditivo e idempotente (cria apenas stores ausentes), então o bump v1→v2 (que adicionou `estudados`) não recria stores existentes. `hasPendingOutbox` e `discardPendingProfile` incluem `estudados` para a segurança da troca de alias.
- Cada resposta local mantém documento atual, snapshot-base, metadados remotos, IDs sujos, outbox, tentativas, erro e aviso de conflito.
- Escritas locais concorrentes mesclam somente os IDs de questões marcados como sujos com o registro IndexedDB mais recente, preservando respostas gravadas por outras abas.
- Toda seleção e finalização deve concluir a transação IndexedDB antes de anunciar salvamento local; a finalização reconcilia e assina o registro durável mais recente dentro da mesma transação, nunca o snapshot potencialmente obsoleto da aba.
- Trocar de alias nunca reutiliza respostas do perfil anterior; vinculação offline é recusada, e pendências exigem sincronização online ou descarte explícito posterior ao preflight do alvo.
- O backup de perfil usa schema v1 com `schemaVersion`, `exportedAt`, `sourceAlias`, documentos de respostas identificados pelos `contestStorageId` e `subjectStorageId` estáveis, e preferências; não exporta metadados internos de sincronização, progresso, leases, quarentena ou downloads.
- A exportação aguarda escritas locais, inclui apenas assuntos do catálogo atual e reconcilia respostas às revisões e opções atuais das questões.
- A importação exige confirmação explícita, sempre grava no alias ativo e valida estritamente o schema e o catálogo atual; ela sobrepõe atomicamente os assuntos importados, preserva assuntos locais não relacionados, substitui preferências, reconstrói progresso e tenta novamente snapshots de perfil obsoletos até três vezes. Dados importados permanecem pendentes para sincronização.
- `src/lib/kv-client.ts` é o único cliente do KV: usa `fetch`, timeout, limite operacional de corpo e retry limitado para 429, sem `Authorization`.
- `src/lib/sync.ts` coordena uma fila serial limitada a duas requisições por segundo, protegida por lease IndexedDB e acordada entre abas por `BroadcastChannel`; renovar exige um lease existente, não expirado e do mesmo owner, nunca readquire um lease perdido, e qualquer falha interrompe a operação antes de novas leituras, retries ou escritas remotas.
- O catálogo estático `/sync-catalog.json` fornece schemas editoriais ao coordenador; ele não contém identidade nem estado do usuário.
- Todo JSON remoto é validado antes da arbitragem; documento malformado vai para quarentena e nunca substitui estado local válido.
- A arbitragem remota é por documento completo e usa `remoteVersion ?? 0`: a maior versão vence, empate com outbox pendente publica o local e empate limpo é no-op. Não faça merge remoto por questão, campo ou assunto.
- O PUT sempre envia o documento completo mais recente. Uma edição local concluída durante o PUT permanece pendente e não é apagada pela confirmação remota.
- Saltos de versão, regressão e mudança de `created_at` geram aviso; um cliente com catálogo editorial mais antigo recusa reconciliar ou sobrescrever documento local ou remoto com `questionSetRevision` mais nova; não alegue recuperação ou sincronização perfeita.
- Gatilhos atuais: seleção/finalização, inicialização, `online`, foco, visibilidade, Background Sync, retry manual e troca de perfil.
- Background Sync apenas acorda o coordenador em uma janela; nunca deve repetir diretamente um PUT antigo nem contornar IndexedDB, lease, validação e reconciliação.
- Preferências são cacheadas no IndexedDB e sincronizadas como documento global completo pela mesma arbitragem de versão. Somente escritas locais concorrentes mesclam os campos sujos com o registro IndexedDB mais recente.
- Progresso é uma visão materializada das respostas, não sua fonte; no modo `on-submit`, `correct` só existe depois de submissão válida.
- Progresso sincroniza como documento completo pela mesma arbitragem, mas permanece uma visão materializada: após resolver preferências e respostas, rematerialize-o com `answerVersion` e o catálogo vigentes. Revisão divergente aparece como desatualizada, e Configurações oferece recálculo sequencial local.
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
- Neste repositório, essa autorização também permite criar a branch de entrega e o PR sem nova confirmação, pois `main` é protegida. Envie a branch, abra o PR, aguarde todos os checks/CI obrigatórios concluírem com sucesso e só então faça o merge; depois, confirme o deployment aplicável.
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


## Fora de escopo

- Autenticação e autorização.
- Privacidade garantida.
- Backend Astro.
- CMS visual.
- Histórico de tentativas.
- Ranking e comentários.
- Migração automática entre aliases.
- Resolução perfeita de concorrência.

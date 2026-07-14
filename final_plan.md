# Plano Autoritativo do Projeto Concursos

Data de consolidação: 13 de julho de 2026

Status: concluído em 14 de julho de 2026, incluindo implementação, testes integrados, revisão independente, documentação e validação final de produção

Este documento é a fonte de verdade autocontida para implementar o projeto. A execução não deve depender da conversa que originou o plano, de memória externa ou de contexto adicional. Em caso de divergência entre este arquivo e uma suposição feita durante a implementação, este arquivo prevalece, salvo instrução posterior e explícita do usuário.

## 1. Identificação

| Item | Valor |
| --- | --- |
| Nome | `concursos` |
| Repositório | `https://github.com/insign/concursos` |
| Diretório local | `/home/ubuntu/MEGA/WORK/concursos` |
| Branch padrão | `main` |
| Domínio de produção | `https://concursos.helio.me` |
| Hospedagem | Cloudflare Pages |
| Gerenciador de pacotes | npm |
| Framework | Astro estático com TypeScript |
| Interface | Componentes Astro, JavaScript/TypeScript nativo e CSS próprio |
| Idioma principal | Português brasileiro |
| Indexação | Público, mas com `noindex, nofollow` |
| Projeto Cloudflare Pages | `concursos` com Git integration |
| URL Pages | `https://concursos-ebs.pages.dev` |
| Deployment inicial | Commit `338c612` da branch `main` |

### 1.1 Baseline já concluído

Os itens abaixo existem e não devem ser recriados:

- Repositório GitHub público `insign/concursos` com branch padrão `main`.
- Commit âncora inicial do plano `bd4e73d`; execução integral ancorada em `803a1a4`.
- Scaffold Astro 7 estático com npm e TypeScript strict.
- Scripts `dev`, `check`, `build`, `preview` e `astro`.
- `package-lock.json` versionado.
- `site: "https://concursos.helio.me"` e `output: "static"` no Astro.
- `noindex, nofollow` no HTML inicial e em `public/_headers`.
- Projeto Cloudflare Pages `concursos` conectado ao GitHub.
- Produção configurada a partir de `main`, build `npm run build` e saída `dist`.
- Primeiro deployment concluído e acessível em `https://concursos-ebs.pages.dev`.
- Custom domain `https://concursos.helio.me` associado, com TLS e resposta HTTP 200.
- `X-Robots-Tag: noindex, nofollow` verificado tanto no domínio Pages quanto no domínio personalizado.
- `AGENTS.md` inicial criado como guia operacional vivo e ponto de entrada obrigatório para futuros agentes.

O executor deve evoluir esse baseline. Não deve criar outro projeto Pages, trocar o projeto para Direct Upload ou substituir a Git integration existente.

## 2. Objetivo

Construir um portal Git-first para estudo de concursos públicos. Todo conteúdo editorial deve residir em arquivos versionados no Git, e o Astro deve gerar o site completo por CLI.

O catálogo é organizado estritamente em dois níveis:

```text
concurso -> assunto
```

Cada assunto oferece três telas independentes:

1. Conteúdo completo para estudo.
2. Cheat sheet resumido e otimizado para impressão.
3. Questionário interativo com persistência remota e funcionamento offline.

## 3. Resultados obrigatórios

- Gerar todas as páginas de conteúdo e cheat sheet estaticamente.
- Gerar índices de concursos e assuntos automaticamente.
- Validar o catálogo durante o build.
- Permitir fórmulas LaTeX, GFM, código com highlighting e diagramas Mermaid.
- Permitir três formas de exibir questões.
- Persistir respostas, preferências e progresso em `https://kv.helio.me`.
- Funcionar como PWA instalável.
- Permitir leitura e respostas offline.
- Permitir baixar ou remover um concurso completo para uso offline.
- Sincronizar alterações quando a conexão retornar.
- Manter deploy automático no Cloudflare Pages e validar a aplicação final em `concursos.helio.me`.
- Impedir indexação por buscadores sem alegar privacidade.
- Manter o `AGENTS.md` inicial atualizado durante a implementação e fazer uma revisão autoritativa completa ao final.

## 4. Fora de escopo

- Autenticação ou autorização.
- Garantia de privacidade.
- Backend Astro ou renderização sob demanda.
- CMS visual.
- Histórico de tentativas.
- Ranking ou gamificação.
- Comentários.
- Proteção do gabarito enviado ao navegador.
- Migração automática entre IDs de usuário.
- Resolução perfeita de concorrência, indisponível na API adotada.
- Pesquisa textual na primeira versão.
- Compartilhamento de um mesmo conteúdo entre concursos diferentes.

## 5. Stack

### 5.1 Dependências principais

- Astro estável na data da implementação.
- TypeScript em modo estrito.
- `@astrojs/check`.
- `@astrojs/markdown-remark` para o pipeline Unified.
- `remark-math`.
- `rehype-katex`.
- `katex`.
- `astro-mermaid`.
- `mermaid`.
- `vite-plugin-pwa`, integrado diretamente ao Vite do Astro.
- `idb`.
- `wrangler` v4, já instalado como dependência de desenvolvimento para diagnóstico e operações do Pages.
- Módulos Workbox necessários para precache, roteamento, estratégias, expiração e respostas cacheáveis.
- Vitest para testes unitários.
- Playwright para testes de navegador, PWA, impressão e offline.

### 5.2 Restrições

- Não adicionar React, Vue ou Svelte.
- Não adicionar Tailwind por padrão.
- Não adicionar Axios; usar `fetch` nativo.
- Não adicionar biblioteca de estado global.
- Não adicionar dependência quando a plataforma ou o stack atual já resolver o problema.
- Fixar versões no `package-lock.json`.
- Validar compatibilidade entre as versões pinadas do Astro, `vite-plugin-pwa`, `astro-mermaid` e o pipeline Markdown antes de alterar a integração.

## 6. Estrutura esperada

```text
concursos/
├── public/
│   ├── icons/
│   │   ├── pwa-192.png
│   │   ├── pwa-512.png
│   │   ├── pwa-maskable-512.png
│   │   └── apple-touch-icon.png
│   ├── favicon.svg
│   ├── robots.txt
│   └── _headers
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── IdentityForm.astro
│   │   ├── OfflineContestButton.astro
│   │   ├── OfflineStatus.astro
│   │   ├── PwaInstallButton.astro
│   │   ├── Questionnaire.astro
│   │   ├── SubjectNavigation.astro
│   │   └── SyncStatus.astro
│   ├── content/
│   │   ├── concursos/
│   │   │   └── concurso-exemplo.json
│   │   └── assuntos/
│   │       └── concurso-exemplo/
│   │           └── assunto-exemplo/
│   │               ├── conteudo.md
│   │               ├── cheat-sheet.md
│   │               ├── questoes.json
│   │               └── images/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── StudyLayout.astro
│   ├── lib/
│   │   ├── catalog.ts
│   │   ├── identity.ts
│   │   ├── kv-client.ts
│   │   ├── offline-db.ts
│   │   ├── progress.ts
│   │   ├── question-order.ts
│   │   └── sync.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── configuracoes.astro
│   │   ├── offline.astro
│   │   └── concursos/
│   │       └── [concurso]/
│   │           ├── index.astro
│   │           └── [assunto]/
│   │               ├── index.astro
│   │               ├── cheat-sheet.astro
│   │               └── questoes.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── print.css
│   ├── content.config.ts
│   └── service-worker.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── astro.config.mjs
├── final_plan.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── AGENTS.md               # documento vivo, revisado ao final
```

Nomes podem ser ajustados quando a implementação demonstrar uma convenção melhor, mas responsabilidades e invariantes não podem ser enfraquecidos.

## 7. Fontes canônicas do catálogo

Cada dado tem um único proprietário:

| Dado | Fonte canônica |
| --- | --- |
| Slug da rota do concurso | Nome do arquivo em `content/concursos` |
| Título, ordem e `storageId` do concurso | JSON do concurso |
| Associação assunto-concurso | Caminho da pasta do assunto |
| Slug da rota do assunto | Nome da pasta do assunto |
| Título, ordem, descrição e `storageId` do assunto | Front matter de `conteudo.md` |
| Conteúdo completo | Corpo de `conteudo.md` |
| Cheat sheet | Corpo de `cheat-sheet.md` |
| Questões e gabarito | `questoes.json` |

Não duplicar concurso, assunto, título ou IDs em arquivos que possam derivá-los de sua fonte canônica. Toda redundância inevitável deve ser validada no build.

## 8. Content Collections

Definir quatro collections independentes em `src/content.config.ts`:

| Collection | Base | Padrão |
| --- | --- | --- |
| `concursos` | `src/content/concursos` | `**/*.json` |
| `conteudos` | `src/content/assuntos` | `**/conteudo.md` |
| `cheatSheets` | `src/content/assuntos` | `**/cheat-sheet.md` |
| `questoes` | `src/content/assuntos` | `**/questoes.json` |

Usar loaders `glob()` do Astro. É permitido usar a mesma base com padrões diferentes. O loader suporta Markdown e JSON.

As três collections de assunto devem gerar o mesmo ID canônico:

```text
<concurso>/<assunto>
```

O módulo `catalog.ts` deve:

- Relacionar as collections.
- Validar que cada assunto possui os três arquivos obrigatórios.
- Rejeitar arquivos órfãos.
- Rejeitar concursos inexistentes.
- Rejeitar IDs e `storageId` duplicados.
- Ordenar concursos e assuntos.
- Fornecer assunto anterior e seguinte.
- Fornecer dados tipados para `getStaticPaths()`.
- Gerar o inventário offline de cada concurso.

## 9. Contrato do concurso

Exemplo de `src/content/concursos/concurso-exemplo.json`:

```json
{
  "schemaVersion": 1,
  "title": "Concurso Exemplo",
  "description": "Catálogo fictício usado para validar o projeto.",
  "order": 1,
  "storageId": "exemplo"
}
```

Regras:

- `schemaVersion` deve ser um inteiro conhecido.
- `title` e `description` não podem ser vazios.
- `order` deve ser inteiro não negativo.
- `storageId` é imutável depois que existirem dados persistidos.
- `storageId` deve obedecer ao orçamento definido na seção de identidade.

## 10. Contrato do assunto

Exemplo de `conteudo.md`:

```markdown
---
schemaVersion: 1
title: Assunto Exemplo
description: Conteúdo fictício para validar leitura e navegação.
order: 1
storageId: assunto-exemplo
---

# Assunto Exemplo

Conteúdo completo para estudo.
```

O `cheat-sheet.md` contém somente o resumo. Metadados pertencentes ao assunto não devem ser repetidos nele.

Imagens devem permanecer na pasta local do assunto e usar referências relativas compatíveis com o pipeline do Astro.

## 11. Contrato das questões

Exemplo de `questoes.json`:

```json
{
  "schemaVersion": 1,
  "questionSetRevision": 1,
  "questions": [
    {
      "id": "q001",
      "revision": 1,
      "prompt": "Assinale a alternativa correta.",
      "options": [
        { "id": "a", "text": "Alternativa A" },
        { "id": "b", "text": "Alternativa B" }
      ],
      "correctOptionId": "b",
      "explanation": "A alternativa B está correta porque..."
    }
  ]
}
```

Regras:

- A primeira versão suporta somente uma alternativa correta.
- IDs de questões são permanentes e únicos no assunto.
- IDs de opções são permanentes e únicos na questão.
- `correctOptionId` deve referenciar uma opção existente.
- Toda questão deve ter pelo menos duas opções.
- `prompt`, textos de opções e `explanation` não podem ser vazios.
- Posição no array nunca funciona como identidade.
- O schema deve rejeitar propriedades desconhecidas quando isso prevenir erros editoriais.

## 12. Evolução de conteúdo

`schemaVersion` identifica o formato do documento. `questionSetRevision` identifica a revisão editorial do conjunto. `question.revision` identifica a revisão semântica da questão.

Regras editoriais:

- Reordenar questões não altera IDs nem revisões.
- Alterar apenas ortografia da explicação não exige nova revisão da questão.
- Alterar enunciado, opções ou gabarito incrementa `question.revision`.
- Adicionar ou remover questões incrementa `questionSetRevision`.
- Questão removida tem sua resposta ignorada e removida no próximo salvamento.
- Questão cuja revisão mudou invalida sua resposta persistida.
- Questões novas começam sem resposta.
- Qualquer mudança relevante invalida uma submissão anterior.
- Assunto movido para outro concurso é tratado como assunto novo.
- Título e slug de rota podem mudar sem alterar o `storageId`.
- `storageId` nunca deve mudar silenciosamente.

## 13. Rotas

| Rota | Função |
| --- | --- |
| `/` | Índice de concursos |
| `/concursos/<concurso>/` | Índice dos assuntos |
| `/concursos/<concurso>/<assunto>/` | Conteúdo completo |
| `/concursos/<concurso>/<assunto>/cheat-sheet/` | Cheat sheet |
| `/concursos/<concurso>/<assunto>/questoes/` | Questionário |
| `/configuracoes/` | Perfil, preferências, backup e sincronização |
| `/offline/` | Fallback de navegação offline |

As três telas do assunto devem parecer abas, mas ser links reais. A aba atual usa `aria-current="page"`.

## 14. Interface

Direção visual: acadêmica e editorial.

Requisitos:

- Tipografia adequada para leitura longa.
- Largura de linha controlada.
- Hierarquia clara de títulos.
- Poucos elementos de dashboard.
- Responsividade real em celular e desktop.
- Contraste adequado.
- Foco visível.
- Navegação completa por teclado.
- Controles nativos sempre que possível.
- Estados visíveis de carregamento, salvamento, offline, sincronização e erro.
- Sem dependência de JavaScript para ler conteúdo ou cheat sheets.

## 15. Comportamento do questionário

O usuário escolhe entre:

- Uma questão por vez.
- Blocos de dez.
- Todas as questões.

Esses modos são somente apresentações do mesmo conjunto. A submissão sempre representa o assunto completo.

No modo `immediate`:

- Mostrar acerto, erro e explicação após selecionar.
- Permitir alteração posterior.
- Atualizar a resposta persistida.

No modo `on-submit`:

- Não revelar gabarito antes da finalização.
- Finalizar o assunto completo.
- Mostrar pontuação e explicações depois.
- Invalidar a submissão ao alterar qualquer resposta.

No modo `all`, renderizar as questões progressivamente em blocos para evitar uma árvore DOM excessiva.

O embaralhamento deve ser determinístico, derivado de usuário, concurso, assunto e revisão do conjunto. Ele deve manter a mesma ordem entre dispositivos até a revisão mudar.

## 16. Representação da submissão

Não usar apenas um booleano `submitted`. Armazenar uma assinatura:

```json
{
  "submission": {
    "questionSetRevision": 1,
    "answersHash": "hash-deterministico"
  }
}
```

A submissão é válida somente quando:

- A revisão do conjunto corresponde.
- O hash corresponde às respostas atuais.
- Nenhuma resposta usada no hash possui revisão obsoleta.

## 17. API KV

Endpoint único:

```text
https://kv.helio.me
```

Contrato:

| Método | Caminho | Uso |
| --- | --- | --- |
| `GET` | `/:id` | Ler valor e metadados |
| `GET` | `/:id/version` | Ler somente a versão |
| `PUT` | `/:id` | Criar ou substituir o JSON completo |
| `DELETE` | `/:id` | Excluir permanentemente |

Fatos obrigatórios:

- IDs aceitos pela API seguem `^[A-Za-z0-9_-]{1,100}$`.
- O aplicativo usa uma gramática mais restrita.
- Não há autenticação ou autorização.
- CORS não é controle de acesso.
- Qualquer pessoa que descubra um ID pode ler, sobrescrever ou apagar o valor.
- `PUT` substitui o valor completo; nunca faz merge.
- Cada `PUT` incrementa a versão, mesmo sem mudança de conteúdo.
- Não há PATCH, lista, busca, TTL, histórico, rollback, ETag, `If-Match` ou compare-and-set.
- Escritas concorrentes são last-write-wins.
- Limite exato do corpo: 1.900.000 bytes UTF-8.
- Rate limit: 30 requisições por IP a cada 10 segundos.
- Respostas usam `Cache-Control: no-store`.
- `404` em leitura significa valor ausente.
- `429` exige backoff limitado e jitter.
- Não enviar `Authorization`.
- Não solicitar ou armazenar credenciais da Cloudflare.
- Não armazenar dados sensíveis.
- O aplicativo não deve usar `DELETE` para resetar respostas; deve escrever um documento vazio válido.

## 18. Identidade e IDs remotos

O usuário fornece um alias público. O alias não é conta, segredo ou fronteira de segurança.

Gramática dos segmentos:

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Não normalizar silenciosamente. Rejeitar e explicar entradas inválidas.

Limites:

| Segmento | Máximo |
| --- | ---: |
| Usuário | 32 caracteres |
| Concurso | 20 caracteres |
| Assunto | 32 caracteres |
| ID final | 100 caracteres |

Formato de resposta:

```text
concursos--<usuario>--<concurso>--<assunto>
```

Exemplo:

```text
concursos--marcos--tse--portugues
```

Documentos globais:

```text
concursos--marcos--preferencias
concursos--marcos--progresso
```

O separador duplo evita colisões entre os componentes.

A interface deve recomendar um alias menos previsível que apenas um nome e exibir aviso claro sobre o caráter público dos dados.

## 19. Troca de usuário

Trocar o alias significa trocar de perfil, não renomear dados.

- Particionar todo IndexedDB pelo ID resolvido.
- Nunca reutilizar respostas de um perfil no namespace de outro.
- Se houver pendências e internet, sincronizar antes da troca.
- Se estiver offline, exigir que o usuário cancele a troca ou descarte explicitamente as pendências.
- Não migrar dados remotos automaticamente.
- Manter exportação como alternativa explícita.

## 20. Documento remoto de respostas

```json
{
  "schemaVersion": 1,
  "questionSetRevision": 1,
  "answers": {
    "q001": {
      "optionId": "b",
      "questionRevision": 1
    }
  },
  "submission": null
}
```

O valor remoto contém somente estado necessário ao compartilhamento. Snapshot-base, IDs sujos, leases, tentativas e erros pertencem somente ao IndexedDB.

## 21. Preferências globais

```json
{
  "schemaVersion": 1,
  "questionLayout": "single",
  "correctionMode": "on-submit",
  "shuffleQuestions": false
}
```

Valores de `questionLayout`:

- `single`
- `ten`
- `all`

Valores de `correctionMode`:

- `immediate`
- `on-submit`

Preferências devem ser cacheadas no IndexedDB para funcionamento offline. Mesclar por campo. Se o mesmo campo mudar local e remotamente, o remoto observado prevalece.

## 22. Progresso sincronizado

O progresso é uma visão materializada, não a fonte de verdade.

```json
{
  "schemaVersion": 1,
  "subjects": {
    "tse--portugues": {
      "answered": 30,
      "total": 50,
      "correct": 24,
      "submitted": true,
      "questionSetRevision": 1,
      "answerVersion": 8
    }
  }
}
```

Regras:

- Documentos de respostas são a fonte de verdade.
- Atualizar progresso somente depois de persistir ou reconciliar respostas.
- Falha no progresso não invalida respostas.
- Reconciliar o assunto ao abri-lo.
- Marcar progresso como desatualizado quando a revisão do catálogo divergir.
- No modo `on-submit`, não publicar `correct` antes de uma submissão válida.
- Mesclar por assunto e preferir a maior versão conhecida do documento de resposta.
- Oferecer em configurações uma ação para recalcular progresso sequencialmente a partir do catálogo, respeitando o rate limit.

## 23. IndexedDB

Persistir localmente:

- Estado atual de respostas.
- Snapshot-base da última sincronização.
- Versão remota conhecida.
- `created_at` remoto conhecido.
- IDs de questões alterados localmente.
- Estado da outbox.
- Estado de erro ou conflito.
- Cache local de preferências e progresso.
- Concursos explicitamente baixados.
- Hash do inventário baixado.
- Lease do coordenador de sincronização.

`localStorage` deve guardar somente o alias atual e dados triviais de bootstrap. Não usar `localStorage` como outbox.

Toda seleção deve ser durável no IndexedDB antes de a interface afirmar que foi salva localmente.

## 24. Validação de dados remotos

Tratar todo JSON remoto como entrada não confiável.

- Validar com schemas em runtime.
- Rejeitar opções inexistentes.
- Rejeitar IDs inválidos.
- Rejeitar tipos incorretos.
- Colocar schema desconhecido ou documento malformado em quarentena.
- Nunca sobrescrever automaticamente um estado local válido com documento remoto inválido.
- Tratar mudança de `created_at` ou regressão de versão como possível exclusão e recriação.
- Exibir erro recuperável ao usuário.

## 25. Sincronização

### 25.1 Autoridade única

Implementar um coordenador único entre páginas, abas e Service Worker:

- Lease persistido no IndexedDB.
- Comunicação entre abas.
- Fila serial.
- Background Sync apenas acorda o coordenador.
- Nunca repetir diretamente um `PUT` antigo guardado como Request.
- Operações do mesmo documento são coalescidas para o último snapshot.

### 25.2 Fluxo de respostas

1. Persistir alteração no IndexedDB.
2. Marcar IDs alterados.
3. Se online, obter o documento remoto completo.
4. Validar o remoto.
5. Comparar remoto, snapshot-base e local.
6. Mesclar por ID de questão.
7. Recalcular validade da submissão.
8. Enviar o documento completo por `PUT`.
9. Atualizar snapshot-base e versão.
10. Atualizar o progresso materializado.

### 25.3 Merge por questão

- Local não mudou e remoto mudou: usar remoto.
- Remoto não mudou e local mudou: usar local.
- Ambos resultam no mesmo valor: usar o valor comum.
- Ambos mudaram de modo diferente: usar remoto.
- Questão inexistente no catálogo atual: remover.
- Revisão incompatível: invalidar a resposta.

“Remoto vence” significa o último remoto observado antes do `PUT`. A API não consegue garantir remote-wins absoluto.

Se o `PUT` retornar versão superior à versão lida mais um, houve escrita concorrente na janela GET-PUT. Exibir aviso. Não alegar recuperação, pois a API não mantém histórico.

### 25.4 Ausência e recriação

- `404` sem base anterior: criar a partir do local.
- `404` com alteração local pendente: recriar a partir do local.
- O aplicativo não usa exclusão remota como reset.
- Registro recriado com remoto válido volta a participar do merge normal.

### 25.5 Gatilhos

- Alteração enquanto online.
- Inicialização.
- Evento `online`.
- Retorno ao foco ou visibilidade.
- Background Sync, quando suportado.
- Botão manual de nova tentativa.

Background Sync é melhoria progressiva. O funcionamento não pode depender de suporte nativo a ele.

## 26. Rate limit e tamanho

- Limitar a fila a no máximo duas requisições por segundo.
- Serializar alterações de um mesmo documento.
- Em `429`, respeitar `Retry-After` quando presente.
- Sem `Retry-After`, aguardar aproximadamente 10 segundos com jitter.
- Limitar retries e preservar pendência para tentativa posterior.
- Medir corpo com `TextEncoder` antes do `PUT`.
- Impedir envio próximo do limite; usar margem operacional abaixo de 1.900.000 bytes.
- Não consultar todos os documentos de resposta em cada carregamento de índice.

## 27. PWA

Usar `vite-plugin-pwa` diretamente na configuração Vite do Astro, com Workbox `injectManifest` e Service Worker customizado.

### 27.1 Manifest

Definir:

- `id` estável.
- `name` e `short_name`.
- `start_url: "/"`.
- `scope: "/"`.
- `display: "standalone"`.
- `theme_color`.
- `background_color`.
- Ícones de 192 e 512 pixels.
- Ícone maskable.
- Apple touch icon.

### 27.2 Estratégias

| Recurso | Estratégia |
| --- | --- |
| Shell e assets críticos | Precache pequeno |
| Assets hashados | CacheFirst |
| KaTeX e fontes locais | Precache |
| Runtime Mermaid local | Precache ou CacheFirst |
| Navegação HTML visitada | NetworkFirst com fallback |
| Imagens públicas | CacheFirst com expiração controlada |
| API `kv.helio.me` | NetworkOnly, nunca Cache Storage |
| Conteúdo ausente | `/offline/` |

Normalizar URLs limpas e testar com e sem barra final.

### 27.3 Caches

Separar:

```text
precache compartilhado
runtime de páginas visitadas
runtime de mídia
contest--<storageId>--<manifestHash>
```

Assets compartilhados não devem ser duplicados nos pacotes de concurso.

### 27.4 Download de concurso

Gerar no build um inventário versionado por concurso contendo:

- Rotas de conteúdo.
- Rotas de cheat sheet.
- Rotas de questões.
- Imagens locais.
- Assets específicos não compartilhados.

Fluxo:

1. Estimar tamanho quando possível.
2. Solicitar armazenamento persistente quando suportado.
3. Baixar para cache temporário.
4. Exibir progresso.
5. Validar todos os recursos.
6. Ativar o cache novo atomicamente.
7. Apagar o antigo somente depois do sucesso.
8. Preservar a versão antiga em falha, interrupção ou falta de quota.

Ao concluir download explícito, remover duplicatas equivalentes do cache de páginas visitadas quando seguro. Remover um concurso elimina apenas seu pacote explícito; páginas podem voltar ao cache ao serem visitadas online.

### 27.5 Atualizações automáticas seguras

O usuário escolheu atualização automática, mas não usar reload cego com estado volátil.

Implementar atualização controlada:

1. Detectar nova versão.
2. Aguardar transações locais do IndexedDB.
3. Confirmar que a seleção atual está durável.
4. Ativar automaticamente o novo Service Worker.
5. Recarregar sem solicitar confirmação.
6. Preservar a outbox para sincronização posterior.
7. Não apagar um pacote de concurso completo até seu substituto terminar.

## 28. Markdown e conteúdo técnico

O suporte é obrigatório desde a primeira versão.

### 28.1 Recursos

- Tabelas GFM.
- Task lists.
- Tachado.
- Links automáticos.
- Shiki para highlighting.
- Fórmulas inline e em bloco.
- Diagramas Mermaid.

### 28.2 Matemática

Usar `remark-math` e `rehype-katex` no pipeline Unified. Renderizar no build. Empacotar CSS e fontes KaTeX localmente. Não depender de CDN.

### 28.3 Mermaid

- Renderizar no navegador.
- Manter `securityLevel: "strict"`.
- Não aceitar configuração permissiva no Markdown.
- Carregar somente em páginas com diagramas.
- Empacotar localmente para funcionar offline.
- Preservar fallback textual quando a renderização falhar.

### 28.4 Impressão e Mermaid

Expor uma Promise de renderização. Cada container deve marcar sucesso ou erro. O botão de impressão deve esperar todos os diagramas terminarem antes de chamar `window.print()`.

Testar impressão com vários diagramas, fórmulas, tabelas e blocos de código.

## 29. CSS e impressão

Usar CSS próprio.

`global.css` deve conter:

- Tokens de cor e espaçamento.
- Tipografia.
- Largura de leitura.
- Layout responsivo.
- Formulários.
- Questões.
- Estados de sincronização.
- Foco e acessibilidade.

`print.css` deve:

- Esconder cabeçalho, navegação, abas e controles.
- Preservar o cheat sheet.
- Ajustar margens com `@page`.
- Evitar quebra interna de figuras, tabelas, fórmulas e código quando possível.
- Garantir SVG responsivo.
- Evitar overflow de fórmulas e tabelas.
- Preservar contraste em preto e branco.

## 30. Acessibilidade

- Usar links reais nas abas.
- Usar `aria-current`.
- Usar `fieldset` e `legend` nas questões.
- Usar radio buttons nativos.
- Associar labels.
- Garantir navegação por teclado.
- Garantir foco visível.
- Anunciar estados de salvamento com `aria-live` sem excesso.
- Não depender apenas de cor.
- Permitir zoom.
- Testar os três layouts de questões.
- Testar impressão e modo standalone.

## 31. Backup local

Como a API é pública e não oferece histórico, incluir em configurações:

- Exportação JSON do perfil local.
- Importação com validação de schema.
- Aviso antes de colocar dados importados na fila de sincronização.
- Nenhuma importação deve mudar o alias ativo silenciosamente.

## 32. Segurança e privacidade

- O site é público.
- O repositório é público.
- O alias KV é público e adivinhável.
- `noindex` não é privacidade.
- Não armazenar segredos, tokens, dados pessoais sensíveis ou credenciais.
- Não colocar chaves administrativas no frontend.
- Não cachear KV no Service Worker.
- Validar todo dado remoto.
- Manter Mermaid em modo estrito.
- Configurar CSP compatível com Astro, KaTeX e Mermaid.
- CSP deve incluir `connect-src 'self' https://kv.helio.me`.
- Evitar `unsafe-eval`.
- Minimizar scripts inline ou usar a estratégia de CSP adequada ao build real.

## 33. Noindex

Todas as páginas devem incluir:

```html
<meta name="robots" content="noindex, nofollow">
```

O Cloudflare Pages deve responder:

```text
X-Robots-Tag: noindex, nofollow
```

Aplicar também a 404, página offline e previews quando possível.

Não bloquear crawling com `robots.txt` de modo que o crawler deixe de observar o cabeçalho/meta `noindex`. O `robots.txt` pode permitir crawling enquanto a diretiva `noindex` impede inclusão no índice.

## 34. Cloudflare Pages

- O projeto Pages `concursos` já existe na conta Cloudflare Hélio.
- O projeto já possui Git integration com `https://github.com/insign/concursos`.
- A branch de produção já é `main`.
- O build já usa `npm run build` e publica `dist`.
- A URL atribuída é `https://concursos-ebs.pages.dev`.
- O custom domain `https://concursos.helio.me` já está associado e ativo.
- O deployment inicial do commit `338c612` respondeu HTTP 200.
- Não recriar o projeto via `wrangler pages project create`, pois isso criaria um projeto Direct Upload sem possibilidade posterior de adicionar Git integration.
- Astro usa `output: "static"`.
- Build: `npm run build`.
- Saída: `dist`.
- Não adicionar adapter Cloudflare para o site estático.
- Configurar `site: "https://concursos.helio.me"`.
- Manifest e Service Worker devem ser revalidáveis.
- HTML deve ser revalidável.
- Assets hashados podem usar cache longo e `immutable`.
- `_headers` deve aplicar `X-Robots-Tag` e CSP.
- Previews do Pages foram usados para validar PWA, Service Worker, CSP e caches durante a implementação.
- A validação final confirmou conteúdo, TLS, headers, manifest, Service Worker e comportamento offline no domínio real.
- A zona `helio.me` mantém uma Cache Rule restrita a `/service-worker.js` com Browser TTL em `respect_origin`, necessária para preservar o `max-age=0` definido pela origem apesar do Browser Cache TTL global da zona.
- Preservar a Git integration e o deployment automático; Wrangler pode ser usado para leitura e diagnóstico, não para converter o projeto em Direct Upload.

## 35. Página offline

A página `/offline/` deve:

- Explicar que o conteúdo solicitado não foi baixado.
- Listar concursos conhecidos como disponíveis offline quando possível.
- Oferecer retorno à página inicial.
- Mostrar estado da conexão.
- Não parecer uma falha genérica de servidor.

## 36. Conteúdo inicial

Criar um concurso e um assunto fictícios que exercitem:

- Conteúdo longo.
- Cheat sheet.
- Tabela GFM.
- Task list.
- Bloco de código.
- Fórmula KaTeX inline.
- Fórmula KaTeX em bloco.
- Diagrama Mermaid.
- Várias questões.
- Gabarito e explicações.
- Três layouts de questões.
- Modo imediato e modo ao final.
- Embaralhamento.
- Impressão.
- Download offline.
- Sincronização simulada nos testes.

Não usar um namespace real da API em testes automatizados.

## 37. Scripts esperados

Definir no mínimo:

```text
npm run dev
npm run check
npm run test
npm run test:unit
npm run test:e2e
npm run build
npm run preview
```

Adicionar script de geração de ícones PWA se a ferramenta escolhida exigir.

## 38. Testes

### 38.1 Unitários

- Construção e validação de IDs.
- Limites de comprimento.
- Hash de submissão.
- Embaralhamento determinístico.
- Cálculo de pontuação.
- Reconciliação de revisões.
- Merge por questão.
- Remote-wins na mesma questão.
- Preferências por campo.
- Progresso materializado.
- Validação de JSON remoto.
- `404`, `429`, timeout e erro HTTP.
- Fila, lease e coalescing.

### 38.2 Conteúdo e build

- Assunto completo gera três rotas.
- Arquivo ausente falha no build.
- ID duplicado falha.
- `storageId` duplicado falha.
- Gabarito inválido falha.
- Revisão inválida falha.
- Imagem inválida falha quando detectável.
- Build gera `dist`.

### 38.3 Navegador e PWA

- Primeira visita online.
- Reabertura offline.
- Página visitada e não visitada.
- Download e remoção de concurso.
- Download interrompido.
- Falta de quota.
- Atualização automática com resposta pendente.
- KaTeX offline.
- Mermaid offline.
- Impressão após Mermaid.
- Background Sync disponível e indisponível.
- Fechar e reabrir com outbox.
- Troca de usuário com pendências.
- Duas abas.
- Dois dispositivos simulados.
- Escritas concorrentes.
- Confirmação de que KV não aparece no Cache Storage.
- Chrome/Chromium, Firefox e Safari/iOS quando o ambiente permitir.

### 38.4 API

Testes automatizados devem mockar HTTP. Nunca testar com ID de produção desconhecido ou inventado. Teste real exige namespace fornecido explicitamente pelo usuário.

## 39. Fases de implementação

| Fase | Entrega | Gate |
| --- | --- | --- |
| 1 | Pipeline Markdown, KaTeX e Mermaid | Build e página de demonstração |
| 2 | Content Collections, schemas e catálogo | Fixtures válidas e inválidas |
| 3 | Rotas, layouts, CSS e impressão | Navegação, responsividade e print |
| 4 | Questionário e três layouts | Unitários e acessibilidade |
| 5 | Identidade, IndexedDB e documentos | Persistência local testada |
| 6 | Cliente KV e sincronização | HTTP mockado e conflitos |
| 7 | Preferências e progresso | Reparo e estado desatualizado |
| 8 | PWA e download de concurso | Testes offline e de quota |
| 9 | Segurança, CSP, headers e noindex | Verificação no preview existente |
| 10 | Backup, UX de erro e acabamento | Fluxos completos |
| 11 | Testes finais e produção | Preview, deployment automático e domínio existente |
| 12 | Revisão autoritativa do `AGENTS.md` | Documento conferido contra o código real |

Não avançar uma fase com gate quebrado. Corrigir antes de seguir.

Estado da execução ancorada em `803a1a4`: todas as 13 steps foram concluídas. A suíte integrada e a revisão independente passaram, a documentação foi reconciliada, `main` foi publicada pela Git integration e a aplicação, o TLS, os headers, o manifest, o Service Worker e as políticas de cache foram validados no domínio real.

## 40. Manutenção contínua e revisão final de AGENTS.md

O `AGENTS.md` inicial já existe na raiz e deve orientar automaticamente todo futuro agente. Ele é um documento vivo: sempre que uma mudança alterar comandos, estrutura, arquitetura, fontes canônicas, schemas, persistência, sincronização, PWA, testes, deploy, segurança ou escopo, o `AGENTS.md` deve ser atualizado na mesma mudança.

Ao concluir cada fase deste plano, comparar a implementação real com o `AGENTS.md`, atualizar instruções que mudaram, remover regras superadas e registrar novas invariantes que futuros agentes precisam preservar. Mudanças puramente locais que não orientem trabalho futuro não exigem atualização.

Na última fase, fazer uma revisão integral para que o documento reflita a realidade final, não este plano de forma cega.

O `AGENTS.md` deve documentar:

- Propósito e domínio do projeto.
- Stack e versões relevantes.
- Estrutura real de diretórios.
- Comandos reais do `package.json`.
- Fontes canônicas do conteúdo.
- Schemas e regras de revisão.
- Formato dos IDs KV.
- Contratos de respostas, preferências e progresso.
- Invariantes de sincronização.
- Limitações e segurança do KV público.
- Regras de IndexedDB e PWA.
- Estratégias de cache.
- Regras de atualização automática.
- Requisitos de acessibilidade e impressão.
- Regras de CSP e `noindex`.
- Verificações exigidas por tipo de alteração.
- Processo real de build e deploy.
- Fora de escopo.

Regras que o `AGENTS.md` deve impor:

- Não adicionar frameworks de UI sem aprovação explícita.
- Não duplicar metadados canônicos.
- Não alterar `storageId` de conteúdo publicado silenciosamente.
- Não usar posição como ID.
- Não enviar PUT parcial ao KV.
- Não cachear respostas KV no Service Worker.
- Não confiar em JSON remoto sem validação.
- Não inserir segredos no frontend.
- Não alegar privacidade baseada em alias ou `noindex`.
- Não declarar sincronização perfeita.
- Executar testes proporcionais à alteração.
- Não modificar infraestrutura sem solicitação explícita.

Antes de concluir cada fase, verificar se a mudança exige atualização do `AGENTS.md`. Antes de concluir o projeto, verificar que todos os caminhos, comandos e invariantes citados nele existem e estão corretos.

## 41. Riscos aceitos

- Qualquer pessoa pode descobrir e modificar IDs públicos.
- A API pode perder uma escrita concorrente na janela GET-PUT.
- O progresso global pode ficar temporariamente desatualizado.
- Background Sync varia por navegador.
- Browsers podem remover caches sob pressão de armazenamento.
- Mermaid client-side depende de JavaScript antes da impressão.
- `noindex` é orientação a crawler, não acesso restrito.

Esses riscos devem ser mitigados e comunicados, não ocultados.

## 42. Critérios de conclusão

O projeto está concluído somente quando:

- Repositório possui implementação reproduzível por `npm install` e scripts documentados.
- Root lista concursos.
- Concurso lista assuntos.
- Cada assunto gera três rotas.
- Conteúdo e cheat sheet funcionam sem JavaScript.
- Markdown técnico funciona.
- Impressão do cheat sheet funciona com KaTeX e Mermaid.
- Questionário suporta os três layouts.
- Preferências sincronizam.
- Respostas persistem online e offline.
- Conflitos seguem as regras documentadas.
- Progresso aparece e pode ser reparado.
- Troca de usuário não mistura namespaces.
- PWA instala, atualiza e navega offline.
- Concurso pode ser baixado e removido.
- API KV nunca entra no Cache Storage.
- Build e testes passam.
- O deployment automático do Cloudflare Pages publica o `dist` final a partir de `main`.
- `concursos.helio.me` responde corretamente com a aplicação final.
- Headers `noindex` e CSP estão presentes.
- Nenhum segredo está no bundle ou repositório.
- `AGENTS.md` foi mantido durante as fases e sua revisão final corresponde ao projeto real.

## 43. Instruções para o futuro executor

1. Leia este arquivo integralmente antes de alterar o projeto.
2. Leia as regras `AGENTS.md` herdadas do ambiente.
3. Confirme o estado do Git e recupere o plano ativo a partir do commit âncora `803a1a4` antes de continuar.
4. Não recrie o scaffold, o projeto Cloudflare Pages, a Git integration ou o custom domain já existentes.
5. Preserve este arquivo como referência autoritativa durante a implementação.
6. Implemente por fases e valide o gate de cada uma.
7. Use documentação atual para Astro, Vite PWA, Workbox, Mermaid e KaTeX.
8. Use previews do projeto Pages existente durante a implementação.
9. Não invente namespaces para testes reais da API.
10. Não reduza silenciosamente requisitos de offline, sincronização ou validação.
11. Se uma restrição técnica impossibilitar uma decisão deste plano, pare, apresente evidências e peça decisão ao usuário.
12. Atualize `AGENTS.md` na mesma mudança sempre que comandos, arquitetura, estrutura, integrações, testes, deploy ou invariantes relevantes mudarem.
13. Faça uma revisão integral do `AGENTS.md` na última fase.
14. Não considere a entrega concluída enquanto a definição de pronto não for atendida.

## 44. Referências técnicas

- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/
- Astro Markdown: https://docs.astro.build/en/guides/markdown-content/
- Astro Routing: https://docs.astro.build/en/guides/routing/
- Astro client-side scripts: https://docs.astro.build/en/guides/client-side-scripts/
- Astro Cloudflare deployment: https://docs.astro.build/en/guides/deploy/cloudflare/
- Vite PWA para Astro: https://vite-pwa-org.netlify.app/frameworks/astro
- Vite PWA e Workbox: https://vite-pwa-org.netlify.app/workbox/
- MDN PWA caching: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
- Workbox Background Sync: https://developer.chrome.com/docs/workbox/modules/workbox-background-sync
- Mermaid: https://mermaid.js.org/
- Remark Math: https://github.com/remarkjs/remark-math
- KV Guide local: `/home/ubuntu/MEGA/CONFIG/opencode/skill/kv-guide/SKILL.md`

Fim do plano autoritativo.

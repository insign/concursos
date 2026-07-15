# Plano autoritativo — agrupamentos editoriais obrigatórios com URLs curtas

## Status

**Ready.** A arquitetura, os contratos de dados, a migração inicial, as validações e os testes estão definidos. Não há decisão externa pendente para implementar este plano.

## Problema

O catálogo editorial representa hoje apenas a hierarquia `concurso -> assunto`. Os loaders das Content Collections já encontram arquivos em subdiretórios por usarem padrões `**/...`, porém `src/lib/content-paths.ts` rejeita qualquer ID de assunto que não tenha exatamente dois segmentos, e `src/lib/catalog-core.ts` produz somente uma lista plana por concurso.

O roadmap do TCE/MA já possui agrupamentos naturais — por exemplo, `Conhecimentos gerais -> Língua Portuguesa -> Assunto 001` — mas a árvore de arquivos e a interface não conseguem expressá-los sem incorporar o agrupamento à URL. Incorporar toda a árvore editorial à rota quebraria URLs publicadas, inventários offline, links e expectativas de persistência.

## Objetivo

Implemente agrupamentos editoriais de profundidade arbitrária entre o concurso e o assunto, mantendo simultaneamente estes resultados verificáveis:

1. A árvore-fonte exige `src/content/assuntos/<concurso>/<grupo-1>[/<grupo-n>...]/<assunto>/`: todo assunto possui ao menos um grupo, e a profundidade máxima permanece arbitrária.
2. Cada diretório de grupo possui um `grupo.json` validado por schema estrito e pode conter outros grupos e/ou assuntos.
3. A página do concurso apresenta a hierarquia completa; os breadcrumbs de estudo mostram os grupos apenas como texto contextual.
4. A URL pública continua sendo `/concursos/<concurso>/<assunto>/`, com as rotas filhas `/cheat-sheet/` e `/questoes/`, independentemente da profundidade editorial.
5. Identidade persistida, sincronização, backup, progresso e pacotes offline continuam baseados exclusivamente em `contestStorageId` e `subjectStorageId`.
6. O Assunto 001 do TCE/MA é migrado para `Conhecimentos gerais -> Língua Portuguesa` sem mudar conteúdo, slug público, `storageId`, revisões ou URL.
7. O concurso de exemplo é migrado para um grupo obrigatório e valida o caso mínimo de exatamente um grupo; o TCE/MA valida dois níveis.

## Contexto e restrições

- Repositório: `https://github.com/insign/concursos`, branch padrão `main`.
- Stack: Astro 7 estático, Node.js 22.12.0 ou superior, npm, TypeScript strict e Zod 4.
- O projeto deve continuar totalmente estático e sem adapter Cloudflare, backend, autenticação ou CMS.
- `src/content.config.ts` define atualmente quatro collections: `concursos`, `conteudos`, `cheatSheets` e `questoes`.
- Os três loaders de assunto usam `base: './src/content/assuntos'` e padrões recursivos. O bloqueio atual é o contrato local de IDs, não a capacidade de descoberta do loader.
- `src/lib/content-paths.ts` exige hoje exatamente `<concurso>/<assunto>` em `parseSubjectId()`.
- `src/lib/catalog-core.ts` valida a correspondência entre conteúdo, cheat sheet e questões pelo ID interno e mantém `contest.subjects` plano.
- `src/lib/catalog.ts` hidrata as entradas Astro pelo ID interno e `getSubjectStaticPaths()` gera somente os parâmetros públicos `{ concurso, assunto }`.
- `src/pages/sync-catalog.json.ts` publica apenas `contestStorageId`, `subjectStorageId` e `questionSet`; grupos não devem aparecer nesse contrato.
- `createOfflineInventory()` deriva rotas da lista plana de assuntos e dos slugs públicos; essa propriedade deve ser preservada.
- O Assunto 001 publicado está em `src/content/assuntos/tce-ma-2026-analista-administracao/leitura-interpretacao-tipos-generos/`, com `storageId: leitura-tipos-generos` e `questionSetRevision: 1`.
- A URL publicada do Assunto 001 é `/concursos/tce-ma-2026-analista-administracao/leitura-interpretacao-tipos-generos/`.
- O concurso de exemplo está inicialmente em `src/content/assuntos/concurso-exemplo/assunto-exemplo/` e deve ser migrado para `src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/`, sem alterar sua URL pública.
- `ROADMAP.md` mantém a sequência fixa Assuntos 001 a 084. Esta mudança não divide, cria, remove nem renumera assuntos.
- Não adicione dependências. Use os recursos já suportados pelo Astro instalado.
- A documentação oficial do Astro confirma que o loader `glob()` aceita padrões `**` e `generateId({ entry })`, e que `<Astro.self>` é o mecanismo oficial para componentes recursivos:
  - `https://docs.astro.build/en/guides/content-collections/`
  - `https://docs.astro.build/en/reference/content-loader-reference/`
  - `https://docs.astro.build/en/reference/astro-syntax/#astroself`
- Preserve todas as invariantes de segurança, PWA, IndexedDB, KV, Markdown, CSP, headers e deploy descritas em `AGENTS.md`.
- Não altere mudanças alheias no worktree. Não faça push ou deploy sem autorização específica da sessão de implementação.

## Decisões resolvidas

1. **Use a hierarquia `concurso -> um ou mais grupos -> assunto`.** Assuntos diretamente abaixo do concurso são inválidos; a implementação aceita qualquer profundidade a partir de um grupo.
2. **Mantenha os grupos fora das URLs públicas.** O slug público do assunto é sempre o último segmento do caminho-fonte; os grupos existem somente para organização editorial e apresentação.
3. **Mantenha o ID interno completo.** Os IDs das collections de assunto incluem concurso, todos os grupos e o assunto, por exemplo `tce-ma-2026-analista-administracao/conhecimentos-gerais/lingua-portuguesa/leitura-interpretacao-tipos-generos`.
4. **Exija unicidade do slug público do assunto dentro de cada concurso.** Dois assuntos no mesmo concurso não podem terminar com o mesmo slug, mesmo quando estão em grupos diferentes, porque gerariam a mesma rota.
5. **Represente cada grupo explicitamente por `grupo.json`.** Não derive título ou ordem do nome do diretório e não duplique metadados de grupo nos frontmatters dos assuntos.
6. **Use um schema de grupo sem identidade persistida.** O grupo contém `schemaVersion`, `title`, `order` e `description` opcional; não contém `storageId`, slug público separado ou revisão.
7. **Exija toda a cadeia de descritores.** Cada prefixo de grupo usado por um assunto ou subgrupo precisa possuir seu próprio `grupo.json`; grupos implícitos são inválidos.
8. **Rejeite grupos vazios.** Todo grupo deve possuir ao menos um assunto descendente, direto ou aninhado. Isso impede headings editoriais órfãos na interface.
9. **Mantenha duas projeções do catálogo.** `contest.subjects` continua sendo a lista plana global usada por rotas, navegação anterior/próximo, sync e offline; `contest.children` passa a ser a árvore editorial usada pela página do concurso.
10. **Ordene a lista plana por `subject.order`, título e ID.** Essa ordem continua definindo anterior/próximo entre todos os assuntos do concurso, atravessando grupos.
11. **Ordene cada conjunto de filhos da árvore por `order`, título e ID.** Grupos e assuntos participam da mesma ordenação entre irmãos; o desempate mantém o build determinístico.
12. **Não crie páginas para grupos.** Nomes de grupo na listagem e nos breadcrumbs não são links.
13. **Renderize a árvore com um componente Astro recursivo e `<Astro.self>`.** Isso preserva saída estática, funcionamento sem JavaScript e profundidade arbitrária.
14. **Migre os dois assuntos já existentes nesta mudança.** Mova o Assunto 001 para dois grupos e o assunto do concurso de exemplo para um grupo. A reorganização editorial futura dos demais 83 assuntos ocorrerá quando cada conteúdo for produzido; a proposta anterior de expandir o roadmap para 93 assuntos está rejeitada neste escopo.
15. **Não mantenha retrocompatibilidade para caminhos-fonte sem grupo.** Faça uma migração de dados única no mesmo conjunto de mudanças e, ao final, rejeite a estrutura antiga no parser e no build. Não adicione aliases, branches de fallback ou leitura dupla.

## Por que este plano

- Separa organização editorial de identidade pública e persistida, evitando migração de URLs e dados de usuário.
- Usa a capacidade recursiva já existente nos loaders e concentra a mudança nos contratos de caminho, catálogo e apresentação.
- Mantém consumidores sensíveis — sync, KV, IndexedDB, backup, progresso, navegação e offline — apoiados na lista plana e nos `storageId` estáveis.
- Faz o build rejeitar árvores incompletas ou ambíguas antes da publicação.
- Exercita no mesmo catálogo o mínimo obrigatório de um grupo e uma árvore real com dois níveis, sem carregar uma segunda estrutura legada.

## Visão geral

Adicione uma collection `grupos` baseada em `**/grupo.json`, amplie o parser de IDs para exigir concurso, ao menos um grupo e assunto, e construa no catálogo uma árvore discriminada sem remover a lista plana existente. Renderize essa árvore recursivamente na página do concurso e acrescente o caminho de grupos aos breadcrumbs sem criar novas rotas. Em seguida, mova o Assunto 001 para dois grupos explícitos e o assunto de exemplo para um grupo explícito, rejeite definitivamente o formato-fonte anterior, valide a estabilidade das rotas e identidades e atualize a documentação arquitetural e operacional.

## Plano de execução

### 1. Estabeleça os contratos de caminho e schema

- **Arquivos**:
  - `src/lib/content-paths.ts`
  - `src/lib/content-schema.ts`
  - `src/content.config.ts`
  - `tests/unit/content-paths.test.ts`
  - `tests/unit/content-schema.test.ts`
- **Alterações**:
  1. Preserve `normalizeEntry()`, a normalização de barras do Windows e a expressão `ROUTE_SEGMENT` existente.
  2. Mude o retorno de `parseSubjectId(id)` para:
     ```ts
     {
       contestSlug: string;
       groupSlugs: string[];
       subjectSlug: string;
     }
     ```
  3. Faça `parseSubjectId()` aceitar no mínimo três segmentos: concurso, ao menos um grupo e assunto. Valide o primeiro como slug de concurso, o último como slug de assunto e cada segmento intermediário como slug de grupo. Rejeite IDs com menos de três segmentos, segmentos vazios, maiúsculas, espaços ou caracteres fora de `ROUTE_SEGMENT`.
  4. Preserve `subjectIdFromEntry(entry, fileName)` retornando todo o caminho sem o nome do arquivo. A função deve chamar o novo `parseSubjectId()` para validar somente caminhos agrupados e rejeitar explicitamente o formato legado `<concurso>/<assunto>`.
  5. Adicione `groupIdFromEntry(entry, fileName = 'grupo.json')`. Remova o sufixo `/<fileName>`, preserve todo o caminho restante, valide-o com `parseGroupId()` e retorne o ID completo.
  6. Adicione `parseGroupId(id)` retornando `{ contestSlug, groupSlugs }`. Exija no mínimo o concurso e um grupo; valide todos os segmentos com `ROUTE_SEGMENT`.
  7. Adicione a `src/lib/content-schema.ts`:
     ```ts
     export const groupSchema = z
       .object({
         schemaVersion: z.literal(1),
         title: nonEmptyText,
         order: z.number().int().nonnegative(),
         description: nonEmptyText.optional(),
       })
       .strict();

     export type GroupData = z.infer<typeof groupSchema>;
     ```
     Não acrescente `storageId`, revisão ou slug ao schema.
  8. Defina em `src/content.config.ts` a quinta collection:
     ```ts
     const grupos = defineCollection({
       loader: glob({
         base: './src/content/assuntos',
         pattern: '**/grupo.json',
         generateId: ({ entry }) => groupIdFromEntry(entry),
       }),
       schema: groupSchema,
     });
     ```
     Exporte `grupos` junto das quatro collections atuais.
  9. Amplie os testes de caminho para cobrir exatamente um grupo, vários grupos, barras invertidas, grupo sem segmento próprio, caminho legado direto, assunto com menos de três segmentos e segmentos inválidos em qualquer profundidade.
  10. Amplie os testes de schema para aceitar descrição ausente/presente e rejeitar versão desconhecida, ordem negativa, texto vazio e propriedades extras, especialmente `storageId`.
- **Risco**: médio. Uma derivação errada de ID impede a correspondência entre os três arquivos do assunto.
- **Mitigação**: teste os três nomes canônicos (`conteudo.md`, `cheat-sheet.md`, `questoes.json`) com o mesmo caminho aninhado e exija IDs idênticos.
- **Validação**: execute `npx vitest run tests/unit/content-paths.test.ts tests/unit/content-schema.test.ts`. Não execute nem exija `npm run check` neste estado intermediário: o parser novo deve rejeitar os dois caminhos-fonte antigos até a migração atômica da etapa 5, sem fallback temporário.

### 2. Construa a árvore editorial sem remover a projeção plana

- **Arquivos**:
  - `src/lib/catalog-core.ts`
  - `tests/unit/catalog.test.ts`
- **Alterações**:
  1. Acrescente `groups: CatalogRecord<GroupData>[]` a `CatalogSources`.
  2. Use estes contratos públicos no núcleo do catálogo:
     ```ts
     export interface CatalogGroupReference {
       id: string;
       slug: string;
       title: string;
     }

     export interface CatalogSubjectIndex extends SubjectData {
       kind: 'subject';
       id: string;
       slug: string;
       contestSlug: string;
       groupPath: CatalogGroupReference[];
       previousSubjectId: string | null;
       nextSubjectId: string | null;
     }

     export interface CatalogGroupIndex extends GroupData {
       kind: 'group';
       id: string;
       slug: string;
       contestSlug: string;
       parentGroupId: string | null;
       children: CatalogTreeNodeIndex[];
     }

     export type CatalogTreeNodeIndex = CatalogGroupIndex | CatalogSubjectIndex;
     ```
     Acrescente `children: CatalogGroupIndex[]` a `CatalogContestIndex` e preserve `subjects: CatalogSubjectIndex[]`. A raiz de um concurso contém somente grupos; a união `CatalogTreeNodeIndex` é usada dentro de cada grupo.
  3. Valide IDs de grupo duplicados e mantenha todas as validações atuais de concurso, assunto, cheat sheet, questões e `storageId`.
  4. Parseie todos os grupos antes dos assuntos. Rejeite grupo cujo concurso não exista. Para um grupo aninhado, derive o ID do pai removendo o último segmento e rejeite a entrada quando o `grupo.json` do pai não existir.
  5. Parseie cada assunto com `parseSubjectId()`. Derive os IDs cumulativos dos grupos, por exemplo:
     - `concurso/grupo-a`
     - `concurso/grupo-a/grupo-b`
     Exija que todos existam na collection `grupos`.
  6. Construa `groupPath` na ordem raiz-folha com `id`, último `slug` e `title` de cada descritor.
  7. Rejeite slugs públicos de assunto duplicados dentro do mesmo concurso. Essa verificação deve usar `subjectSlug`, não o ID interno completo.
  8. Insira cada grupo raiz em `contest.children`, cada subgrupo em `parent.children` e cada assunto no último grupo de seu caminho. Nunca insira assunto diretamente em `contest.children`; `parseSubjectId()` já deve tornar esse estado impossível.
  9. Ordene recursivamente cada `children` por `order`, depois `title.localeCompare(..., 'pt-BR')`, depois `id.localeCompare(...)`.
  10. Rejeite todo grupo que, após a montagem, não possua nenhum assunto em sua subárvore. Um grupo com apenas subgrupos é válido somente se algum descendente final for assunto.
  11. Continue ordenando `contest.subjects` globalmente por `order`, título e ID e continue preenchendo `previousSubjectId` e `nextSubjectId` nessa lista plana.
  12. Não mude o formato de `OfflineInventory`. Faça `createOfflineInventory()` continuar iterando exclusivamente `contest.subjects` e construindo as URLs com `contest.slug` e `subject.slug`.
  13. Atualize todos os fixtures de `tests/unit/catalog.test.ts` para colocar cada assunto sob ao menos um grupo e fornecer o respectivo `CatalogRecord<GroupData>`.
  14. Adicione cenários unitários para:
      - rejeição de assunto direto sem grupo;
      - assunto com exatamente um grupo;
      - dois níveis de grupo;
      - grupos e assuntos irmãos ordenados deterministicamente;
      - `groupPath` raiz-folha;
      - grupo com concurso inexistente;
      - subgrupo sem descritor pai;
      - assunto que usa grupo sem `grupo.json`;
      - grupo sem assunto descendente;
      - slug final duplicado em grupos diferentes;
      - navegação anterior/próximo atravessando grupos;
      - inventário offline contendo somente as URLs públicas curtas, sem segmentos de grupo.
- **Risco**: alto. O catálogo é a fonte comum de rotas, sync, offline e navegação.
- **Mitigação**: preserve a lista plana como contrato dos consumidores existentes e limite a árvore ao novo campo `children`; cubra ambos com testes independentes.
- **Validação**: execute `npx vitest run tests/unit/catalog.test.ts`, depois `npm run test:unit` completo.

### 3. Hidrate a árvore e preserve todos os consumidores de rotas e persistência

- **Arquivos**:
  - `src/lib/catalog.ts`
  - `src/pages/sync-catalog.json.ts` apenas se os tipos exigirem ajuste; não altere sua resposta JSON
  - `src/pages/concursos/[concurso]/[assunto]/index.astro` apenas para corrigir tipos, sem mudar parâmetros ou rota
  - `src/pages/concursos/[concurso]/[assunto]/cheat-sheet.astro` apenas para corrigir tipos, sem mudar parâmetros ou rota
  - `src/pages/concursos/[concurso]/[assunto]/questoes.astro` apenas para corrigir tipos, sem mudar parâmetros ou rota
- **Alterações**:
  1. Carregue `getCollection('grupos')` no mesmo `Promise.all()` das collections atuais e envie `{ id, data }` em `groups` para `buildCatalogIndex()`.
  2. Preserve `CatalogSubject` com as três entradas Astro hidratadas pelos IDs internos completos.
  3. Defina os tipos hidratados:
     ```ts
     export interface CatalogGroup extends Omit<CatalogGroupIndex, 'children'> {
       children: CatalogTreeNode[];
     }

     export type CatalogTreeNode = CatalogGroup | CatalogSubject;
     ```
     Faça `CatalogContest` conter tanto `subjects: CatalogSubject[]` quanto `children: CatalogGroup[]`. A árvore interna dos grupos continua usando `CatalogTreeNode[]` para admitir subgrupos e assuntos.
  4. Hidrate primeiro a lista plana e crie um mapa de assuntos por ID interno. Depois percorra a árvore de índice recursivamente: reutilize o assunto hidratado quando `kind === 'subject'` e copie o grupo com filhos hidratados quando `kind === 'group'`.
  5. Preserve `getSubjectStaticPaths()` exatamente no formato público atual: itere `contest.subjects` e retorne `params: { concurso: contest.slug, assunto: subject.slug }`.
  6. Preserve `src/pages/sync-catalog.json.ts` com `schemaVersion: 1` e somente `contestStorageId`, `subjectStorageId` e `questionSet`. Não exponha ID interno, grupos ou caminho editorial.
- **Risco**: alto. Usar o ID interno aninhado como parâmetro público quebraria todas as URLs.
- **Mitigação**: trate `subject.id` como chave interna e `subject.slug` como único valor permitido em `params.assunto` e em links.
- **Validação**: confirme pelos testes unitários do catálogo que nenhum parâmetro público deriva do ID interno. Adie `npm run check` e `npm run build` até concluir a migração da etapa 5; não introduza suporte temporário a caminhos sem grupo apenas para deixar o estado intermediário verde.

### 4. Renderize a hierarquia estática e acrescente breadcrumbs textuais

- **Arquivos**:
  - novo `src/components/SubjectCatalogTree.astro`
  - `src/pages/concursos/[concurso]/index.astro`
  - `src/layouts/StudyLayout.astro`
  - `src/styles/global.css`
- **Alterações**:
  1. Crie `SubjectCatalogTree.astro` com props `contest: CatalogContest`, `nodes: CatalogTreeNode[]` e `depth?: number` com padrão zero.
  2. Renderize uma lista ordenada semântica. Para nó `subject`, preserve integralmente o card atual: link curto, descrição e `ProgressSummary` com `contest.storageId`, `subject.storageId` e `subject.questionSetEntry.data.questionSetRevision`.
  3. Para nó `group`, renderize uma seção com título, descrição apenas quando definida e uma chamada recursiva `<Astro.self contest={contest} nodes={node.children} depth={depth + 1} />`. Não renderize `<a>` no título do grupo.
  4. Use headings nativos com nível `min(depth + 2, 6)`. Implemente a seleção do elemento de maneira compatível com Astro/TypeScript strict e preserve `aria` sem inventar links. Para profundidades superiores a quatro grupos, mantenha `h6` e use a estrutura de listas/seções para expressar a continuação da hierarquia.
  5. Em `src/pages/concursos/[concurso]/index.astro`, preserve o teste de vazio baseado em `contest.subjects.length`, substitua o mapeamento plano pelo componente com `nodes={contest.children}` e mantenha o botão de pacote offline fora da árvore.
  6. Em `StudyLayout.astro`, insira cada item de `subject.groupPath` entre o link do concurso e o título do assunto. Renderize separadores com `aria-hidden="true"` e cada título de grupo como `<span>`, nunca como link.
  7. Em `global.css`, substitua/expanda os seletores da antiga `.subject-list` para a nova árvore. Preserve o grid dos cards e aplique estas regras de apresentação:
     - listas sem marcadores e sem padding padrão;
     - espaçamento crescente entre grupos, sem depender de profundidade fixa;
     - nó de grupo ocupando toda a largura do grid;
     - borda ou recuo visual discreto para grupos aninhados;
     - cards com os estilos atuais;
     - layout sem overflow horizontal em viewport móvel.
  8. Não adicione JavaScript no cliente. Todo o catálogo e todos os breadcrumbs devem ser legíveis com JavaScript desabilitado.
- **Risco**: médio. Recursão incorreta pode duplicar nós ou degradar a hierarquia acessível.
- **Mitigação**: use a árvore acíclica construída por prefixos de caminho, renderize cada `children` uma única vez e valide os níveis/links com Playwright.
- **Validação**: revise os tipos e a renderização contra os contratos definidos; execute `npm run check`, `npm run build` e o teste E2E de catálogo somente depois da migração da etapa 5.

### 5. Migre os dois assuntos existentes sem alterar suas identidades

- **Arquivos**:
  - novo `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-gerais/grupo.json`
  - novo `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-gerais/lingua-portuguesa/grupo.json`
  - mover a pasta `src/content/assuntos/tce-ma-2026-analista-administracao/leitura-interpretacao-tipos-generos/` para `src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-gerais/lingua-portuguesa/leitura-interpretacao-tipos-generos/`
  - novo `src/content/assuntos/concurso-exemplo/administracao-publica/grupo.json`
  - mover a pasta `src/content/assuntos/concurso-exemplo/assunto-exemplo/` para `src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/`
- **Conteúdo exato dos descritores**:
  - `conhecimentos-gerais/grupo.json`:
    ```json
    {
      "schemaVersion": 1,
      "title": "Conhecimentos gerais",
      "order": 1
    }
    ```
  - `conhecimentos-gerais/lingua-portuguesa/grupo.json`:
    ```json
    {
      "schemaVersion": 1,
      "title": "Língua Portuguesa",
      "order": 1
    }
    ```
  - `concurso-exemplo/administracao-publica/grupo.json`:
    ```json
    {
      "schemaVersion": 1,
      "title": "Administração pública",
      "order": 1
    }
    ```
- **Alterações**:
  1. Em cada assunto, mova juntos `conteudo.md`, `cheat-sheet.md`, `questoes.json` e eventuais subdiretórios de assets. Preserve os conteúdos byte a byte, salvo eventual ajuste automático inevitável de path relativo constatado pelo build; não há mudança editorial aprovada.
  2. Preserve o slug final `leitura-interpretacao-tipos-generos`.
  3. Preserve `storageId: leitura-tipos-generos`, `order: 1`, `schemaVersion: 1`, `questionSetRevision: 1`, todos os IDs/revisões de questão e todas as alternativas.
  4. No concurso de exemplo, preserve o slug final `assunto-exemplo`, `storageId: fundamentos`, todas as revisões, questões e o subdiretório `images/`; a URL continua `/concursos/concurso-exemplo/assunto-exemplo/`.
  5. Ao concluir os movimentos, não deixe nenhum `conteudo.md`, `cheat-sheet.md` ou `questoes.json` diretamente em `src/content/assuntos/<concurso>/<assunto>/`.
  6. Não altere estados, números ou recortes de assuntos em `ROADMAP.md` durante a migração.
- **Risco**: alto. Uma migração tratada como renomeação pública pode perder continuidade de dados e links.
- **Mitigação**: faça o Git reconhecer a movimentação, mantenha os `storageId` e revisões intactos e valide artefatos públicos por URL e conteúdo.
- **Validação**: execute `npm run build` e confirme que as duas URLs curtas antigas retornam 200, que nenhuma URL gerada inclui `/conhecimentos-gerais/lingua-portuguesa/` ou `/administracao-publica/` e que o parser não aceita mais caminhos-fonte sem grupo.

### 6. Adicione regressões unitárias e E2E para o caso exato

- **Arquivos**:
  - `tests/unit/content-paths.test.ts`
  - `tests/unit/content-schema.test.ts`
  - `tests/unit/catalog.test.ts`
  - `tests/unit/offline-packages.test.ts` somente se necessário para reforçar o contrato de manifesto; não altere a implementação de download
  - novo `tests/e2e/catalog-groups.spec.ts`
- **Alterações**:
  1. Consolide nesta etapa todos os cenários unitários descritos nas etapas 1 e 2.
  2. No teste de inventário, use um assunto com ID interno contendo grupos e confirme rotas exatamente no formato:
     ```text
     /concursos/concurso-a/assunto/
     /concursos/concurso-a/assunto/cheat-sheet/
     /concursos/concurso-a/assunto/questoes/
     ```
     Confirme a ausência dos slugs de grupo.
  3. Em `tests/e2e/catalog-groups.spec.ts`, valide:
     - `/concursos/tce-ma-2026-analista-administracao/` retorna 200;
     - a página contém os headings `Conhecimentos gerais` e `Língua Portuguesa` na hierarquia esperada;
     - o link `Leitura, interpretação, tipos e gêneros textuais` aponta exatamente para `/concursos/tce-ma-2026-analista-administracao/leitura-interpretacao-tipos-generos/`;
     - a URL curta do conteúdo, do cheat sheet e das questões retorna 200;
     - o breadcrumb do conteúdo mostra concurso, `Conhecimentos gerais`, `Língua Portuguesa` e assunto nessa ordem;
     - os dois grupos do breadcrumb são texto e não anchors;
     - a página do concurso de exemplo mostra o grupo `Administração pública`, o assunto abaixo dele e a rota pública `/concursos/concurso-exemplo/assunto-exemplo/` continua válida;
     - o HTML essencial da árvore permanece presente em um contexto com JavaScript desabilitado.
  4. Consulte `/sync-catalog.json` no E2E e confirme que o Assunto 001 ainda é identificado por `contestStorageId: "tcema-2026-adm"`, `subjectStorageId: "leitura-tipos-generos"` e `questionSet.questionSetRevision: 1`, sem campos de grupo.
  5. Consulte `/offline-inventories/tcema-2026-adm.json` depois do build e confirme que as três rotas do Assunto 001 permanecem curtas e que nenhuma rota contém os grupos.
- **Risco**: baixo. Os testes podem ficar acoplados a detalhes apenas visuais.
- **Mitigação**: selecione por papéis, headings, links e contratos JSON; evite snapshots integrais e seletores baseados somente em CSS.
- **Validação**: execute, nesta ordem:
  ```bash
  npm run test:unit
  npm run check
  npm run build
  npm run test:e2e
  ```

### 7. Execute revisão independente e corrija apenas achados confirmados

- **Escopo da revisão**:
  - derivação e validação dos IDs internos;
  - colisão de slugs públicos;
  - construção acíclica e ordenação da árvore;
  - estabilidade de URL, `storageId`, revisões, sync e offline;
  - acessibilidade e renderização sem JavaScript;
  - rejeição definitiva do caminho-fonte legado sem grupos e funcionamento do caso mínimo com um grupo.
- **Procedimento**:
  1. Depois de a implementação e os quatro gates passarem, envie o diff completo para até três revisores independentes disponíveis, todos com o mesmo objetivo, contexto e invariantes.
  2. Classifique achados como críticos, warnings ou sugestões e valide cada um contra código e testes.
  3. Corrija todo achado crítico confirmado e todo warning com impacto real. Não aceite refatorações amplas, mudanças estilísticas ou abstrações sem benefício concreto.
  4. Reexecute os gates afetados e uma nova rodada de revisão até não restar correção aprovada.
- **Risco**: médio. Uma revisão pode sugerir expandir o escopo para rotas de grupo ou persistência.
- **Mitigação**: rejeite achados que contrariem as decisões resolvidas sem demonstrar falha de correção, segurança ou compatibilidade.
- **Validação**: registre concisamente os achados aceitos/rejeitados e mantenha todos os checks verdes depois das correções.

### 8. Atualize a documentação autoritativa depois do código revisado

- **Arquivos**:
  - `AGENTS.md`
  - `README.md`
  - `ROADMAP.md`
  - novo `ADR.md` (o arquivo não existe no estado inicial)
  - este `final_plan.md`, somente para registrar desvios factuais inevitáveis descobertos durante a implementação; não reescreva decisões aprovadas silenciosamente
- **Alterações**:
  1. Atualize `AGENTS.md` na mesma mudança para substituir o contrato rígido `concurso -> assunto` por `concurso -> um ou mais grupos -> assunto`; documente `grupo.json`, a collection `grupos`, a proibição de assuntos diretamente sob o concurso, a unicidade do slug final por concurso, a URL curta, a ausência de `storageId` nos grupos e a preservação da lista plana para persistência/offline.
  2. Atualize a seção “Conteúdo” do `README.md` com o único caminho válido agrupado e exemplos de um e dois níveis. Declare que grupos são obrigatórios, editoriais e não aparecem na URL nem na identidade persistida.
  3. Atualize somente a introdução operacional do `ROADMAP.md` para dizer que os headings de agrupamento devem ser representados obrigatoriamente por `grupo.json` quando conteúdos correspondentes forem publicados. Preserve Assuntos 001 a 084, estados, ordens e recortes.
  4. Delegue ao mantenedor de ADR a criação de `ADR.md` com uma decisão aceita intitulada “Agrupamentos editoriais desacoplados de rotas e persistência”. Registre:
     - contexto da árvore editorial;
     - decisão por descritores `grupo.json` e IDs internos completos;
     - URLs e identidades persistidas curtas/estáveis;
     - consequências positivas e limitações;
     - rejeição de grupos na URL, metadados duplicados em cada assunto, diretórios implícitos sem schema e `storageId` de grupo.
  5. Não crie `CODEBASE.md`; ele não existe e esta mudança não exige um mapa novo fora do escopo.
- **Risco**: baixo. Documentação desatualizada faria futuros conteúdos voltarem ao layout antigo.
- **Mitigação**: compare todos os exemplos de caminho e invariantes entre `AGENTS.md`, `README.md`, `ROADMAP.md`, `ADR.md` e este plano.
- **Validação**: revise links e exemplos, depois execute novamente `npm run check` e `npm run build` se qualquer arquivo processado pelo site tiver sido alterado.

### 9. Faça a validação final e prepare a entrega

- **Ações**:
  1. Inspecione `git status`, o diff completo e os renames. Inclua somente arquivos deste plano e preserve qualquer mudança alheia.
  2. Confirme que `package.json` e `package-lock.json` não mudaram, pois nenhuma dependência é necessária.
  3. Execute os gates finais completos:
     ```bash
     npm run test
     npm run check
     npm run build
     npm run test:e2e
     ```
  4. Confirme no `dist/` e pelos testes HTTP que:
     - as URLs públicas antigas existem;
     - nenhuma rota de grupo foi gerada;
     - `sync-catalog.json` não mudou de schema;
     - o inventário offline usa somente as URLs curtas;
     - a página de concurso apresenta a árvore;
     - o concurso de exemplo usa exatamente um grupo e mantém sua URL curta.
  5. Não faça push, monitore CI ou valide produção até receber autorização explícita. Quando houver push autorizado, confirme CI e deployment do Cloudflare Pages antes de declarar a mudança concluída em produção.
- **Risco**: médio. Um build local verde não prova o deploy sem regressão de headers ou Pages.
- **Mitigação**: após push autorizado, use o fluxo de CI/deploy existente e valide as URLs reais, CSP, headers e pacote offline no domínio `https://concursos.helio.me`.
- **Validação**: todos os comandos devem terminar com sucesso e nenhum diff fora do escopo pode permanecer incluído na entrega.

## Riscos e mitigações

### Críticos

- **Quebra de URLs publicadas ao usar o ID interno aninhado como slug.**
  - Mitigação: gere rotas e links exclusivamente com `subject.slug`, imponha unicidade por concurso e cubra os dois assuntos existentes com E2E em suas rotas públicas.
- **Perda de continuidade dos dados por alteração de identidade persistida.**
  - Mitigação: não altere `contest.storageId`, `subject.storageId`, IDs/revisões de questões ou schemas de sync/backup; valide `sync-catalog.json` e o inventário offline construídos.

### Altos

- **Árvore incompleta por `grupo.json` ausente ou pai implícito.**
  - Mitigação: valide cada prefixo cumulativo e falhe o build com mensagem que identifique assunto/grupo e descritor ausente.
- **Duas fontes diferentes gerando a mesma URL curta.**
  - Mitigação: rejeite slugs finais repetidos dentro do concurso antes de gerar rotas.
- **Companheiros órfãos após a movimentação.**
  - Mitigação: mova a pasta inteira e preserve a validação de igualdade dos IDs internos entre conteúdo, cheat sheet e questões.
- **Regressão em sync ou offline por troca da projeção plana pela árvore.**
  - Mitigação: mantenha `contest.subjects` como fonte exclusiva desses consumidores e use `contest.children` somente na apresentação hierárquica.

### Médios

- **Recursão de UI duplicar nós ou produzir headings inacessíveis.**
  - Mitigação: árvore acíclica por prefixo, discriminante `kind`, chamada única de `<Astro.self>` e testes por papéis/níveis com e sem JavaScript.
- **Grupo vazio aparecer como seção sem conteúdo.**
  - Mitigação: rejeite grupos sem assunto descendente no build.
- **Ordenação instável quando ordens coincidem.**
  - Mitigação: aplique sempre os desempates por título `pt-BR` e ID.
- **Documentação divergir do código.**
  - Mitigação: atualize todos os documentos listados somente depois da implementação revisada e compare os contratos finais.

### Baixos

- **Mudança visual excessiva na página do concurso.**
  - Mitigação: reutilize os cards e tokens CSS atuais; acrescente somente estrutura e recuo necessários à hierarquia.

## Suposições a validar

1. **O `glob()` instalado entrega `entry` relativo ao `base` preservando subdiretórios.**
   - Validação: testes unitários dos helpers e `npm run build` com o Assunto 001 aninhado.
   - Se for falso: inspecione o valor real fornecido pelo Astro instalado, ajuste somente `groupIdFromEntry()`/`subjectIdFromEntry()` para normalizá-lo e mantenha os IDs internos completos definidos neste plano; não mude a arquitetura nem adicione dependência.
2. **`<Astro.self>` está disponível na versão Astro 7 instalada.**
   - Validação: documentação oficial já confirmada, `npm run check` e renderização E2E da árvore de dois níveis.
   - Se for falso por incompatibilidade concreta da versão instalada: atualize Astro somente para a menor versão 7 compatível que documente `Astro.self`, sincronize `package-lock.json`, execute toda a suíte e registre o motivo no ADR. Não introduza framework cliente.
3. **Nenhum consumidor persistido usa `subject.id` como identidade remota.**
   - Validação: pesquise todos os usos de `subject.id`/IDs de collection antes da migração e valide `sync-catalog.json`, backup e offline por testes.
   - Se for falso: altere o consumidor encontrado para `contestStorageId + subjectStorageId`, adicione um teste de migração que preserve os dados atuais e só então mova o assunto. Não crie alias persistente para o caminho antigo.
4. **O catálogo atual não contém colisões de slug final dentro de um concurso.**
   - Validação: a nova verificação de build deve passar antes da migração.
   - Se for falso: interrompa a migração do item conflitante, mantenha o build falhando com diagnóstico explícito e solicite decisão editorial sobre qual slug publicado preservar; não gere duas páginas para a mesma rota.
5. **Mover as pastas inteiras preserva todas as referências relativas dos dois assuntos existentes.**
   - Validação: build, renderização de conteúdo, cheat sheets, questões e verificação dos assets, especialmente `concurso-exemplo/administracao-publica/assunto-exemplo/images/`.
   - Se for falso: ajuste somente as referências relativas quebradas para apontarem ao mesmo asset movido, sem alterar texto editorial, identidade ou URL.

## Decisões e nuances

- “Profundidade arbitrária” aplica-se ao modelo e ao parser; não exige que a migração inicial crie todos os grupos futuros.
- O caminho-fonte é organização editorial e chave interna de build, não permalink.
- `groupPath` guarda uma fotografia derivada dos títulos dos descritores para breadcrumbs; não duplica dados no conteúdo-fonte.
- A lista plana e a árvore contêm referências aos mesmos assuntos conceituais. Elas não representam conteúdos duplicados e não devem produzir rotas duplicadas.
- A navegação anterior/próximo continua global porque `subject.order` é a sequência fixa do roadmap, não uma ordem local reiniciada em cada grupo.
- `group.order` define a posição do grupo entre os filhos do mesmo pai. Assuntos preservam sua `order` global; empates entre qualquer tipo de nó são determinísticos e não alteram anterior/próximo.
- Grupos não têm página, estado de progresso, pacote próprio, revisão, `storageId`, documento KV ou entrada em backup.
- O título de grupo é conteúdo editorial validado; o slug do diretório é apenas identificador estrutural sujeito a `ROUTE_SEGMENT`.
- Renomear um diretório de grupo no futuro muda IDs internos de build, mas não muda URLs nem identidade persistida dos assuntos, desde que os slugs finais e `storageId` permaneçam iguais.
- A ausência de grupos é inválida ao final da migração; não preserve código de compatibilidade para a estrutura-fonte anterior.
- O Assunto 001 permanece concluído no roadmap; mover sua pasta sem alterar material não reabre a revisão editorial.

## Bloqueadores e perguntas abertas

Nenhum.

## Estratégia de testes

1. **Unitários de parsing**: um ou vários grupos, profundidade arbitrária, barras de plataforma, rejeição do caminho direto legado e rejeição de segmentos inválidos.
2. **Unitários de schema**: contrato estrito do `grupo.json`, descrição opcional e proibição de identidade persistida.
3. **Unitários de catálogo**: montagem de árvore, cadeia de pais, grupos vazios, colisão de slug público, ordenação, `groupPath`, projeção plana e navegação entre grupos.
4. **Unitários de offline**: ID interno aninhado produz somente URLs públicas curtas.
5. **Type/build**: `npm run check` e `npm run build` validam collections, tipos Astro, schemas, correspondência dos três arquivos, rotas e scripts de segurança/offline.
6. **E2E**: hierarquia visível, breadcrumbs textuais, URLs publicadas preservadas, casos de um e dois grupos, no-JS, `sync-catalog.json` e inventário offline.
7. **Regressão completa**: `npm run test` e `npm run test:e2e` depois de todas as correções de revisão.
8. **Produção após autorização**: confirmar no domínio real a página do concurso, as três rotas do Assunto 001, headers/CSP e pacote offline.

## Handoff de execução

1. Comece em `/home/ubuntu/MEGA/WORK/concursos` e leia `AGENTS.md`, este `final_plan.md`, o status, o diff, os commits recentes e o `AGENT_PLAN_ANCHOR` mais recente.
2. Confirme que mudanças alheias não conflitam com os arquivos listados. Pare e peça orientação se houver conflito real.
3. Antes de editar código em uma execução agent-driven longa, siga o protocolo de commits ancorados descrito em `AGENTS.md`; não faça commit ou push sem a autorização exigida pela sessão.
4. Trate as etapas 1 a 5 como uma única unidade atômica de migração quando usar commits ancorados: implemente contratos e testes de caminho/schema, catálogo, hidratação e UI; então mova os dois assuntos; só depois crie o primeiro commit de implementação verde. Não adicione compatibilidade temporária para permitir builds entre essas alterações inseparáveis.
5. Execute os testes unitários puros durante a unidade atômica e execute `npm run check`/`npm run build` assim que a migração física remover os últimos caminhos sem grupo. Depois disso, retome validação incremental normal e execute a suíte completa antes da revisão.
6. Faça revisão independente, aplique somente correções confirmadas, atualize a documentação por último e repita os gates finais.
7. Considere a implementação entregue localmente apenas quando todos os critérios abaixo forem satisfeitos; considere-a concluída em produção somente depois de push autorizado, CI e deployment bem-sucedidos.

## Definição de pronto

- A collection `grupos` existe e valida `**/grupo.json` com schema estrito.
- Caminhos de assunto exigem um ou mais grupos, rejeitam o formato direto legado e preservam o ID interno completo.
- Todo grupo usado possui descritor e pai válidos; grupos vazios falham no build.
- Slugs finais duplicados dentro de um concurso falham antes da geração de rotas.
- `contest.subjects` permanece plano e `contest.children` representa a árvore completa.
- A página do concurso renderiza grupos e assuntos recursivamente sem JavaScript.
- Breadcrumbs mostram a cadeia de grupos como texto sem criar links ou páginas de grupo.
- Anterior/próximo continua seguindo a ordem global de assuntos.
- O Assunto 001 está fisicamente sob `conhecimentos-gerais/lingua-portuguesa/` com os dois `grupo.json` especificados.
- A URL pública, `storageId`, revisão do conjunto, IDs/revisões das questões, sync e offline do Assunto 001 permanecem inalterados.
- O concurso de exemplo funciona com o grupo obrigatório `Administração pública` e mantém a URL anterior.
- `AGENTS.md`, `README.md`, `ROADMAP.md` e `ADR.md` documentam o contrato final sem contradições.
- `npm run test`, `npm run check`, `npm run build` e `npm run test:e2e` passam.
- A revisão independente não deixa correção crítica ou warning aprovado pendente.
- Nenhuma dependência, backend, rota de grupo, renumeração editorial ou mudança fora do escopo foi introduzida.

## Fora de escopo

- Criar páginas ou URLs para grupos.
- Incluir grupos em KV, IndexedDB, backup, progresso, preferências, sync ou pacotes persistidos.
- Alterar o schema de `sync-catalog.json` ou `OfflineInventory`.
- Alterar slugs públicos, `storageId`, revisões ou conteúdo pedagógico já publicado.
- Dividir, combinar, criar, remover ou renumerar os Assuntos 001 a 084.
- Migrar antecipadamente assuntos ainda não publicados ou criar toda a árvore futura do TCE/MA.
- Manter suporte, fallback, alias ou leitura dupla para assuntos diretamente abaixo do concurso.
- Adicionar dependências, framework cliente, backend Astro, CMS, autenticação ou adapter Cloudflare.
- Refatorar PWA, Service Worker, sincronização ou persistência além dos ajustes estritamente necessários para preservar seus contratos existentes.

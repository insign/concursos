# AGENTS.md

## Finalidade

Este arquivo reúne as regras invariantes para agentes humanos e de IA que alterem o repositório. Leia-o antes de pesquisar, redigir, revisar, programar ou publicar.

Pedidos explícitos do usuário prevalecem. Em caso de conflito entre uma campanha e estas regras, preserve primeiro segurança, integridade arquitetural, contratos de dados e fatos verificáveis; registre a divergência no PR.

## Fontes de verdade

- A `main`, os schemas, os catálogos de concursos, os descritores `grupo.json`, os vínculos explícitos, os testes e os ADRs definem a estrutura vigente.
- O corpo da issue indicada por uma campanha é a fonte de verdade apenas para o estado operacional dessa campanha: seleção, concorrência, progresso e totais. Comentários não carregam estado, salvo instrução expressa.
- O arquivo legado `ROADMAP.md` foi removido. Referências históricas a ele não definem escopo, ordem, estado ou arquitetura e não justificam recriá-lo.
- Escopo programático e ordem publicados devem ser obtidos dos catálogos, do conteúdo resolvido na `main` e das fontes primárias do edital correspondente.
- Nunca substitua uma fonte de verdade atual por memória de conversa, comentário antigo, nome de pasta, título semelhante ou inferência.

## Princípios gerais

1. Faça a menor mudança que resolva integralmente o problema.
2. Não invente norma, dado, entendimento, citação, questão, exemplo factual, URL, resultado de comando ou estado de CI.
3. Diferencie fato verificado, inferência editorial e decisão de projeto.
4. Preserve compatibilidade de rotas, identidades persistidas, catálogos, sincronização, PWA e conteúdo offline.
5. Não abra commit ou PR vazio.
6. Não altere artefatos fora do escopo solicitado apenas para “aproveitar” a edição.
7. Conteúdo correto, mas impossível de aprender no tempo disponível, ainda é conteúdo editorialmente inadequado.

## Stack e comandos

- Node.js `>=22.12.0`
- Astro, TypeScript estrito, Zod, Vitest e Playwright
- Site estático com PWA e conteúdo offline

Comandos principais:

```bash
npm install
npm run test:unit
npm run check
npm run build
npm run build:budget
npm run test:e2e
npm run preview
```

Use os comandos exigidos pelo escopo e pelo workflow. Não declare sucesso sem evidência. Não edite `.astro/`, `dist/` ou outros artefatos gerados.

## Arquitetura editorial

### Concursos, grupos e rotas

- Catálogos de concursos ficam em `src/content/concursos/`.
- Todo nível editorial de grupo deve possuir `grupo.json` válido.
- Grupos organizam apresentação e cobertura, mas não recebem identidade persistida própria.
- A rota pública do assunto continua baseada no concurso e no slug final; caminhos de grupo não servem para resolver colisões.
- `contestStorageId` e `subjectStorageId` são identidades estáveis. Não os renomeie sem migração deliberada.
- `order` pertence à visão consumidora e pode diferir entre concursos ou cargos.

### Unidade editorial real

Antes de editar qualquer assunto, resolva sua origem:

- **física/local:** arquivos no próprio caminho do consumidor, sob  
  `src/content/assuntos/<concurso>/<grupo...>/<assunto>/`;
- **canônica:** o consumidor contém `vinculo.json` e a origem fica sob  
  `src/content/biblioteca/<grupo...>/<assunto>/`.

O vínculo é sempre explícito. Nunca deduza compartilhamento por slug, título, conteúdo parecido ou proximidade no edital.

A unidade de trabalho é o **assunto resolvido**, não cada aparição em catálogo:

- edite uma origem canônica apenas uma vez;
- considere todos os consumidores e todas as ordens dessa origem;
- mantenha o texto canônico aplicável a todos eles;
- não introduza no canônico recorte exclusivo de um consumidor;
- atualize juntas as visões que representam a mesma unidade real quando a campanha assim exigir.

Um assunto consumidor não pode misturar arquivos físicos com `vinculo.json`. Não use overrides ou cópias divergentes para contornar o vínculo. Se os escopos deixarem de ser equivalentes, trate a arquitetura explicitamente em vez de esconder a diferença no texto.

A resolução de conteúdo deve seguir os utilitários, schemas, catálogos e testes vigentes na `main`. Confirme o resolvedor efetivo antes de agir; nomes de arquivo não constituem contrato arquitetural. Caminho aparente não substitui resolução.

### Contrato dos artefatos

Cada artefato tem função distinta:

- **`conteudo.md`: aprende.** Constrói o modelo mental e ensina o assunto a quem ainda não o domina.
- **`cheat-sheet.md`: recupera.** Reativa rapidamente conhecimento já estudado.
- **`questoes.json`: testa.** Exige reconhecimento, discriminação, aplicação, análise e transferência.
- **`resolucoes/*.md`: explica questões complexas.** Não substitui a aula nem altera a identidade da questão.
- **`referencias.md`: sustenta.** Registra fontes suficientes, identificáveis e pertinentes.
- **mega revisão: integra.** Conecta assuntos de um grupo para revisão final sem concatenar capítulos.

Não transforme `conteudo.md` em cheat sheet expandido, nem o cheat sheet em uma segunda apostila.

## Contrato pedagógico de `conteudo.md`

### Leitor e objetivo

Pressuponha um candidato inteligente, com pouco tempo e sem domínio prévio daquele assunto. O texto deve permitir aprender sem precisar pedir a outra pessoa ou a um modelo que “explique a apostila”.

Otimize, conjuntamente:

\[
\frac{\text{compreensão + retenção + precisão para prova}}{\text{tempo de estudo}}
\]

Ser didático não significa ser longo, infantil, informal ou superficial. A revisão pedagógica deve preferir **reorganizar, substituir e cortar** antes de acrescentar.

### Ordem cognitiva

A ordem do edital, da lei, do manual ou da bibliografia não é automaticamente a melhor ordem de ensino. Preserve a cobertura, mas apresente as ideias na sequência em que possam ser compreendidas.

Em regra:

1. mostre a pergunta, o problema, o contraste ou o mapa central;
2. dê a intuição mínima necessária;
3. use exemplo, cenário, representação ou demonstração quando houver ganho real;
4. introduza os nomes técnicos;
5. sistematize definições, classificações e relações;
6. acrescente requisitos, exceções, prazos, fórmulas, divergências e literalidade;
7. mostre como reconhecer e aplicar isso em prova;
8. proponha poucas perguntas de recuperação quando forem úteis.

Essa sequência é uma heurística, não um template obrigatório. A disciplina e o assunto determinam a melhor estratégia.

### Abertura

O início deve reduzir desorientação. Priorize uma ideia central, pergunta, contraste, fluxo ou pequeno cenário. Evite abrir rotineiramente com uma página de:

- reprodução do edital;
- inventário de assuntos vizinhos;
- corte temporal;
- fontes e ressalvas metodológicas;
- taxonomias sem preparação.

Recorte, aplicabilidade e corte normativo continuam obrigatórios quando relevantes, mas devem ocupar a posição que preserve a correção sem bloquear a entrada pedagógica.

### Contexto funcional

Contextualização não é requisito universal. Inclua origem histórica, evolução, finalidade institucional ou “por que existe” somente quando isso:

- explica o conceito;
- organiza causas e consequências;
- distingue institutos;
- melhora aplicação;
- reduz memorização arbitrária.

Corte curiosidades e narrativas que não aumentem a chance de compreender, reter ou acertar.

Exemplos de adaptação:

- Português, Matemática e Lógica normalmente pedem mecanismo, contraste e prática, não história da disciplina.
- História pede cronologia, atores, causas, interesses, rupturas e consequências.
- Direito costuma ganhar com problema jurídico e lógica da regra antes da literalidade, sem sacrificar requisitos e exceções.
- Administração, Contabilidade, TI e matérias operacionais costumam ganhar com processo, decisão ou situação concreta antes da taxonomia.

### Exemplos, analogias e mnemônicos

- Use poucos exemplos decisivos; prefira um cenário reaproveitado a vários exemplos decorativos.
- Faça o exemplo carregar conceitos e permitir comparação.
- Explique onde uma analogia deixa de valer.
- Use mnemônico apenas quando ele economizar esforço sem distorcer o conteúdo.
- Exemplos factuais devem ser verificáveis; exemplos hipotéticos devem ser claramente hipotéticos.
- Não faça o aluno decorar o mnemônico antes de entender o que ele representa.

### Tabelas, listas e fórmulas

No conteúdo, a tabela deve em geral **sintetizar uma relação já construída**, não substituir toda a explicação. No cheat sheet, ela pode ser o principal instrumento de recuperação.

- Evite sucessões de tabelas e listas sem narrativa ou raciocínio.
- Explique o critério de comparação antes de apresentar classificações extensas.
- Use LaTeX para fórmulas reais; não use matemática como decoração.
- Fórmulas devem trazer significado das variáveis, unidade, condições e pelo menos uma aplicação quando necessário.

### Autonomia e fronteiras entre assuntos

A divisão em assuntos deve evitar duplicação, mas cada capítulo precisa ser autonomamente compreensível dentro do seu recorte.

É permitido apontar que um tema será aprofundado em outro assunto. Antes disso:

- explique o pré-requisito mínimo necessário aqui;
- mostre a relação entre os assuntos;
- não interrompa um raciocínio indispensável;
- não obrigue leitura em ordem perfeita;
- não use “isso será visto depois” como substituto da explicação.

Remissões devem limitar aprofundamento, não terceirizar entendimento. Quando dois capítulos dependem um do outro, construa pontes curtas e coerentes nos dois lados.

### Densidade e tempo de estudo

- Não há tamanho mínimo ou máximo arbitrário.
- Não aumente o arquivo por padrão.
- Remova repetição, metadiscurso, enumeração redundante e explicações que não pagam seu custo de leitura.
- Não repita a mesma arquitetura do cheat sheet com parágrafos entre os itens.
- Preserve profundidade necessária para a prova, mas destaque a trilha essencial e deixe detalhes progressivamente navegáveis.
- Uma seção pode ser curta quando o conceito é simples; uma norma complexa pode exigir mais espaço.
- Não antecipe em profundidade matéria com assunto próprio.
- Não transforme atualização editorial em compêndio doutrinário ou manual operacional sem relação com o edital.

### Precisão, fontes e atualidade

- Cubra integralmente o recorte publicado, sem omissão nem duplicação silenciosa.
- Verifique legislação consolidada, vigência, jurisprudência oficial, atos do órgão, manuais oficiais, documentação técnica e fontes acadêmicas confiáveis.
- Use fonte primária para pontos materiais sempre que disponível.
- Respeite o corte definido pelo edital e diferencie expressamente regra aplicável no corte de alteração posterior relevante.
- Não apresente norma federal infralegal como automaticamente aplicável a outro ente ou órgão.
- Não force questões anteriores quando não existirem ou não forem pertinentes.
- Mantenha citações e referências suficientes para auditoria, sem transformar o corpo em bibliografia comentada.
- Preserve terminologia técnica correta depois de construir seu significado.

### Verificação pedagógica

Antes de considerar o conteúdo pronto, teste:

- A ideia central aparece cedo?
- Um iniciante entende os termos antes de depender deles?
- A progressão constrói entendimento ou apenas acompanha a fonte?
- O contexto incluído é funcional?
- As distinções surgem de um critério compreensível?
- Há exemplos suficientes, mas não decorativos?
- Alguma tabela tenta substituir a aula?
- Alguma remissão remove um pré-requisito?
- O texto repete o cheat sheet em mais palavras?
- É possível cortar trechos sem perder aprendizado ou cobertura?
- O aluno consegue explicar o núcleo com suas próprias palavras?
- O conteúdo continua válido para todos os consumidores canônicos?

## `cheat-sheet.md`

O cheat sheet pressupõe estudo anterior. Deve ser curto, escaneável e útil isoladamente para revisão:

- mapas, fórmulas, fluxos, comparações e gatilhos;
- prazos, requisitos, exceções e pegadinhas;
- mnemônicos realmente úteis;
- linguagem comprimida sem perder exatidão.

Não reensine todo o assunto, não copie o capítulo e não introduza fundamento indispensável que inexiste no `conteudo.md`.

## Questões e resoluções

- Siga rigorosamente os schemas vigentes.
- Preserve IDs estáveis.
- Alterar enunciado, opções ou gabarito exige a revisão prevista pelo contrato de dados.
- Adicionar ou remover questões exige a revisão do conjunto prevista pelo schema.
- Cada questão deve ter uma única resposta correta, distratores plausíveis e explicação suficiente.
- Use apenas os valores de dificuldade aceitos pelo schema; não improvise grafia.
- Não invente atribuição a banca, ano ou prova.
- Resoluções opcionais seguem ADR-004, devem corresponder à revisão da questão e não alteram a identidade persistida.
- Não ajuste questões ou resoluções numa campanha restrita ao conteúdo, salvo autorização expressa; registre problemas externos no PR.

## Referências

- `referencias.md` não possui frontmatter.
- Siga a hierarquia de headings aceita pelo projeto; mega revisões possuem contrato próprio.
- Inclua título/órgão ou autor, identificação suficiente, URL válida e data/edição quando material.
- Não use agregadores ou blogs quando a fonte primária estiver disponível.
- Links devem ser reais, pertinentes e verificáveis.
- Ao retirar uma afirmação material, retire também referência que ficou órfã; ao acrescentar uma afirmação material, acrescente suporte adequado.
- Não confunda data de acesso com vigência ou corte normativo.

## Mega revisões

Mega revisões seguem ADR-005 e ADR-007.

- Física: `src/content/assuntos/<concurso>/<grupo...>/mega-revisao/index.md`.
- Canônica: `src/content/biblioteca/<grupo-canônico>/mega-revisao/index.md`, consumida por `mega-revisao/vinculo.json`.
- Compartilhamento é explícito e exige igualdade exata do conjunto de assuntos resolvidos.
- Não misture revisão física e vínculo, não use overrides e não deixe referências locais junto ao vínculo.
- A revisão integra e sintetiza; não concatena conteúdos nem substitui o aprendizado inicial de cada assunto.
- Não altere mega revisão numa campanha restrita a `conteudo.md`, salvo autorização expressa.

## Markdown e estilo editorial

- Escreva em português brasileiro claro e profissional.
- Não use emojis no conteúdo do repositório.
- Use headings progressivos e títulos informativos.
- Evite heading vazio, parágrafo excessivamente longo e fragmentos telegráficos sem função.
- Use negrito com moderação e não como substituto de hierarquia.
- Use `<abbr title="...">` apenas quando ajudar acessibilidade; não dependa de HTML arbitrário.
- Mantenha cercas de código, tabelas, links e fórmulas válidos.
- Não use TODO, placeholder, fonte inventada, texto de bastidor ou instrução ao agente no conteúdo publicado.

## Processo de trabalho

1. Releia a issue da campanha, `AGENTS.md`, a `main`, schemas, catálogos e ADRs pertinentes.
2. Resolva a unidade real e todos os consumidores antes de reservar ou editar.
3. Leia o conteúdo completo, cheat sheet, questões, resoluções e referências pertinentes.
4. Leia assuntos vizinhos suficientes para detectar lacunas, sobreposição, pré-requisitos terceirizados e fragmentação.
5. Inventarie cobertura, ordem cognitiva, redundância, densidade, vigência e fontes.
6. Pesquise e revalide pontos materiais.
7. Reestruture o texto inteiro quando necessário; não limite a revisão a acrescentar uma introdução “didática”.
8. Atualize apenas os arquivos permitidos pela campanha.
9. Valide schemas, frontmatter, Markdown, links, referências, rotas, vínculos, colisões e escopo do diff.
10. Execute os checks exigidos.
11. Crie branch a partir da `main`, commits coerentes e PR descritivo.
12. Antes do merge, releia o estado da campanha e a `main`; confirme propriedade, conflitos, diff e checks.
13. Mescle somente após sucesso e confirme o conteúdo na `main`.
14. Atualize o estado da campanha apenas depois da confirmação na `main`.

Se a auditoria concluir que nenhuma alteração é necessária, não crie PR vazio; registre critérios e evidência conforme a campanha.

## Git e PR

- Prefira o conector GitHub quando estiver disponível; não pressuponha `gh`.
- Branches partem da `main` atual.
- Commits devem ter propósito claro; use squash no merge quando a sequência de commits for apenas operacional.
- O PR deve registrar unidade real, consumidores, arquivos, antes/depois, decisões editoriais, cobertura, fontes, corte, problemas externos e validações.
- Revise o diff inteiro.
- Nunca inclua segredo, token, credencial ou dado pessoal.
- Não finalize trabalho alheio nem normalize estado concorrente sem autorização.

## Qualidade técnica, segurança e acessibilidade

- TypeScript permanece estrito; evite `any` sem justificativa.
- Validação de conteúdo deve falhar de modo fechado em vínculos, schemas e identidades inválidos.
- Preserve CSP, sanitização, rotas estáticas e ausência de dependências remotas não autorizadas.
- Funcionalidades interativas devem funcionar por teclado, ter rótulos e estados acessíveis e respeitar foco.
- Mudanças que afetem PWA, persistência, sincronização, simuladores, impressão ou offline exigem leitura dos ADRs e testes específicos.
- Não enfraqueça contratos técnicos para fazer conteúdo “passar”.

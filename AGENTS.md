# AGENTS.md

## Finalidade

Este arquivo reúne as regras invariantes para agentes humanos e de IA que alterem o repositório. Leia-o antes de pesquisar, redigir, revisar, programar ou publicar.

Pedidos explícitos do usuário prevalecem. Preserve sempre fatos verificáveis, contratos de dados, identidades e integridade arquitetural.

## Fontes de verdade

- A `main`, os schemas, os catálogos de concursos, os descritores `grupo.json`, os vínculos explícitos e os ADRs definem a estrutura vigente.
- O corpo da issue indicada por uma campanha é a fonte de verdade apenas para o estado operacional dessa campanha: seleção, concorrência, progresso e totais. Comentários não carregam estado, salvo instrução expressa.
- O arquivo legado `ROADMAP.md` foi removido. Referências históricas a ele não definem escopo, ordem, estado ou arquitetura e não justificam recriá-lo.
- Escopo programático e ordem publicados devem ser obtidos dos catálogos, do conteúdo resolvido na `main` e das fontes primárias do edital correspondente.
- Nunca substitua uma fonte de verdade atual por memória de conversa, comentário antigo, nome de pasta, título semelhante ou inferência.

## Princípios gerais

1. Faça a menor mudança que resolva integralmente o problema.
2. Não invente norma, dado, entendimento, citação, questão, exemplo factual, URL, resultado de comando ou estado do repositório.
3. Diferencie fato verificado, inferência editorial e decisão de projeto.
4. Preserve rotas, identidades persistidas, catálogos, sincronização, PWA e conteúdo offline.
5. Não crie commit vazio.
6. Não altere artefatos fora do escopo solicitado apenas para “aproveitar” a edição.
7. Conteúdo correto, mas impossível de aprender no tempo disponível, ainda é conteúdo editorialmente inadequado.

## Fluxo Git e publicação

Este é um repositório de trabalho individual. **Commit direto na `main` é o fluxo padrão.** Branch, pull request, revisão formal e CI não são requisitos para publicar mudanças, salvo pedido explícito do usuário.

- Prefira sempre o conector GitHub; não pressuponha disponibilidade de `gh`.
- Antes de escrever, releia a `main` e, em campanha concorrente, a issue de estado.
- Use o SHA atual do arquivo ou da referência para evitar sobrescrever alteração concorrente sem perceber.
- Faça commits pequenos, coerentes e identificáveis pelo assunto alterado.
- Depois do commit, leia novamente o arquivo na `main` e confirme o SHA/commit resultante.
- Só depois da confirmação na `main` atualize uma unidade de campanha para `done`.
- Se a gravação falhar ou não chegar à `main`, não declare conclusão; reverta o estado operacional conforme a campanha.
- Não crie branch ou PR apenas por ritual. Use-os somente se o usuário pedir isolamento/revisão deliberada ou enquanto uma regra da plataforma ainda impedir gravação direta.

### Testes e comandos

O projeto usa Node.js `>=22.12.0`, Astro, TypeScript estrito, Zod, Vitest e Playwright. Os comandos abaixo permanecem disponíveis para diagnóstico ou quando o usuário pedir explicitamente:

```bash
npm install
npm run test:unit
npm run check
npm run build
npm run build:budget
npm run test:e2e
npm run preview
```

**Nenhum desses comandos é gate obrigatório de edição ou publicação e não deve ser executado por padrão.** Não invente resultado de comando não executado. Não edite `.astro/`, `dist/` ou artefatos gerados.

## Arquitetura editorial

### Concursos, grupos e rotas

- Catálogos de concursos ficam em `src/content/concursos/`.
- Todo nível editorial de grupo deve possuir `grupo.json` válido.
- Grupos organizam apresentação e cobertura, mas não recebem identidade persistida própria.
- A rota pública do assunto continua baseada no concurso e no slug final; caminhos de grupo não servem para resolver colisões.
- `contestStorageId` e `subjectStorageId` são identidades estáveis. Não os renomeie sem migração deliberada.
- `order` pertence à visão consumidora e pode diferir entre concursos ou cargos.

### Unidade editorial real e canônicos

Antes de editar qualquer assunto, resolva sua origem:

- **física/local:** arquivos no próprio caminho do consumidor, sob `src/content/assuntos/<concurso>/<grupo...>/<assunto>/`;
- **canônica:** o consumidor contém `vinculo.json` e a origem fica sob `src/content/biblioteca/<grupo...>/<assunto>/`.

O vínculo é sempre explícito. Nunca deduza compartilhamento por slug, título, conteúdo parecido ou proximidade no edital.

A unidade de trabalho é o **assunto resolvido**, não cada aparição em catálogo:

- edite uma origem canônica apenas uma vez;
- considere todos os consumidores e todas as ordens dessa origem;
- mantenha o texto canônico aplicável a todos eles;
- não introduza no canônico recorte exclusivo de um consumidor;
- atualize juntas as visões que representam a mesma unidade real quando a campanha assim exigir.

Um assunto consumidor não pode misturar arquivos físicos com `vinculo.json`. Não use overrides ou cópias divergentes para contornar o vínculo. Se os escopos deixarem de ser equivalentes, trate a inconsistência explicitamente em vez de escondê-la no texto.

A resolução de conteúdo deve seguir os utilitários, schemas, catálogos e contratos vigentes na `main`. Confirme o resolvedor efetivo antes de agir; nomes de arquivo não constituem contrato arquitetural. Caminho aparente não substitui resolução.

### Função dos artefatos

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

Otimize conjuntamente **compreensão, retenção e precisão para prova por minuto de estudo**.

Ser didático não significa ser longo, infantil, informal ou superficial. A revisão pedagógica deve preferir **reorganizar, substituir e cortar** antes de acrescentar.

### Ordem cognitiva

A ordem do edital, da lei, do manual ou da bibliografia não é automaticamente a melhor ordem de ensino. Preserve a cobertura, mas apresente as ideias na sequência em que possam ser compreendidas.

Como heurística, não como template obrigatório:

1. mostre a pergunta, o problema, o contraste, o fluxo ou o mapa central;
2. dê a intuição mínima necessária;
3. use exemplo, cenário, representação ou demonstração quando houver ganho real;
4. introduza os nomes técnicos;
5. sistematize definições, classificações e relações;
6. acrescente requisitos, exceções, prazos, fórmulas, divergências e literalidade;
7. mostre como reconhecer e aplicar isso em prova;
8. use poucas perguntas de recuperação quando forem úteis.

A disciplina e o assunto determinam a estratégia. Não copie mecanicamente a estrutura de outro capítulo, ainda que ele tenha sido bem revisado.

Em teorias, escolas e autores, quando útil, organize por **problema → contribuição/lente → impacto → limite → contraste**. Em assunto normativo ou técnico, construa o mecanismo, a decisão ou o fluxo antes de detalhar a regra, preservando literalidade e exceções.

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

Adapte à disciplina:

- Português, Matemática e Lógica normalmente pedem mecanismo, contraste e prática, não história da disciplina.
- História pede cronologia, atores, causas, interesses, rupturas e consequências.
- Direito costuma ganhar com problema jurídico e lógica da regra antes da literalidade, sem sacrificar requisitos e exceções.
- Administração, Contabilidade, TI e matérias operacionais costumam ganhar com processo, decisão ou situação concreta antes da taxonomia.

### Exemplos, analogias e mnemônicos

- Use poucos exemplos decisivos; prefira um cenário reaproveitado a vários exemplos decorativos.
- Faça o exemplo carregar conceitos e permitir comparação.
- Explique onde uma analogia deixa de valer.
- Use mnemônico apenas quando economizar esforço sem distorcer o conteúdo.
- Exemplos factuais devem ser verificáveis; exemplos hipotéticos devem ser claramente hipotéticos.
- Não faça o aluno decorar o mnemônico antes de entender o que ele representa.

### Tabelas, listas e fórmulas

No conteúdo, a tabela deve em geral **sintetizar uma relação já construída**, não substituir a explicação. No cheat sheet, ela pode ser o principal instrumento de recuperação.

- Evite sucessões de tabelas e listas sem narrativa ou raciocínio.
- Explique o critério de comparação antes de apresentar classificações extensas.
- Use LaTeX para fórmulas reais; não use matemática como decoração.
- Fórmulas devem trazer significado das variáveis, unidade, condições e aplicação quando necessário.

### Autonomia e fronteiras entre assuntos

A divisão em assuntos deve evitar duplicação, mas cada capítulo precisa ser autonomamente compreensível dentro do próprio recorte.

É permitido apontar que um tema será aprofundado em outro assunto. Antes disso:

- explique o pré-requisito mínimo necessário aqui;
- mostre a relação entre os assuntos;
- não interrompa um raciocínio indispensável;
- não obrigue leitura em ordem perfeita;
- não use “isso será visto depois” como substituto da explicação.

Remissões limitam aprofundamento; não terceirizam entendimento. Quando dois capítulos dependem um do outro, construa pontes curtas e coerentes.

### Siglas, termos e microglossário com `abbr`

O leitor não precisa memorizar uma sigla para conseguir continuar a leitura. Use o recurso já suportado pelo projeto: `<abbr title="significado breve">expressão</abbr>`. A ajuda deve estar disponível no ponto de uso, não apenas na primeira definição ou quando ela estiver distante.

- **Siglas e abreviaturas técnicas ou institucionais:** marque cada ocorrência no texto didático renderizado, inclusive em listas e tabelas, mesmo quando a expansão já apareceu ou está próxima. O `title` contém a expansão por extenso correspondente ao contexto; respeite singular/plural e não reúna significados alternativos incompatíveis.
- **Termos técnicos, jargões, latinismos e estrangeirismos:** quando usados antes de serem explicados ou sem desenvolvimento neste capítulo, acrescente microdescrição a cada ocorrência nessa condição. Depois de ensinados, reapresente a ajuda em retomadas distantes e trechos consultáveis isoladamente quando útil. Não marque palavras comuns indiscriminadamente.
- **Microdescrição:** use uma expressão ou frase curta, correta, contextual e compreensível sem outro termo ainda desconhecido. Não escreva um segundo capítulo no `title`, não repita apenas o termo e não crie cadeias de siglas inexplicadas. A descrição deve ter o mesmo suporte factual da explicação no corpo.
- **Apoio, não substituição:** conceitos centrais e pré-requisitos indispensáveis continuam explicados no corpo antes de serem exigidos. O `abbr` não autoriza introduzir jargão cedo, suprimir a ponte mínima, esconder exceções ou terceirizar a aula para interações. O núcleo do capítulo deve ser compreensível também na leitura sem a ajuda e na impressão.
- **Consistência canônica:** mantenha a expansão e o sentido corretos para todos os consumidores da origem. Sigla ambígua exige interpretação contextual, não substituição global cega.
- **Marcação:** escreva `title="..."` não vazio e feche `</abbr>`. Use texto simples no atributo, sem Markdown, HTML, URLs ou LaTeX; escape aspas internas e caracteres especiais quando necessário. Não aninhe `abbr`, não o coloque dentro de links/controles interativos e não adicione scripts, estilos ou atributos de interação: o projeto cuida do comportamento.
- **Limites de edição:** não insira marcação em frontmatter, identificadores, destinos de links, código, fórmulas ou campos que exigem texto puro. Preserve a literalidade de transcrições e não acrescente pistas que revelem respostas de questões. Nos outros artefatos, aplique a regra apenas se sua edição e seu formato permitirem; a regra não amplia o escopo da campanha.

Exemplos de autoria:

```html
<abbr title="Estrutura Analítica do Projeto">EAP</abbr>
<abbr title="Remissão a um elemento anterior do texto">anáfora</abbr>
```

O uso para termos não abreviados é uma convenção editorial local de microglossário que aproveita o componente existente, não a semântica padrão do elemento HTML `abbr`, destinada a abreviações e siglas. Não altere a infraestrutura para aplicar esta orientação.

### Densidade e tempo de estudo

- Não há tamanho mínimo ou máximo arbitrário.
- Não aumente o arquivo por padrão.
- Crescimento líquido relevante exige dívida pedagógica real e ganho proporcional de aprendizagem ou precisão; uma revisão longa não é precedente para expandir as seguintes.
- Ao comparar tamanho, separe texto visível, marcação e microdescrições. Mais HTML não significa, por si só, mais tempo de leitura; isso não autoriza inflar os textos de ajuda.
- Remova repetição, metadiscurso, enumeração redundante e explicações que não pagam seu custo de leitura.
- Não repita a arquitetura do cheat sheet com parágrafos entre os itens.
- Preserve profundidade necessária para a prova, mas destaque a trilha essencial e deixe detalhes progressivamente navegáveis.
- Uma seção pode ser curta quando o conceito é simples; uma norma complexa pode exigir mais espaço.
- Não antecipe em profundidade matéria com assunto próprio.
- Não transforme atualização editorial em compêndio doutrinário ou manual operacional sem relação com o edital.

### Precisão, fontes e atualidade

- Cubra integralmente o recorte publicado, sem omissão nem duplicação silenciosa.
- Verifique legislação consolidada, vigência, jurisprudência oficial, atos do órgão, manuais oficiais, documentação técnica e fontes acadêmicas confiáveis.
- Use fonte primária para pontos materiais sempre que disponível.
- Respeite o corte definido pelo edital e diferencie regra aplicável no corte de alteração posterior relevante.
- Não apresente norma federal infralegal como automaticamente aplicável a outro ente ou órgão.
- Não force questões anteriores quando não existirem ou não forem pertinentes.
- Mantenha referências suficientes para auditoria sem transformar o corpo em bibliografia comentada.
- Preserve terminologia técnica correta depois de construir seu significado.

### Verificação pedagógica

Antes de considerar o conteúdo pronto, verifique por leitura e comparação:

- A ideia central aparece cedo?
- Um iniciante entende os termos antes de depender deles?
- Cada ocorrência de sigla tem expansão consultável, mesmo após a primeira definição?
- Termos ainda não explicados têm microdescrição clara, sem substituir pré-requisitos no corpo?
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
- Use apenas os valores de dificuldade aceitos pelo schema.
- Não invente atribuição a banca, ano ou prova.
- Resoluções opcionais seguem ADR-004, devem corresponder à revisão da questão e não alteram a identidade persistida.
- Não ajuste questões ou resoluções numa campanha restrita ao conteúdo, salvo autorização expressa; registre problemas externos na resposta da campanha.

## Referências

- `referencias.md` não possui frontmatter.
- Siga a hierarquia de headings aceita pelo projeto; mega revisões possuem contrato próprio.
- Inclua título/órgão ou autor, identificação suficiente, URL válida e data/edição quando material.
- Não use agregadores ou blogs quando a fonte primária estiver disponível.
- Links devem ser reais, pertinentes e verificáveis.
- Ao retirar afirmação material, retire referência que ficou órfã; ao acrescentar afirmação material, acrescente suporte adequado.
- Não confunda data de acesso com vigência ou corte normativo.

## Mega revisões

Mega revisões seguem ADR-005 e ADR-007.

- Física: `src/content/assuntos/<concurso>/<grupo...>/mega-revisao/index.md`.
- Canônica: `src/content/biblioteca/<grupo-canônico>/mega-revisao/index.md`, consumida por `mega-revisao/vinculo.json`.
- Compartilhamento é explícito e exige igualdade exata do conjunto de assuntos resolvidos.
- Não misture revisão física e vínculo, não use overrides e não deixe referências locais junto ao vínculo.
- A mega revisão integra e sintetiza; não concatena conteúdos nem substitui o aprendizado inicial.
- Não altere mega revisão numa campanha restrita a `conteudo.md`, salvo autorização expressa.

## Markdown e estilo editorial

- Escreva em português brasileiro claro e profissional.
- Não use emojis no conteúdo do repositório.
- Use headings progressivos e títulos informativos.
- Evite heading vazio, parágrafo excessivamente longo e fragmentos telegráficos sem função.
- Use negrito com moderação e não como substituto de hierarquia.
- Aplique a seção “Siglas, termos e microglossário com `abbr`”; não dependa de HTML arbitrário.
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
9. Revise manualmente frontmatter, Markdown, links, referências, cobertura, corte, origem canônica/local, siglas, microdescrições e escopo da mudança.
10. Antes de gravar, releia a issue e a `main`; confirme propriedade, concorrência e que a unidade ainda pode ser alterada.
11. Grave diretamente na `main` com commit coerente e sem arquivos fora do escopo.
12. Leia o arquivo novamente na `main` e confirme o commit resultante.
13. Só então atualize o estado da campanha.

Se a auditoria concluir que nenhuma alteração é necessária, não crie commit vazio; registre a evidência e atualize a campanha conforme suas regras.

## Segurança, acessibilidade e contratos técnicos

- TypeScript permanece estrito; evite `any` sem justificativa.
- Validação de conteúdo deve falhar de modo fechado em vínculos, schemas e identidades inválidos.
- Preserve CSP, sanitização, rotas estáticas e ausência de dependências remotas não autorizadas.
- Funcionalidades interativas devem funcionar por teclado, ter rótulos e estados acessíveis e respeitar foco.
- Mudanças que afetem PWA, persistência, sincronização, simuladores, impressão ou offline exigem leitura dos ADRs pertinentes e inspeção específica do impacto.
- Não enfraqueça contratos técnicos para fazer conteúdo “passar”.

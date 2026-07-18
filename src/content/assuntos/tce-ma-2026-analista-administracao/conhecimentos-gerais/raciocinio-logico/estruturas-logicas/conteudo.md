---
schemaVersion: 1
title: Estruturas lógicas
description: Modelagem e resolução de problemas finitos de ordenação, associação, distribuição, agrupamento, sequências e outras relações sujeitas a restrições.
order: 36
storageId: estruturas-logicas
---

## 1. O que são estruturas lógicas

Em provas de raciocínio lógico, **estruturas lógicas** são problemas nos quais pessoas, objetos, lugares, datas ou eventos fictícios mantêm relações definidas por um conjunto de condições. O candidato precisa organizar essas informações, deduzir consequências e decidir o que é possível, necessário ou impossível.

São exemplos recorrentes:

- ordenar pessoas em uma fila ou tarefas em uma sequência;
- associar servidores a setores, horários e atividades;
- distribuir objetos entre recipientes ou processos entre equipes;
- formar grupos sujeitos a inclusões e incompatibilidades;
- completar uma sequência regida por padrão identificável;
- interpretar hierarquias, parentescos, calendários e horários;
- combinar declarações verdadeiras e falsas como restrições de um cenário.

O ponto comum não é o tema superficial, mas a existência de:

1. **entidades** que devem ser organizadas;
2. **domínios** de valores possíveis;
3. **relações ou restrições** que eliminam combinações;
4. **uma pergunta** sobre as configurações que permanecem válidas.

> A habilidade central é converter linguagem em uma representação precisa e trabalhar apenas com conclusões sustentadas pelas condições.

## 2. Limites deste assunto

Este assunto trata de **organização relacional de cenários finitos**. Outros tópicos do edital serão estudados separadamente:

| Tema | Onde será aprofundado |
|---|---|
| validade de argumentos, analogias, inferências e conclusões | Assunto 037 |
| proposições simples e compostas e tabelas-verdade | Assunto 038 |
| equivalências, leis de De Morgan e diagramas lógicos | Assunto 039 |
| quantificadores e lógica de primeira ordem | Assunto 040 |
| princípios de contagem e probabilidade | Assunto 041 |
| operações com conjuntos | Assunto 042 |
| problemas aritméticos, geométricos e matriciais | Assuntos 043 a 045 |

Símbolos lógicos podem aparecer aqui apenas como notação auxiliar. O objetivo não é construir tabelas-verdade nem demonstrar equivalências, e sim resolver a estrutura concreta descrita pelo enunciado.

## 3. Modelo: variáveis, domínios e restrições

Uma forma segura de interpretar o problema é tratá-lo como um sistema de três partes.

### 3.1. Variáveis

Variáveis são os elementos cujos valores ainda precisam ser determinados.

Exemplo: em uma agenda com Ana, Bruno e Carla, pode-se usar uma variável para o dia de cada pessoa:

- dia(Ana);
- dia(Bruno);
- dia(Carla).

Em outro modelo, os próprios dias podem ser variáveis cujo valor é o nome da pessoa. A escolha deve facilitar as condições dadas.

### 3.2. Domínios

O domínio reúne os valores que uma variável pode assumir antes da aplicação das restrições.

Se cada pessoa será atendida em um dia diferente entre segunda, terça e quarta:

$$
dia(pessoa) \in \{segunda, terça, quarta\}
$$

O domínio inicial pode encolher à medida que condições são aplicadas.

### 3.3. Restrições

Restrições determinam quais combinações são aceitas. Por exemplo:

- Ana não será atendida na segunda;
- Bruno será atendido antes de Carla;
- cada dia receberá exatamente uma pessoa.

Uma **solução** é uma atribuição completa que satisfaz simultaneamente todas as restrições. Uma escolha compatível com apenas parte delas não basta.

### 3.4. O enunciado como sistema fechado

Em regra, personagens e objetos fictícios obedecem somente às condições fornecidas. Não se deve acrescentar conhecimento externo, preferência pessoal ou suposição de “normalidade”. Se o enunciado não proíbe duas tarefas no mesmo dia, isso só poderá ser presumido quando outra regra, como “uma tarefa por dia”, produzir essa proibição.

## 4. Tradução cuidadosa da linguagem

A maior parte dos erros nasce antes dos cálculos. Cada frase deve ser traduzida sem enfraquecimento nem ampliação.

| Expressão | Tradução operacional |
|---|---|
| A antes de B | posição(A) < posição(B) |
| A imediatamente antes de B | posição(B) = posição(A) + 1 |
| A depois de B | posição(A) > posição(B) |
| A ao lado de B | posições consecutivas, sem direção definida |
| A não ao lado de B | distância entre posições diferente de 1 |
| A junto de B | mesmo grupo, salvo definição diversa |
| A separado de B | grupos diferentes |
| somente A pode executar X | qualquer executor de X deve ser A; não afirma, por si só, que X ocorre |
| A somente se B | A exige B; B é condição necessária para A |
| se A, então B | ocorrência de A força B; ausência de A não decide B |
| exatamente um | um e somente um |
| pelo menos um | um ou mais |
| no máximo um | zero ou um |
| ou A ou B, mas não ambos | exatamente uma das alternativas |

### 4.1. “Antes” não significa “imediatamente antes”

Se A vem antes de B, pode haver elementos entre eles. A relação de adjacência só existe quando o enunciado usa “imediatamente”, “logo”, “sem intervalo” ou expressão equivalente.

### 4.2. “Ao menos” não significa “exatamente”

“Pelo menos dois” admite dois, três ou mais. “Exatamente dois” fixa a quantidade. “No máximo dois” admite zero, um ou dois.

### 4.3. Condição necessária não é condição suficiente

Se “Lia participa somente se Nuno participar”, a participação de Lia força a de Nuno. A participação de Nuno, isoladamente, não força a de Lia.

### 4.4. Negação local

“Paulo não fica no setor X” elimina uma célula. Não informa em qual dos demais setores Paulo fica. Uma eliminação só se torna atribuição quando resta uma única possibilidade.

## 5. Tipos de restrição

Reconhecer a forma da condição ajuda a escolher a representação.

### 5.1. Unária

Afeta uma única variável:

- Joana não ocupa a primeira posição;
- o processo P ocorre na terça-feira.

### 5.2. Binária

Relaciona duas variáveis:

- A vem antes de B;
- C e D estão no mesmo grupo;
- E não trabalha com F.

### 5.3. Global

Afeta várias variáveis de uma vez:

- todas as pessoas ocupam posições distintas;
- cada setor recebe exatamente dois servidores;
- pelo menos uma tarefa de cada tipo aparece na agenda.

### 5.4. Igualdade e diferença

- mesmo valor: Ana e Beto trabalham no mesmo dia;
- valores distintos: cada pessoa tem uma função diferente.

### 5.5. Precedência e adjacência

- precedência: A ocorre antes de B;
- adjacência orientada: A imediatamente antes de B;
- adjacência não orientada: A ao lado de B.

### 5.6. Implicação e exclusividade

- implicação: se A estiver no grupo, B também estará;
- incompatibilidade: A e B não podem estar juntos;
- exclusividade: exatamente uma entre A e B ocorre.

### 5.7. Cardinalidade

Controla quantidades:

- exatamente três servidores no grupo;
- ao menos duas tarefas urgentes;
- no máximo um evento por horário.

## 6. Representações úteis

Não existe uma representação universalmente melhor. Escolha a que torna as restrições visíveis e reduz a carga de memória.

### 6.1. Linha de posições

Use espaços numerados para filas, colocações e agendas:

```text
posição:  1   2   3   4   5
ocupante: _   _   _   _   _
```

Blocos ajudam com adjacências. “A imediatamente antes de C” vira o bloco `[A C]`, que se desloca sem ser separado.

### 6.2. Tabela de associação

Use quando categorias diferentes se relacionam uma a uma:

| Pessoa | Setor | Dia |
|---|---|---|
| Lia | ? | ? |
| Nuno | ? | ? |
| Olga | ? | ? |

Uma grade de marcações também pode registrar `✓` para associação confirmada e `×` para associação impossível.

### 6.3. Caixas ou colunas

Use para alocação e agrupamento:

```text
Equipe 1: [   ] [   ]
Equipe 2: [   ] [   ]
```

Registre capacidade e quantidade mínima ou máxima antes de distribuir elementos.

### 6.4. Grafo ou diagrama de relações

Vértices podem representar pessoas e setas podem indicar precedência, chefia ou dependência. Antes de desenhar, defina o significado da seta. Inverter uma seta de “A supervisiona B” para “A é supervisionado por B” altera todo o problema.

### 6.5. Lista de casos

Quando uma regra oferece poucas alternativas, divida explicitamente:

```text
Caso 1: A está no grupo X.
Caso 2: A está no grupo Y.
```

Cada caso herda todas as condições originais. Caso que viole uma delas deve ser descartado por inteiro.

## 7. Método geral de resolução

### Passo 1 — identificar a pergunta

Determine se a prova pede o que **pode ser**, **deve ser**, **não pode ser**, uma configuração completa ou o número de configurações. A pergunta define o grau de prova necessário.

### Passo 2 — listar entidades e domínios

Separe as categorias e conte seus elementos. Verifique se a associação é um para um, muitos para um ou limitada por capacidade.

### Passo 3 — registrar as regras fortes

Comece por posições fixas, blocos, quantidades exatas, exclusões amplas e elementos com poucos valores possíveis. Elas propagam mais informação.

### Passo 4 — propagar consequências

Depois de cada atribuição:

- risque valores incompatíveis;
- observe domínios que ficaram com um único valor;
- atualize capacidades e quantidades restantes;
- aplique novamente as implicações ativadas;
- procure posições reservadas a um único elemento.

### Passo 5 — abrir casos apenas quando necessário

Se a dedução direta parar, escolha uma alternativa com poucas possibilidades e examine cada ramo. Não faça tentativa aleatória sem registrar o caso.

### Passo 6 — validar todas as condições

Uma grade preenchida pode parecer coerente e ainda violar uma regra esquecida. Releia cada condição e marque-a como satisfeita.

### Passo 7 — responder no nível pedido

Para provar que algo **pode ser**, basta construir um exemplo válido. Para provar que **deve ser**, é preciso mostrar que ocorre em toda solução. Para provar que **não pode ser**, mostre que a hipótese leva a contradição em todos os casos.

## 8. Ordenação e sequenciamento

Problemas de ordem usam posições distintas e relações como antes, depois, entre e adjacente.

### 8.1. Cadeias de precedência

Se A vem antes de B e B antes de C, então:

$$
A < B < C
$$

A cadeia ocupa pelo menos três posições nessa ordem, ainda que existam elementos entre elas.

### 8.2. Blocos

Se D vem imediatamente antes de E, trate `[D E]` como unidade. Em cinco posições, esse bloco pode começar nas posições 1, 2, 3 ou 4, salvo outras restrições.

Se D apenas está ao lado de E, existem duas orientações: `[D E]` e `[E D]`.

### 8.3. Extremos e espaço disponível

Uma cadeia de quatro elementos não cabe depois da segunda posição em uma fila de cinco. Use o espaço necessário para limitar começos e finais.

### 8.4. Exemplo resolvido

Ana, Beto, Caio, Dora e Eva ocupam cinco posições, uma por pessoa:

1. Caio está imediatamente depois de Ana;
2. Dora está antes de Ana;
3. Beto está na última posição;
4. Eva está antes de Dora.

O bloco `[Ana Caio]` deve ficar depois da cadeia `Eva < Dora`. Como Beto ocupa a posição 5, resta apenas:

```text
1 Eva | 2 Dora | 3 Ana | 4 Caio | 5 Beto
```

Não foi necessário enumerar todas as permutações: a cadeia, o bloco e o extremo fixo ocuparam toda a estrutura.

## 9. Associação e correspondência

Esses problemas conectam categorias como pessoa, cargo, cidade, cor e dia. Antes de resolver, confirme se cada valor é usado uma única vez.

### 9.1. Exclusão cruzada

Se Lia não está em Compras, marque a impossibilidade. Se Compras já foi atribuído a Olga, elimine Compras das demais pessoas. Em relação bijetiva, toda confirmação em uma linha também produz eliminações na coluna.

### 9.2. Pistas compostas

“A pessoa de TI trabalha na quarta” liga duas categorias sem nomear a pessoa. A associação deve ser transportada quando uma delas for descoberta.

### 9.3. Exemplo resolvido

Lia, Nuno e Olga trabalham, cada qual, em um setor diferente entre Compras, Pessoal e TI, e em um dia diferente entre segunda, terça e quarta:

1. Lia não trabalha em Compras nem na segunda;
2. Nuno trabalha em TI e na quarta;
3. Compras funciona na segunda nesse cronograma.

Como Compras corresponde à segunda e Lia não ocupa nenhum dos dois, e Nuno já está em TI na quarta, Olga fica em Compras na segunda. Restam Pessoal e terça para Lia:

| Pessoa | Setor | Dia |
|---|---|---|
| Lia | Pessoal | terça |
| Nuno | TI | quarta |
| Olga | Compras | segunda |

## 10. Distribuição e alocação

Aqui, elementos são colocados em dias, salas, equipes, caixas ou funções, muitas vezes com capacidades diferentes.

### 10.1. Faça o balanço de vagas

Se seis tarefas ocupam três dias com exatamente duas tarefas por dia, preencher duas vagas de um dia fecha esse destino. As demais tarefas devem ser eliminadas dele.

### 10.2. Combine capacidade e incompatibilidade

Se uma equipe comporta duas pessoas e já contém A, qualquer pessoa incompatível com A não pode ocupar a vaga restante. Se só uma pessoa continua possível, ela é forçada.

### 10.3. Exemplo resolvido

Os processos P, Q e R serão analisados nos dias 1, 2 e 3, um por dia:

1. P ocorre antes de R;
2. Q não ocorre no dia 2.

Se Q estivesse no dia 3, P e R teriam de ocupar os dias 1 e 2, nessa ordem, o que seria possível: `P, R, Q`. Se Q estiver no dia 1, resta `P, R` nos dias 2 e 3: `Q, P, R`. Portanto, há duas soluções. A condição “Q não está no dia 2” não autoriza escolher uma delas como única.

Esse exemplo alerta para uma conclusão comum: uma estrutura pode estar bem definida sem determinar todos os valores.

## 11. Agrupamento

Problemas de agrupamento perguntam quem fica junto ou separado, às vezes sem distinguir a ordem interna.

### 11.1. Vínculos e incompatibilidades

- “A com C” forma um núcleo que deve permanecer no mesmo grupo;
- “A sem B” impede que o grupo de A receba B;
- “se D entra, E entra” é uma implicação, não equivalência;
- “F ou G, exclusivamente” preenche uma vaga com exatamente um deles.

### 11.2. Simetria dos nomes dos grupos

Se dois grupos não têm características próprias, trocar seus nomes não cria estrutura substantivamente diferente. Porém, se um é “manhã” e outro “tarde”, a troca altera a solução.

### 11.3. Exemplo resolvido

As tarefas A, B, C e D formarão duas duplas. A deve ficar com C, e A não pode ficar com B. A primeira regra fecha a dupla `{A, C}`. Sobram B e D, que formam `{B, D}`. A segunda regra é satisfeita, mas não foi ela, isoladamente, que determinou a solução.

## 12. Sequências por padrão

Uma sequência apresenta termos ordenados e pede continuidade, termo ausente ou regra geradora. O padrão deve explicar **todos** os termos relevantes, não apenas os dois últimos.

### 12.1. Padrões frequentes

- repetição periódica: A, B, C, A, B, C, ...;
- alternância entre duas regras;
- crescimento da quantidade de símbolos;
- deslocamento de posição ou rotação;
- combinação de atributo, como forma e preenchimento;
- transformação aplicada ao termo anterior.

### 12.2. Estratégia

1. separe atributos: número, forma, posição, orientação, cor;
2. verifique diferenças ou transformações entre termos;
3. teste periodicidade;
4. procure subsequências intercaladas, como posições ímpares e pares;
5. prefira a regra simples que explica integralmente os dados.

Em `2, 5, 4, 7, 6, 9, ...`, as posições ímpares formam `2, 4, 6, ...`, e as pares formam `5, 7, 9, ...`. O próximo termo, na posição ímpar, é 8.

> Não use mera coincidência local. Com poucos termos, várias fórmulas artificiais podem ajustar os dados; em prova, busque o padrão regular e compatível com as alternativas.

## 13. Calendários e horários

Problemas temporais combinam ordem, ciclos e intervalos.

### 13.1. Deslocamento semanal

Após múltiplos de sete dias, repete-se o dia da semana. Para deslocamentos, use o resto da divisão por 7.

Exemplo: se o dia 3 é terça-feira, o dia 24 está 21 dias depois e também é terça-feira.

### 13.2. Contagem inclusiva e exclusiva

“Três dias depois de segunda” leva a quinta: terça é um dia depois. Já um evento que ocorre de segunda a quinta, contando ambos os extremos, abrange quatro dias.

### 13.3. Intervalos de horário

Converta horas e minutos para uma unidade comum quando necessário. Um compromisso das 9h40 às 11h10 dura 1h30, não 1h70.

### 13.4. Cronogramas como alocação

Quando várias atividades ocupam faixas de horário, desenhe a linha temporal e trate sobreposições, durações e intervalos como restrições de capacidade.

## 14. Hierarquias e parentesco

### 14.1. Direção da relação

“A chefia B” não é a mesma coisa que “A é chefiado por B”. Defina setas ou frases padronizadas antes de combinar relações.

### 14.2. Relações transitivas e não transitivas

Se A é superior hierárquico de B e B é superior de C, A está acima de C na hierarquia. Já “A trabalha diretamente com B” e “B trabalha diretamente com C” não implicam que A trabalhe diretamente com C.

### 14.3. Parentesco

Represente gerações em níveis. Antes de inferir gênero, consanguinidade ou afinidade, confira as palavras exatas:

- irmão ou irmã compartilha ao menos um genitor no modelo usual do problema;
- cunhado pode surgir por casamento próprio ou de irmão, conforme o enunciado;
- avô e neto diferem por duas gerações;
- “filho único” restringe os filhos dos mesmos pais, não todos os parentes da geração.

Problemas podem definir convenções próprias. Elas prevalecem sobre interpretações informais.

## 15. Verdade e mentira como restrições do cenário

Alguns problemas informam que exatamente uma, duas ou todas menos uma das declarações são verdadeiras. Neste assunto, cada fala é tratada como condição que depende do cenário, sem desenvolver o cálculo formal de proposições.

### 15.1. Procedimento seguro

1. liste os cenários possíveis;
2. avalie cada declaração em cada cenário;
3. conte quantas ficam verdadeiras;
4. preserve somente as linhas que atendem à quantidade exigida.

### 15.2. Exemplo resolvido

Exatamente uma entre Ana, Beto e Caio retirou um documento. Eles dizem:

- Ana: “Beto retirou o documento.”
- Beto: “Caio retirou o documento.”
- Caio: “Eu não retirei o documento.”

Sabe-se que exatamente **duas** declarações são verdadeiras.

| Responsável | Fala de Ana | Fala de Beto | Fala de Caio | Verdadeiras |
|---|---:|---:|---:|---:|
| Ana | F | F | V | 1 |
| Beto | V | F | V | 2 |
| Caio | F | V | F | 1 |

Logo, Beto retirou o documento. A conclusão decorre da combinação entre exclusividade do responsável e cardinalidade das falas verdadeiras.

## 16. Possível, necessário, impossível e solução única

### 16.1. “Pode ser verdadeiro”

Exige um **exemplo testemunha**: uma configuração completa que satisfaça todas as condições e a alternativa.

### 16.2. “Deve ser verdadeiro”

Exige universalidade: a alternativa precisa ocorrer em todas as soluções. Um exemplo favorável não prova necessidade.

### 16.3. “Não pode ser verdadeiro”

Suponha a alternativa e propague as regras. Se todos os ramos levam a violação, a alternativa é impossível.

### 16.4. Solução única

Uma solução encontrada só é única se não houver outra. A unicidade pode ser provada porque todos os valores foram forçados ou porque os demais casos foram eliminados.

### 16.5. Problema inconsistente ou subdeterminado

- **inconsistente:** nenhuma configuração satisfaz todas as regras;
- **subdeterminado:** mais de uma configuração satisfaz as regras;
- **único:** exatamente uma configuração satisfaz as regras.

Subdeterminação não é erro quando a pergunta pede apenas uma consequência comum ou uma configuração possível.

## 17. Dedução, propagação e busca por casos

### 17.1. Valor único restante

Se o domínio de uma variável ficou com um único valor, a atribuição é forçada.

### 17.2. Lugar único para um valor

Quando cada valor precisa ser usado, mesmo que várias variáveis ainda tenham opções, um valor pode aparecer no domínio de apenas uma delas. Nesse caso, ele pertence àquela variável. Sem a obrigação de usar todos os valores, essa conclusão não é válida.

### 17.3. Pares ou subconjuntos confinados

Se A e B só podem ocupar as posições 2 e 4, nenhum outro elemento pode usar essas posições, ainda que ainda não se saiba qual deles está em cada uma.

### 17.4. Contradição

Um caso deve ser abandonado quando:

- uma variável fica sem valor possível;
- duas entidades ocupam vaga exclusiva;
- uma capacidade é excedida;
- uma quantidade mínima se torna inalcançável;
- uma relação de ordem cria ciclo, como A antes de B, B antes de C e C antes de A.

### 17.5. Escolha de caso eficiente

Quando for preciso testar, escolha a variável com menos valores ou a regra que divide o cenário em poucos ramos. Isso reduz trabalho e risco de omissão.

### 17.6. Busca exaustiva controlada

Enumerar casos é válido quando o espaço é pequeno e os casos são organizados. O problema é enumerar sem critério, repetir configurações ou esquecer restrições. Uma tabela de casos transforma tentativa em prova verificável.

## 18. Como testar alternativas com eficiência

Em muitas questões, não é preciso resolver toda a grade.

### 18.1. Alternativa que “pode ser”

Tente completar uma configuração a partir da alternativa. Ao encontrar uma solução válida, pare: a existência foi demonstrada.

### 18.2. Alternativa que “deve ser”

Tente construir um contraexemplo para cada opção. Uma alternativa obrigatória resiste a todas as tentativas compatíveis.

### 18.3. Alternativa que “não pode ser”

Assuma cada opção e procure rapidamente regra violada ou domínio vazio. Não descarte uma alternativa apenas porque ela parece improvável.

### 18.4. Use primeiro as restrições mais discriminantes

Posições fixas, adjacências, quantidades exatas e incompatibilidades costumam eliminar alternativas mais rápido do que relações vagas de precedência.

## 19. Controle de qualidade da solução

Antes de marcar a resposta, verifique:

1. todas as entidades foram usadas na quantidade correta?
2. cada domínio foi respeitado?
3. posições ou valores exclusivos não foram repetidos?
4. “antes” e “imediatamente antes” foram distinguidos?
5. implicações foram aplicadas apenas na direção correta?
6. mínimos, máximos e quantidades exatas foram respeitados?
7. todas as condições, inclusive as negativas, foram conferidas?
8. a conclusão responde a “pode”, “deve” ou “não pode” no nível adequado?

## 20. Armadilhas frequentes de prova

1. **Acrescentar regra não escrita.** O cenário é definido pelo enunciado.
2. **Confundir precedência com adjacência.** “Antes” admite intervalo.
3. **Inverter relação.** “A chefia B” tem direção definida.
4. **Converter implicação em equivalência.** Se A força B, B não necessariamente força A.
5. **Confundir necessário com suficiente.** “Somente se” apresenta condição necessária.
6. **Ler “ao menos” como “exatamente”.** Cardinalidades diferentes geram soluções diferentes.
7. **Esquecer capacidade.** Uma atribuição pode fechar ou exceder uma caixa.
8. **Confirmar uma célula sem eliminar a coluna.** Em associação um a um, a confirmação propaga exclusões.
9. **Aceitar solução parcial.** Todas as regras devem ser satisfeitas simultaneamente.
10. **Confundir exemplo com prova universal.** Um caso prova possibilidade, não necessidade.
11. **Encontrar uma solução e presumir unicidade.** Outros ramos podem permanecer válidos.
12. **Forçar padrão por coincidência.** A regra deve explicar todos os termos relevantes.
13. **Contar dias de modo inconsistente.** Defina se os extremos entram na contagem.
14. **Tratar relação não transitiva como transitiva.** Adjacência e contato direto não se propagam.
15. **Abrir casos sem manter as regras originais.** Cada ramo continua sujeito ao sistema inteiro.

## 21. Síntese operacional

Para resolver estruturas lógicas:

1. leia primeiro o comando e identifique o tipo de conclusão;
2. liste entidades, categorias, vagas e capacidades;
3. converta cada frase em restrição exata;
4. escolha linha, tabela, caixas, grafo ou lista de casos;
5. aplique primeiro fixações, blocos, cardinalidades e incompatibilidades;
6. propague cada descoberta até estabilizar;
7. abra poucos casos quando a dedução direta parar;
8. descarte ramos por contradição;
9. valide a configuração contra todas as regras;
10. prove possibilidade com exemplo, necessidade em todas as soluções e impossibilidade por contradição.

O objetivo não é adivinhar uma disposição plausível, mas demonstrar o que as restrições permitem ou obrigam.

## Referências

- ASSOCIAÇÃO NACIONAL DE PÓS-GRADUAÇÃO E PESQUISA EM ADMINISTRAÇÃO. [Prova de Raciocínio Lógico do Teste ANPAD](https://www.testeanpad.org.br/prova/logico). Descrição das habilidades avaliadas e dos tipos de relações arbitrárias. Consultada em 18 jul. 2026.
- CARNEGIE MELLON UNIVERSITY. [Constraint Satisfaction Problems](https://www.cs.cmu.edu/~15281-s24/coursenotes/constraints/index.html). Notas da disciplina 15-281 sobre variáveis, domínios, restrições e busca. Consultadas em 18 jul. 2026.
- UNIVERSITY OF CALIFORNIA, BERKELEY. [Constraint Satisfaction Problems](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/csps.html). Texto da disciplina CS 188 sobre formulação e resolução de problemas de satisfação de restrições. Consultado em 18 jul. 2026.

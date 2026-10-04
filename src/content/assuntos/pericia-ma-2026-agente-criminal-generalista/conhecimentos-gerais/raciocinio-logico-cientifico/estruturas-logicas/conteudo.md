---
schemaVersion: 1
title: Estruturas lógicas
description: Representação e dedução em problemas finitos de ordenação, associação, distribuição, agrupamento e relações sujeitas a condições.
order: 200
storageId: per-u020
---

## 1. Encontrar uma disposição que obedeça a todas as regras

Num cenário hipotético, Ana, Beto, Caio, Dora e Eva devem ocupar cinco posições, uma pessoa em cada posição. Caio vem imediatamente depois de Ana; Dora vem antes de Ana; Beto ocupa a quinta posição; Eva vem antes de Dora.

O primeiro passo é separar o que as frases realmente impõem:

- Ana e Caio ficam juntos, nessa ordem: `[Ana Caio]`;
- Eva vem antes de Dora, que vem antes de Ana;
- Beto fica no último lugar.

Eva, Dora e o bloco `[Ana Caio]` precisam ocupar as quatro primeiras posições nessa sequência. Portanto:

| Posição | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Pessoa | Eva | Dora | Ana | Caio | Beto |

Todas as escolhas ficaram forçadas. A solução não surgiu de uma preferência pela ordem dos nomes: surgiu da aplicação simultânea das condições.

Esse é o núcleo de **estruturas lógicas** neste recorte: representar pessoas, objetos, lugares ou eventos, reduzir as possibilidades e deduzir o que as condições permitem ou obrigam. Os demais cenários didáticos deste capítulo também são hipotéticos.

## 2. Separar elementos, possibilidades e restrições

Antes de resolver, anote três coisas: **o que será organizado**, **quais valores cada elemento pode receber** e **quais condições limitam as escolhas**. Essas condições são chamadas de **restrições**.

Numa fila, os elementos são as pessoas e os valores são as posições. Numa escala, podem ser tarefas e dias. Num agrupamento, pessoas e equipes. Uma solução precisa atribuir os valores exigidos a todos os elementos e respeitar todas as restrições.

Confira desde o início se cada valor pode se repetir, se todos precisam ser usados e se há capacidade por destino. “Quatro tarefas em dois dias” não informa, por si só, duas tarefas por dia, nem obriga a ocupar ambos os dias. Uma distribuição equilibrada só será exigida se o enunciado a determinar.

Uma atribuição ainda incompleta, mesmo sem erro aparente, não prova que existe solução: pode ser impossível preencher o restante. E eliminar uma opção não escolhe automaticamente outra. Se Paulo não está em X e ainda pode estar em Y ou Z, as duas possibilidades permanecem.

## 3. Traduzir sem acrescentar condições

### 3.1. Ordem, vizinhança e intervalo

“A vem antes de B” informa apenas que A tem posição anterior à de B. Já “A vem **imediatamente** antes de B” exige posições consecutivas, nessa ordem. “A fica ao lado de B” também exige posições consecutivas, mas admite `[A B]` e `[B A]`.

Chamamos a ordem relativa de **precedência**; a ocupação de posições vizinhas, de **adjacência**. Em `A, C, D, B`, A precede B, embora não seja seu vizinho.

Se há exatamente uma pessoa entre A e B, as posições diferem por 2. Com duas pessoas entre eles, diferem por 3: são três passos de uma posição até a outra. Não confunda a diferença entre posições com o número de pessoas intermediárias.

| Expressão | Restrição que realmente impõe |
|---|---|
| A antes de B | posição de A menor que a de B |
| A imediatamente antes de B | B ocupa a posição seguinte à de A |
| A ao lado de B | posições consecutivas, em qualquer orientação |
| A não está ao lado de B | posições não consecutivas |
| uma pessoa entre A e B | diferença de 2 entre as posições |

### 3.2. Quantidades e condições

“Exatamente um” exige um e somente um. “Pelo menos um” admite um ou mais. “No máximo um” admite zero ou um. Não transforme mínimo ou máximo em quantidade exata.

Uma regra “se D entra no grupo, E entra também” proíbe D presente com E ausente. Ela permite E sem D quando as outras condições também permitirem. Se E estiver excluído, D também precisa ser excluído, pois sua entrada exigiria E.

“Lia participa **somente se** Nuno participar” impõe a mesma direção: a presença de Lia exige a de Nuno. A presença de Nuno, sozinha, não obriga Lia. “Lia participa **se** Nuno participar” troca a direção: Nuno exige Lia.

“A ou B” admite ambos quando não houver exclusividade expressa ou decorrente das demais restrições. “A ou B, **mas não ambos**” exige exatamente um. Já “somente Marta pode autorizar X” restringe o agente de uma eventual autorização; não afirma que X será autorizado.

Essas traduções bastam para aplicar as condições neste capítulo. Proposições, conectivos e tabelas-verdade desenvolvem sua avaliação formal; equivalências e leis de De Morgan aprofundam as transformações, sem serem pré-requisito para organizar os cenários aqui.

## 4. Representar para enxergar as consequências

### 4.1. Fila: posições, cadeias e blocos

Numere as posições e registre as fixações. Escreva `A < B` com o significado “A vem antes de B”. De `A < B` e `B < C`, obtemos `A < B < C`: A vem antes de C, mas isso não transforma ninguém em vizinho imediato.

Uma condição de vizinhança orientada forma um bloco, como `[A B]`. Em cinco posições, esse bloco só pode começar em 1, 2, 3 ou 4: começar em 5 deixaria B sem posição. Se a orientação não estiver definida, conserve os dois blocos possíveis. Confira também se eles cabem nas vagas restantes.

Quando o enunciado manda trocar posições sucessivamente, atualize a disposição após **cada** troca. Se o comando pergunta apenas onde termina uma pessoa, acompanhe sua posição: a troca seguinte usa o estado produzido pela anterior, não a fila inicial.

### 4.2. Círculo: o último também é vizinho do primeiro

Em uma mesa circular, não há extremos. Se a sequência em um sentido é A, B, C, D, E, os vizinhos de A são B e E. Esquecer o fechamento do círculo equivale a resolver outro problema.

Quando só as posições relativas importam, fixe uma pessoa como referência e distribua as demais ao redor dela. Girar o desenho inteiro não muda as vizinhanças. Inverter o sentido, porém, pode trocar esquerda por direita. Use a orientação fornecida pelo enunciado ou pelo desenho; a esquerda de uma pessoa depende de para onde ela está voltada. Para comparar vizinhos, não é necessário escolher qual sentido representa a esquerda.

### 4.3. Associação: cruzar categorias

Lia, Nuno e Olga ocupam setores distintos — Compras, Pessoal e Tecnologia da Informação — e trabalham em dias distintos — segunda, terça e quarta. Lia não está em Compras nem na segunda; Nuno está em Tecnologia da Informação na quarta; Compras corresponde à segunda.

Nuno já ocupa setor e dia definidos. Compras/segunda não pode ser de Lia nem de Nuno, logo pertence a Olga. Restam Pessoal/terça para Lia:

| Pessoa | Setor | Dia |
|---|---|---|
| Lia | Pessoal | terça |
| Nuno | Tecnologia da Informação | quarta |
| Olga | Compras | segunda |

Uma **associação um a um** significa que cada pessoa recebe um valor e que esse valor não é compartilhado por outra pessoa. Confirmar Lia = Pessoal elimina os demais setores para Lia e Pessoal para as demais pessoas. Essa exclusão cruzada só vale quando a exclusividade fizer parte do problema.

Uma pista pode ligar setor e dia antes de identificar a pessoa. “Compras corresponde à segunda” permite transportar uma informação entre as categorias. Uma grade pessoa × setor e outra pessoa × dia ajudam a registrar confirmações e exclusões sem depender da memória.

### 4.4. Grupos: capacidade, mínimo e incompatibilidade

Em grupos, desenhe as vagas e anote pares obrigatórios, pares proibidos, capacidades e quantidades. Se A deve ficar com C e os grupos são duplas, `{A,C}` já completa uma dupla. Isso não cria ordem entre A e C.

Uma sala com limite de duas tarefas fecha ao receber A e B. Uma comissão de quatro membros com mínimo de dois auditores, se já tiver um auditor e dois não auditores, precisa de um auditor na última vaga. A incompatibilidade também usa capacidade: se dois elementos precisam ficar separados, devem existir destinos distintos disponíveis para eles.

Não confunda rótulos intercambiáveis com destinos diferentes. Se só importam os pares formados, trocar “Dupla 1” e “Dupla 2” preserva o agrupamento. Se as equipes são manhã e tarde, a troca pode alterar a solução, pois os destinos têm significado próprio.

## 5. Propagar descobertas antes de abrir casos

Uma atribuição deve produzir todas as consequências que dela decorrem. Ao fechar uma vaga exclusiva, retire-a dos outros elementos; ao atingir uma capacidade, feche o destino; ao ativar uma condição, aplique o que ela exige. Repetir esse processo até não surgir nova dedução é **propagação de restrições**.

Procure duas formas diferentes de escolha forçada:

- **única opção para um elemento:** Paula só pode trabalhar na terça; então trabalha na terça;
- **único elemento para um valor obrigatório:** Jurídico precisa ser usado e só cabe em Rui; então Rui fica em Jurídico, mesmo que ainda tivesse outras opções.

Há também uma reserva conjunta: se A e B só podem usar as vagas exclusivas 2 e 4, ambas ficam reservadas aos dois. Não sabemos quem ocupa qual, mas nenhum terceiro pode usá-las. Se três pessoas só couberem nessas mesmas duas vagas exclusivas, não há solução.

Quando a propagação parar, escolha um elemento com poucas opções e **separe os casos**. Em cada caso, conserve todas as regras originais. Encontrar uma dificuldade não autoriza descartar o caso; descarte-o quando houver violação demonstrada, como elemento sem opção, capacidade ultrapassada, mínimo inalcançável ou disputa por vaga exclusiva. `A < B < C < A` é outro exemplo: numa ordem estrita, ninguém pode vir antes de si mesmo.

Exemplo: P, Q e R ocupam os dias 1, 2 e 3, um por dia. P ocorre antes de R e Q não pode ficar no dia 2.

| Hipótese | Consequência |
|---|---|
| Q no dia 1 | ordem Q, P, R |
| Q no dia 3 | ordem P, R, Q |

Os casos cobrem as duas posições restantes para Q e mostram duas soluções válidas. Abrir casos é investigação controlada; completar um deles não elimina automaticamente os demais.

## 6. Relações: só encadear o que a relação permite

Uma seta precisa ter sentido declarado: por exemplo, “A → B significa que A chefia diretamente B”. Essa seta representa uma relação entre pessoas; não é, nessa convenção, o símbolo de uma condição entre duas afirmações.

Se A está acima de B na mesma cadeia hierárquica e B está acima de C, A está acima de C. Mas isso não torna A chefe **direto** de C. Da mesma forma, A trabalhar diretamente com B e B trabalhar diretamente com C não obriga contato direto entre A e C.

Uma relação é **transitiva** quando o encadeamento de A com B e B com C garante a mesma relação de A com C. “Antes de” numa fila tem essa propriedade; “ao lado de” não tem: em A, B, C, A e C não são vizinhos.

Em parentesco, registre o vínculo e a geração informados. Se Ana é mãe de Bruno e Bruno é pai de Carla, Ana é avó de Carla. Isso não identifica a mãe de Carla, não afirma casamento e não cria outros parentescos por coincidência de nome. A aplicação das relações é desenvolvida em argumentação e inferências; aqui, interessa representar os vínculos sem acrescentar dados.

## 7. O comando decide o que precisa ser provado

Considere novamente as soluções Q, P, R e P, R, Q. Q **pode** ficar em primeiro, mas não **deve** ficar em primeiro. Já P fica antes de R em ambas, embora a ordem completa não seja única.

| Comando | Prova exigida |
|---|---|
| Pode ser verdadeiro | uma configuração completa válida em que a afirmação ocorre |
| Deve ser verdadeiro | a afirmação vale em todas as configurações válidas |
| Não pode ser verdadeiro | nenhuma configuração válida admite a afirmação |
| Solução única | existe uma solução e nenhuma outra configuração válida |

Para derrubar um “deve”, basta um **contraexemplo**: uma solução válida em que a afirmação seja falsa. Para provar um “não pode”, assuma a afirmação e mostre que ela torna impossível satisfazer todas as condições. Um cenário em que a afirmação não acontece, sozinho, não prova que ela seja impossível.

“Pode” inclui o que também é obrigatório: se ocorre em todas as soluções de um problema que tem solução, ocorre em pelo menos uma. Encontrar uma solução prova existência; provar uma conclusão necessária não exige necessariamente descobrir a ordem completa. Antes de concluir, confronte a configuração com todas as regras, inclusive negativas, mínimos e exclusividades.

## 8. Contar falas verdadeiras para filtrar cenários

Exatamente uma entre Ana, Beto e Caio retirou um documento. Ana diz “Beto retirou”; Beto diz “Caio retirou”; Caio diz “Eu não retirei”. O enunciado exige exatamente duas falas verdadeiras.

Examine **todas** as falas em cada cenário, sem presumir que uma pessoa sempre mente ou sempre diz a verdade:

| Quem retirou | Fala de Ana | Fala de Beto | Fala de Caio | Falas verdadeiras |
|---|---|---|---|---:|
| Ana | falsa | falsa | verdadeira | 1 |
| Beto | verdadeira | falsa | verdadeira | 2 |
| Caio | falsa | verdadeira | falsa | 1 |

Só o cenário Beto atende à quantidade exigida. A contagem de falas é uma restrição global, aplicada junto à regra de um único responsável. Se a fala combinar afirmações por “e”, ela só será verdadeira se todas forem verdadeiras; por “ou” inclusivo, basta uma. Dizer que uma frase inteira é falsa não torna automaticamente falsas todas as suas partes. A análise formal dessas combinações pertence a proposições e tabelas-verdade.

O procedimento de resolução permanece o mesmo: **representar → traduzir → propagar → separar casos quando necessário → validar a resposta conforme o comando**.

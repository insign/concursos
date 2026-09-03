---
schemaVersion: 1
slug: raciocinio-logico
title: Mega revisão de Raciocínio Lógico
---

Esta revisão integra os dez assuntos comuns de Raciocínio Lógico dos cargos de Analista Administração e Técnico-Administrativa do TCE/MA 2026. O corte principal é o **Edital nº 1, de 6 de julho de 2026**, considerado com a consolidação decorrente da retificação de 29 de julho de 2026, que não modificou este bloco.

O fio condutor da prova é menos “decorar fórmulas” e mais controlar cinco decisões: **o que está sendo representado, qual regra foi realmente dada, qual operação preserva essa regra, que tipo de conclusão se pede e como conferir o resultado**. Antes de calcular, identifique o objeto: cenário de restrições, argumento, fórmula, classe, conjunto, contagem, evento probabilístico, grandeza geométrica ou matriz.

> **Disciplina de resolução:** traduza sem fortalecer nem enfraquecer o enunciado; preserve escopos e unidades; não crie existência, exclusividade, proporcionalidade, paralelismo, independência ou capacidade que não tenham sido informados; ao final, teste todas as condições originais.

## 1. Estruturas lógicas

Estruturas lógicas organizam pessoas, objetos, lugares, tarefas ou eventos em um universo finito submetido a condições. O enunciado fornece **elementos**, **possibilidades** e **restrições**; a solução é uma configuração completa que satisfaz todas elas simultaneamente.

### 1.1. Traduza a condição antes de montar o quadro

| Linguagem do enunciado | Leitura operacional |
|---|---|
| A antes de B | A ocupa posição anterior; pode haver intervalo |
| A imediatamente antes de B | bloco orientado `[A B]` |
| A ao lado de B | `[A B]` ou `[B A]` |
| A com B | mesmo grupo, salvo regra específica |
| A sem B | grupos distintos |
| se A, então B | ocorrendo A, B deve ocorrer |
| A somente se B | A exige B; B é necessário para A |
| somente A pode fazer X | se X ocorrer, o agente será A; não afirma que X ocorrerá |
| exatamente k | nem menos nem mais que k |
| pelo menos k | k ou mais |
| no máximo k | de zero a k |
| A ou B, mas não ambos | exatamente um dos dois |

Três distinções eliminam muitos erros:

- **precedência não é adjacência**: `A < B` não forma automaticamente `[A B]`;
- **adjacência não fixa direção**: “A ao lado de B” admite duas orientações;
- **condição necessária não é suficiente**: de `A → B` não se conclui `B → A`.

### 1.2. Escolha uma representação que exponha as restrições

| Estrutura do problema | Representação útil |
|---|---|
| fila, classificação, agenda | posições numeradas |
| pessoa × setor × data | grade de associação |
| equipes, salas, turnos | caixas com capacidades |
| chefia, dependência, precedência | setas com direção definida |
| poucas alternativas residuais | árvore curta de casos |

Em uma associação um a um, confirmar `Lia = TI` fecha simultaneamente a linha de Lia e a coluna de TI: eliminam-se outros setores para Lia e TI para as demais pessoas. Em agrupamentos, registre antes de distribuir a capacidade, o mínimo, o máximo, os pares obrigatórios, as incompatibilidades e as condicionais.

### 1.3. Propagação: cada informação deve produzir consequências

Após uma atribuição ou exclusão:

1. elimine opções incompatíveis;
2. feche linha, coluna ou caixa cuja capacidade foi atingida;
3. reserve vagas para mínimos ainda não satisfeitos;
4. reaplique regras condicionais ativadas;
5. procure elemento com única opção e opção que só cabe em um elemento;
6. verifique cadeias de precedência e impossibilidades de encaixe.

Se `A < B`, `B < C` e `C < A`, surgiu um ciclo impossível. Se uma equipe de duas pessoas já contém um par obrigatório, ela está completa. Se três elementos só podem ocupar duas posições exclusivas, o ramo é inviável.

### 1.4. Quando abrir casos

Abra casos apenas quando a propagação direta parar e houver poucas alternativas relevantes. Cada ramo conserva **todas** as regras originais. Uma contradição descarta o ramo inteiro; não autoriza flexibilizar a condição que produziu a contradição.

Exemplo: quatro pessoas ocupam as posições 1 a 4. A está antes de B; C está ao lado de A; D não ocupa a posição 4. Testar a orientação `[C A]` e depois `[A C]` é legítimo. Presumir que C fica imediatamente **depois** de A sem examinar a outra orientação não é.

### 1.5. “Pode”, “deve” e “não pode” exigem provas diferentes

| Comando | Prova adequada |
|---|---|
| pode ser verdadeiro | uma configuração completa válida em que ocorra |
| deve ser verdadeiro | ocorre em todas as configurações; tente construir contraexemplo |
| não pode ser verdadeiro | assumir a alternativa conduz inevitavelmente a contradição |
| solução única | todas as demais configurações foram eliminadas |

Uma solução encontrada prova existência, não necessidade nem unicidade. Uma disposição parcial aparentemente promissora não prova possibilidade: ela ainda pode tornar-se incompatível ao completar as posições.

### 1.6. Armadilhas de maior rendimento

- completar lacunas com “bom senso”;
- interpretar “antes” como “imediatamente antes”;
- ler “pelo menos” como “exatamente”;
- inverter `A → B`;
- transformar uma exclusão isolada em atribuição;
- ignorar capacidade ou mínimo ao avançar um ramo;
- tratar relação não transitiva como transitiva;
- encontrar um exemplo e concluir “deve”;
- preencher o quadro e deixar de reler uma condição negativa.

## 2. Lógica de argumentação, analogias, inferências, deduções e conclusões

Um argumento apresenta uma ou mais afirmações como razões para aceitar outra. **Premissa** é a razão, **conclusão** é a tese apoiada e **inferência** é a passagem das premissas à conclusão. O texto pode conter conclusão intermediária, que encerra um passo e passa a funcionar como premissa do seguinte.

### 2.1. Reconheça a função, não apenas a palavra

“Logo”, “portanto” e “assim” costumam anunciar conclusão; “porque”, “pois” e “já que” costumam introduzir razão. São indícios, não regras mecânicas. A conclusão pode aparecer antes das premissas, e um texto pode argumentar sem marcador explícito.

Diferencie:

- **relato**: organiza fatos, sem um deles sustentar outro;
- **explicação**: toma um fato como aceito e mostra por que ocorreu;
- **opinião isolada**: apresenta posição sem razão;
- **argumento**: oferece razões para que uma tese seja aceita.

A frase “o portal ficou lento porque houve pico de acessos” é explicação se a lentidão já está admitida. Pode funcionar como argumento se a própria existência da lentidão estiver em disputa e o pico for oferecido como evidência.

### 2.2. Pressupostos e estrutura do apoio

Premissas podem ser:

- **ligadas**: precisam atuar juntas;
- **independentes**: cada uma oferece apoio próprio;
- **encadeadas**: uma conclusão intermediária sustenta o passo posterior.

Um **pressuposto** é uma ponte não expressa. Em “Rui domina o sistema, logo deve ministrar o treinamento”, falta uma regra que ligue domínio técnico a aptidão para ensinar. Ao reconstruí-la, não acrescente tudo o que tornaria o argumento convincente; escolha apenas a ponte compatível com o texto e necessária ao apoio pretendido.

### 2.3. Verdade, validade e solidez

| Conceito | Objeto avaliado | Pergunta correta |
|---|---|---|
| verdade/falsidade | afirmação | seu conteúdo corresponde ao caso considerado? |
| validade/invalidade | argumento dedutivo | premissas verdadeiras poderiam coexistir com conclusão falsa? |
| solidez | argumento dedutivo | é válido e tem premissas verdadeiras? |

Premissa falsa não torna automaticamente o argumento inválido. Conclusão verdadeira não torna automaticamente o argumento válido. Um argumento válido com alguma premissa falsa não é sólido; um argumento sólido tem conclusão verdadeira.

Para refutar validade dedutiva, basta um **contraexemplo** coerente no qual todas as premissas sejam verdadeiras e a conclusão, falsa. Não é preciso que o cenário tenha ocorrido no mundo real; ele precisa ser compatível com as premissas.

### 2.4. Dedução, indução e analogia

| Tipo | Pretensão | Teste principal |
|---|---|---|
| dedução | a conclusão é necessária dadas as premissas | procure contraexemplo |
| indução | a conclusão é provável | examine base, representatividade e alcance |
| analogia | transfere expectativa entre casos semelhantes | procure diferença relevante |

Na indução, poucos casos, seleção enviesada e conclusão universal enfraquecem o apoio. Uma amostra ampla, relevante e representativa o fortalece, mas não transforma a conclusão em necessidade lógica.

Na analogia, quantidade de semelhanças não basta. Uma única diferença ligada ao mecanismo responsável pelo resultado pode ser decisiva. Duas unidades usarem o mesmo sistema é pouco informativo se uma delas está sujeita a restrição operacional que impede justamente a prática cujo efeito se pretende transferir.

### 2.5. Conclusão necessária, provável e possível

- **necessária**: não pode ser falsa se as premissas forem verdadeiras;
- **provável**: recebe apoio relevante, mas pode falhar;
- **possível**: ainda não foi excluída.

Possibilidade não implica probabilidade, e probabilidade não implica necessidade. A linguagem da conclusão deve ser proporcional ao apoio: “pode”, “provavelmente”, “sempre” e “necessariamente” não são intercambiáveis.

### 2.6. Padrões condicionais

Considere `A → B`.

| Premissas adicionais | Conclusão | Avaliação |
|---|---|---|
| A | B | válida — afirmação do antecedente |
| ¬B | ¬A | válida — negação do consequente |
| B | A | inválida — afirmação do consequente |
| ¬A | ¬B | inválida — negação do antecedente |

Se “processo urgente recebe prioridade” e P é urgente, segue que P recebe prioridade. Se P recebeu prioridade, não se conclui que era urgente: outra regra pode justificar a prioridade.

### 2.7. Relevância e suficiência

Uma razão pode ser irrelevante (“a proposta é popular, logo é legal”) ou relevante, porém insuficiente (“dois usuários reclamaram, logo todos rejeitam o serviço”). Primeiro verifique se a razão toca a propriedade afirmada; depois, se sustenta a extensão e a força da conclusão.

## 3. Proposições simples e compostas e tabelas-verdade

Na lógica proposicional clássica, uma **proposição** é uma afirmação declarativa que, em contexto definido, recebe exatamente um valor: verdadeiro ou falso. Não é necessário que o candidato conheça esse valor para reconhecer a proposição.

Perguntas, ordens e exclamações sem conteúdo declarativo não recebem V/F. Uma sentença como `x + 2 = 7`, sem valor atribuído a `x`, é aberta; pode tornar-se proposição quando a variável for substituída ou quantificada.

### 3.1. Simples, composta e conectivo principal

Proposição simples é tratada como unidade. Proposição composta combina proposições por conectivos. Em uma fórmula aninhada, o **conectivo principal** é o executado por último; os parênteses definem o agrupamento.

| Operação | Forma | Quando é verdadeira |
|---|---:|---|
| negação | $\neg p$ | quando $p$ é falsa |
| conjunção | $p\land q$ | somente em V/V |
| disjunção inclusiva | $p\lor q$ | quando ao menos uma é V |
| disjunção exclusiva | $p\oplus q$ | quando exatamente uma é V |
| condicional | $p\to q$ | em todos os casos, exceto V/F |
| bicondicional | $p\leftrightarrow q$ | quando os valores são iguais |

O “ou” simples é inclusivo, salvo marca de exclusividade. “Mas”, “embora” e construções equivalentes normalmente preservam a regra de verdade da conjunção, apesar da diferença discursiva.

### 3.2. Condicional: a linha crítica

A condicional `p → q` é falsa apenas quando o antecedente ocorre e o consequente não. Ela não exige relação causal ou temporal.

| $p$ | $q$ | $p\to q$ |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

Em `p → q`:

- `p` é condição **suficiente** para `q`;
- `q` é condição **necessária** para `p`.

| Linguagem | Forma |
|---|---:|
| se p, então q | $p\to q$ |
| p implica q | $p\to q$ |
| p é suficiente para q | $p\to q$ |
| q é necessário para p | $p\to q$ |
| p somente se q | $p\to q$ |
| p se q | $q\to p$ |

“Somente se” aponta para o lado necessário da seta. “Rui será nomeado se aprovado” faz a aprovação suficiente; “Rui será nomeado somente se aprovado” faz a aprovação necessária.

### 3.3. Bicondicional e exclusiva

A bicondicional é verdadeira quando os lados coincidem; a exclusiva, quando divergem:

| Valores de $p$ e $q$ | $p\leftrightarrow q$ | $p\oplus q$ |
|---|:---:|:---:|
| iguais | V | F |
| diferentes | F | V |

A bicondicional expressa necessidade e suficiência recíprocas. A exclusiva afirma exatamente uma verdade, não “ao menos uma”.

### 3.4. Tabelas-verdade

Se há `n` proposições simples distintas, a tabela completa possui:

$$
2^n
$$

linhas. Repetir a mesma letra não aumenta `n`. Monte primeiro todas as atribuições e depois calcule subfórmulas de dentro para fora.

Para três letras, por exemplo, uma enumeração possível é:

| $p$ | $q$ | $r$ |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

A ordem pode variar, desde que cada combinação apareça uma vez.

Atalhos seguros:

- uma parcela F derruba a conjunção;
- uma parcela V garante a disjunção inclusiva;
- antecedente F ou consequente V garante a condicional;
- na bicondicional, compare igualdade; na exclusiva, diferença.

### 3.5. Tautologia, contradição e contingência

| Coluna final | Classificação |
|---|---|
| somente V | tautologia |
| somente F | contradição |
| ao menos um V e um F | contingência |

Uma linha F basta para mostrar que a fórmula não é tautologia, mas não basta para chamá-la de contradição. Uma linha V basta para mostrar que não é contradição, mas não prova tautologia.

### 3.6. Erros recorrentes

- chamar ordem ou pergunta de “proposição falsa”;
- contar ocorrências, não letras distintas;
- presumir que todo “ou” é exclusivo;
- declarar `F → F` falsa;
- esquecer que `F ↔ F` é verdadeira;
- inverter “se” e “somente se”;
- desprezar parênteses e alcance da negação;
- classificar pela observação de uma única linha.

## 4. Equivalências, leis de De Morgan e diagramas lógicos

Duas fórmulas são equivalentes quando têm o mesmo valor em **todas** as atribuições. Uma linha coincidente não prova equivalência; uma linha divergente a refuta. Equivalentemente, `P ↔ Q` deve ser tautológica.

### 4.1. Equivalências indispensáveis

| Expressão | Forma equivalente |
|---|---|
| $\neg\neg p$ | $p$ |
| $p\to q$ | $\neg p\lor q$ |
| $p\to q$ | $\neg q\to\neg p$ |
| $\neg(p\to q)$ | $p\land\neg q$ |
| $p\leftrightarrow q$ | $(p\to q)\land(q\to p)$ |
| $p\leftrightarrow q$ | $(p\land q)\lor(\neg p\land\neg q)$ |
| $\neg(p\leftrightarrow q)$ | $(p\land\neg q)\lor(\neg p\land q)$ |

A **contrapositiva** de `p → q` é `¬q → ¬p` e é equivalente à original. A conversa `q → p` e a inversa `¬p → ¬q` não são equivalentes em geral.

### 4.2. Leis algébricas úteis

$$
p\land p\equiv p,
\qquad
p\lor p\equiv p
$$

$$
p\lor\neg p\equiv\top,
\qquad
p\land\neg p\equiv\bot
$$

$$
p\lor(p\land q)\equiv p,
\qquad
p\land(p\lor q)\equiv p
$$

$$
p\land(q\lor r)
\equiv
(p\land q)\lor(p\land r)
$$

$$
p\lor(q\land r)
\equiv
(p\lor q)\land(p\lor r)
$$

Ao substituir uma subfórmula por equivalente, preserve parênteses e alcance. Equivalência não autoriza “cancelar” letras ou trocar conectivos por semelhança visual.

### 4.3. De Morgan

$$
\neg(p\land q)
\equiv
\neg p\lor\neg q
$$

$$
\neg(p\lor q)
\equiv
\neg p\land\neg q
$$

A operação tem dois movimentos inseparáveis: negar cada parcela e trocar `e` por `ou`, ou `ou` por `e`.

| Frase original | Negação correta |
|---|---|
| Ana assinou e Bruno publicou | Ana não assinou ou Bruno não publicou |
| Ana assinou ou Bruno publicou | Ana não assinou e Bruno não publicou |
| todos os requisitos foram atendidos | pelo menos um requisito não foi atendido |
| algum requisito foi atendido | nenhum requisito foi atendido |

“Nem p nem q” corresponde a `¬p ∧ ¬q`, isto é, à negação de `p ∨ q`.

### 4.4. Roteiro de transformação

1. fixe o conectivo principal;
2. preserve os agrupamentos;
3. elimine `→` ou `↔` quando isso simplificar;
4. leve a negação para dentro, aplicando De Morgan;
5. elimine duplas negações;
6. procure complementos, identidade, absorção e distributividade;
7. se necessário, confira por tabela-verdade ou por atribuição divergente.

### 4.5. Diagramas lógicos de classes

Nos diagramas, regiões representam classes. Uma convenção operacional frequente é:

- região hachurada: vazia;
- `X`: existe ao menos um objeto naquela região;
- região em branco: existência não determinada;
- `X` sobre uma fronteira: existe objeto, mas a sub-região exata ainda não foi determinada.

| Forma categórica | Leitura de classe |
|---|---|
| todo A é B | a parte de A fora de B é vazia |
| nenhum A é B | $A\cap B$ é vazia |
| algum A é B | há `X` em $A\cap B$ |
| algum A não é B | há `X` em $A\setminus B$ |

As negações formam pares:

| Afirmação | Negação |
|---|---|
| todo A é B | algum A não é B |
| nenhum A é B | algum A é B |
| algum A é B | nenhum A é B |
| algum A não é B | todo A é B |

Premissa universal restringe regiões, mas não cria automaticamente existência da classe-sujeito. De “todo auditor é servidor” não se conclui, sem informação existencial, que exista auditor.

### 4.6. Inferências diagramáticas

- se $A\subseteq B$ e $B\subseteq C$, então $A\subseteq C$;
- se todo A é B e algum A é C, então algum B é C;
- se todo A é B e algum B é C, não é obrigatório que algum A seja C;
- se todo A é B e nenhum B é C, então nenhum A é C;
- se algum A é B e nenhum B é C, então algum A não é C.

Para três classes, lance primeiro as restrições universais e depois os objetos existenciais. Não posicione um `X` numa sub-região apenas para favorecer a conclusão quando duas posições permanecem admissíveis.

## 5. Lógica de primeira ordem

A lógica de primeira ordem abre a estrutura interna das afirmações. Em vez de tratar “todo servidor é agente público” como letra indivisível, explicita objetos, propriedades, relações e quantificadores.

### 5.1. Linguagem e semântica

| Elemento | Função |
|---|---|
| domínio | conjunto não vazio de objetos considerados |
| constante | nomeia um objeto |
| variável | ocupa o lugar de um objeto |
| função | recebe objetos e devolve objeto |
| predicado | atribui propriedade ou relação |
| aridade | número de argumentos exigidos |
| igualdade | identidade entre objetos designados |

`f(a)` é termo; `P(f(a))` é fórmula. Predicado binário `R(x,y)` não pode ser usado como `R(x)` sem redefinição. Constantes diferentes podem nomear o mesmo objeto, salvo premissa de desigualdade.

### 5.2. Quantificadores, escopo e variáveis

- `∀x P(x)`: todo objeto do domínio satisfaz P;
- `∃x P(x)`: ao menos um objeto do domínio satisfaz P.

Existencial não significa “exatamente um” nem “algum, mas não todos”. O escopo do quantificador determina quais ocorrências da variável ficam ligadas. Fórmula sem variável livre é uma sentença; fórmula aberta depende também de uma atribuição.

### 5.3. Traduções categóricas

| Português | Fórmula |
|---|---|
| todo A é B | $\forall x(A(x)\to B(x))$ |
| nenhum A é B | $\forall x(A(x)\to\neg B(x))$ |
| algum A é B | $\exists x(A(x)\land B(x))$ |
| algum A não é B | $\exists x(A(x)\land\neg B(x))$ |

**Universal restrita usa implicação; existencial restrita usa conjunção.**

`∀x(A(x) ∧ B(x))` diria que todo objeto do domínio é A e B, não apenas que todo A é B. `∃x(A(x) → B(x))` pode ser satisfeita por um objeto que nem sequer seja A e, por isso, não traduz corretamente “algum A é B”.

“Somente servidores acessam” significa:

$$
\forall x(Acessa(x)\to Servidor(x)).
$$

Não afirma que todo servidor acessa.

### 5.4. Negação de quantificadores

$$
\neg\forall x\,\varphi(x)
\equiv
\exists x\,\neg\varphi(x)
$$

$$
\neg\exists x\,\varphi(x)
\equiv
\forall x\,\neg\varphi(x)
$$

Assim:

$$
\neg\forall x(A(x)\to B(x))
\equiv
\exists x(A(x)\land\neg B(x)).
$$

Negar “todos” produz um contraexemplo existencial; não produz “nenhum”. Para negar quantificadores sucessivos, troque cada quantificador e negue o escopo:

$$
\neg\forall x\exists y\,R(x,y)
\equiv
\exists x\forall y\,\neg R(x,y).
$$

### 5.5. Ordem dos quantificadores

$$
\forall x\exists y\,R(x,y)
$$

permite um `y` diferente para cada `x`. Já

$$
\exists y\forall x\,R(x,y)
$$

exige um mesmo `y` que funcione para todos. Em geral, essas fórmulas não são equivalentes.

Quantificadores consecutivos do mesmo tipo podem trocar de ordem; quantificadores mistos, em geral, não.

### 5.6. Existência, modelos e contramodelos

O domínio global é não vazio, mas uma classe definida por predicado pode ser vazia. Portanto:

$$
\forall x(A(x)\to B(x))
$$

não implica `∃x A(x)`.

Uma fórmula é:

- **satisfatível** se verdadeira em algum modelo;
- **válida** se verdadeira em todos os modelos admissíveis;
- **insatisfatível** se não há modelo que a torne verdadeira.

Para refutar consequência lógica, construa um contramodelo com premissas verdadeiras e conclusão falsa. De `∃xP(x)` e `∃xQ(x)` não segue `∃x(P(x) ∧ Q(x))`: os testemunhos podem ser objetos diferentes.

### 5.7. Inferências elementares

- de `∀x P(x)`, pode-se obter `P(a)` para objeto designado;
- de `P(a)`, segue `∃x P(x)`;
- de `∃x P(x)`, não se conclui `P(a)` para constante arbitrariamente escolhida;
- de `P(a)` para um indivíduo específico, não segue `∀x P(x)`;
- de `∀x(A→B)`, `∀x(B→C)` e `∃xA`, segue `∃xC`.

## 6. Princípios de contagem e probabilidade

O erro mais caro é escolher a fórmula antes de definir o que conta como resultado diferente. Pergunte se há alternativas ou etapas, se a ordem importa, se todos os objetos serão usados, se há repetição, se posições têm restrições e se rotações são equivalentes.

### 6.1. Mapa de decisão da contagem

| Estrutura | Ferramenta inicial |
|---|---|
| alternativas disjuntas | somar |
| etapas sucessivas | multiplicar |
| ordenar todos os objetos distintos | permutação |
| escolher parte e a ordem importa | arranjo |
| escolher parte e a ordem não importa | combinação |
| objetos repetidos e indistinguíveis | dividir pelos fatoriais das repetições |
| escolha com repetição, sem ordem | combinação com repetição |
| disposição circular sem lugar marcado | permutação circular |

### 6.2. Fórmulas básicas

$$
0!=1,
\qquad
P_n=n!
$$

$$
A_{n,p}=\frac{n!}{(n-p)!}
$$

$$
\binom np=\frac{n!}{p!(n-p)!}
$$

$$
A_{n,p}=\binom np\,p!
$$

Com repetições de multiplicidades $a_1,\ldots,a_r$:

$$
\frac{n!}{a_1!\cdots a_r!}.
$$

Em círculo, quando apenas rotações são equivalentes:

$$
(n-1)!.
$$

Escolhendo `p` unidades entre `n` tipos, com repetição e sem ordem:

$$
\binom{n+p-1}{p}.
$$

### 6.3. Restrições

- **juntos**: trate o grupo como bloco e conte sua ordem interna;
- **separados**: use lacunas ou total menos casos adjacentes;
- **posição fixa**: retire objeto e posição antes de permutar;
- **algarismo inicial**: zero não pode iniciar numeral comum;
- **cópias iguais**: trocá-las não cria novo arranjo;
- **círculo**: rotação não cria nova disposição; reflexão continua distinta, salvo regra contrária.

Para “pelo menos um”, o complemento “nenhum” costuma ser mais simples:

$$
N(\text{desejado})=N(\text{total})-N(\text{nenhum}).
$$

### 6.4. Inclusão-exclusão e casa dos pombos

$$
|A\cup B|=|A|+|B|-|A\cap B|
$$

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

Ao distribuir `N` objetos em `r` caixas, alguma caixa contém ao menos:

$$
\left\lceil\frac Nr\right\rceil
$$

objetos. O princípio garante existência, não identifica a caixa.

### 6.5. Espaço amostral e probabilidade

Evento é subconjunto do espaço amostral. Em espaço finito com resultados elementares equiprováveis:

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

Não use essa razão quando os resultados elementares têm pesos diferentes. Dois dados honestos distinguíveis geram 36 pares ordenados equiprováveis; as somas de 2 a 12 não são equiprováveis.

Propriedades:

$$
0\le P(A)\le1,
\qquad
P(A^c)=1-P(A)
$$

$$
P(A\cup B)
=P(A)+P(B)-P(A\cap B).
$$

Se os eventos são mutuamente exclusivos, a interseção é vazia e as probabilidades somam.

### 6.6. Condicionamento, produto e independência

Para `P(B)>0`:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

Logo:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Eventos são independentes quando:

$$
P(A\cap B)=P(A)P(B).
$$

Quando a condicional está definida, isso equivale a `P(A|B)=P(A)`. Exclusão mútua não é independência: eventos mutuamente exclusivos com probabilidades positivas são dependentes, porque a ocorrência de um elimina o outro.

Sem reposição, a composição e o denominador normalmente mudam. Com reposição, a composição é restaurada. Em `n` tentativas independentes, cada uma com sucesso de probabilidade `p`:

$$
P(\text{ao menos um sucesso})=1-(1-p)^n.
$$

### 6.7. Probabilidade total e Bayes

Se `B₁,...,Bₖ` formam partição do espaço:

$$
P(A)=\sum_{i=1}^{k}P(A\mid B_i)P(B_i).
$$

Para inverter o condicionamento:

$$
P(B_j\mid A)
=
\frac{P(A\mid B_j)P(B_j)}
{\sum_iP(A\mid B_i)P(B_i)}.
$$

A taxa-base `P(B_j)` não desaparece. Em geral, `P(A|B)` e `P(B|A)` são diferentes.

## 7. Operações com conjuntos

Antes de operar, identifique o universo e diferencie **pertinência** de **inclusão**.

- `x ∈ A`: x é elemento de A;
- `A ⊆ B`: todo elemento de A está em B;
- `|A|`: número de elementos distintos de A.

A ordem e a repetição não alteram um conjunto. O vazio tem cardinalidade zero, mas `{∅}` tem um elemento. Além disso, `∅ ⊆ A` para todo A; isso não significa `∅ ∈ A`.

### 7.1. Operações e linguagem

| Linguagem | Região/expressão |
|---|---|
| A ou B, inclusive ambos | $A\cup B$ |
| A e B | $A\cap B$ |
| A, mas não B | $A\setminus B$ |
| não A, dentro do universo | $A^c=U\setminus A$ |
| exatamente um entre A e B | $A\triangle B$ |
| nenhum dos dois | $(A\cup B)^c$ |
| não ambos | $(A\cap B)^c$ |

A diferença não é comutativa. O complemento depende do universo. “Nenhum” e “não ambos” não são iguais: o primeiro exclui toda a união; o segundo admite pertencer exatamente a um.

### 7.2. Leis essenciais

$$
A\cup A=A,
\qquad
A\cap A=A
$$

$$
A\cup\varnothing=A,
\qquad
A\cap U=A
$$

$$
A\cup U=U,
\qquad
A\cap\varnothing=\varnothing
$$

$$
A\cup(A\cap B)=A,
\qquad
A\cap(A\cup B)=A
$$

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C)
$$

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C).
$$

De Morgan para conjuntos:

$$
(A\cup B)^c=A^c\cap B^c
$$

$$
(A\cap B)^c=A^c\cup B^c.
$$

É o mesmo padrão estrutural da lógica proposicional: complementar cada parcela e trocar união por interseção.

### 7.3. Cardinalidade de dois conjuntos

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

$$
|A\setminus B|=|A|-|A\cap B|.
$$

$$
|A\triangle B|
=|A|+|B|-2|A\cap B|.
$$

$$
|(A\cup B)^c|=|U|-|A\cup B|.
$$

Limites úteis:

$$
\max(0,|A|+|B|-|U|)
\le |A\cap B|
\le \min(|A|,|B|).
$$

### 7.4. Três conjuntos

Preencha o diagrama do centro para fora:

1. interseção tripla;
2. regiões de exatamente dois;
3. regiões exclusivas;
4. região externa à união.

A informação `|A ∩ B|` inclui quem também pertence a C. Para obter “A e B, mas não C”, subtraia a tripla.

A cardinalidade de quem pertence a pelo menos dois dos três é:

$$
|A\cap B|+|A\cap C|+|B\cap C|
-2|A\cap B\cap C|.
$$

A tripla aparece três vezes na soma inicial e deve terminar contada uma vez.

### 7.5. Conferências

Todas as regiões devem ser não negativas, a soma não pode ultrapassar o universo e os totais marginais precisam ser reconstituídos. Se algum cálculo gera região negativa, a tradução ou os dados usados são incompatíveis.

## 8. Problemas aritméticos

Em problemas aritméticos, a principal habilidade é converter o texto em relações numéricas preservando bases, unidades e restrições. Defina a incógnita, indique sua unidade e só então escreva a equação.

### 8.1. Frações, múltiplos e restos

“Fração de uma quantidade” indica multiplicação. Se a fração incide sobre o restante, a base mudou. Gastar `1/3` de um valor e depois `1/4` do restante não equivale a gastar `1/3 + 1/4` do valor inicial.

Use:

- <abbr title="mínimo múltiplo comum">MMC</abbr> em coincidência de ciclos;
- <abbr title="máximo divisor comum">MDC</abbr> em maior agrupamento idêntico sem sobra;
- divisão euclidiana em problemas de restos:

$$
n=dq+r,
\qquad
0\le r<d.
$$

### 8.2. Razão, proporção e regra de três

$$
a:b=\frac ab,
\qquad
\frac ab=\frac cd\Longleftrightarrow ad=bc.
$$

Proporcionalidade direta: `y=kx`. Proporcionalidade inversa: `xy=k`. Não basta observar que uma grandeza aumentou enquanto a outra diminuiu; a constância precisa decorrer do modelo.

Regra de três organiza proporcionalidade já justificada. Em produção, costuma ser mais seguro calcular a taxa por agente e por unidade de tempo.

Na divisão direta de total `T` na razão `a:b:c`:

$$
x=T\frac{a}{a+b+c},
\quad
y=T\frac{b}{a+b+c},
\quad
z=T\frac{c}{a+b+c}.
$$

Na divisão inversamente proporcional, use os recíprocos como pesos.

### 8.3. Porcentagem e base de comparação

Aumento de `p%` aplica fator `1+p/100`; desconto aplica `1-p/100`.

$$
V_f=V_0\left(1\pm\frac p{100}\right).
$$

Para desfazer a operação, divida pelo fator aplicado. Percentuais sucessivos multiplicam fatores:

$$
V_f=V_0f_1f_2\cdots.
$$

Aumentar 20% e reduzir 20% produz `1,2 × 0,8 = 0,96`, redução líquida de 4%. Passar de 40% para 50% representa 10 pontos percentuais e aumento relativo de 25%.

### 8.4. Médias

$$
\bar x=\frac{\sum x_i}{n},
\qquad
\bar x_p=\frac{\sum w_ix_i}{\sum w_i}.
$$

Ao reunir grupos de tamanhos diferentes, seus tamanhos são pesos; não tire média simples das médias. Velocidade média é sempre distância total dividida por tempo total. Para duas distâncias iguais percorridas a velocidades `v₁` e `v₂`:

$$
v_m=\frac{2v_1v_2}{v_1+v_2}.
$$

### 8.5. Equações, idades e algarismos

Traduza cada relação. Se dois números somam `S` e diferem por `D`:

$$
\text{maior}=\frac{S+D}{2},
\qquad
\text{menor}=\frac{S-D}{2}.
$$

Número de dois algarismos com dezena `x` e unidade `y` é `10x+y`; invertido, `10y+x`. Em idades, todos avançam o mesmo intervalo, por isso a diferença entre idades permanece constante.

Soluções algébricas negativas, fracionárias ou fora de faixa devem ser confrontadas com o contexto: uma raiz correta da equação pode ser inadmissível no problema.

### 8.6. Taxa × tempo

Muitos problemas obedecem a:

$$
\text{quantidade}=\text{taxa}\times\text{tempo}.
$$

- trabalho: quem conclui uma tarefa em `t` unidades de tempo tem taxa `1/t` da tarefa por unidade;
- agentes simultâneos: sob hipóteses comparáveis, somam-se as taxas;
- vazão: entradas somam e saídas subtraem;
- movimento uniforme: `d=vt`; em aproximação por sentidos opostos, somam-se velocidades; em perseguição no mesmo sentido, usa-se a diferença.

Mais trabalhadores só reduzem proporcionalmente o tempo quando trabalho, jornada e produtividade individual permanecem comparáveis.

### 8.7. Misturas e unidades

Se concentração decimal é `c` e volume é `V`, a quantidade da substância é `cV`. Em mistura de duas soluções com volumes aditivos:

$$
c_f=\frac{c_1V_1+c_2V_2}{V_1+V_2}.
$$

Adicionar água conserva o soluto; adicionar soluto puro altera numerador e volume total.

Converta unidades antes de combinar grandezas. Relações frequentes:

- `1 h = 60 min = 3 600 s`;
- `1 km = 1 000 m`;
- `1 kg = 1 000 g`;
- `1 L = 1 000 mL`;
- `1 m/s = 3,6 km/h`.

Duas horas e quinze minutos correspondem a `2,25 h`, não `2,15 h`.

### 8.8. Padrões numéricos

Teste diferenças, razões, alternância, dependência da posição e recorrência informada. Não force progressão aritmética ou geométrica porque os primeiros termos admitem esse ajuste; a regra deve explicar o conjunto relevante dos dados.

## 9. Problemas geométricos

O desenho organiza, mas não prova propriedades. Paralelismo, perpendicularidade, congruência e medidas precisam estar dados ou decorrer de teorema aplicável. Antes da fórmula, determine se se pede comprimento, ângulo, perímetro, área, volume ou capacidade.

### 9.1. Ângulos e triângulos

- complementares somam `90°`;
- suplementares somam `180°`;
- opostos pelo vértice são iguais;
- ao redor de um ponto, a soma é `360°`.

Com duas paralelas cortadas por transversal, ângulos correspondentes e alternos são iguais, e colaterais são suplementares. Sem paralelismo, essas relações não estão garantidas.

Em triângulo:

$$
\alpha+\beta+\gamma=180^\circ.
$$

Se `c` é o maior lado, existe triângulo não degenerado quando:

$$
c<a+b.
$$

Pitágoras exige triângulo retângulo:

$$
a^2+b^2=c^2.
$$

### 9.2. Semelhança, Tales e escala

Em figuras semelhantes com razão linear `k`:

$$
\frac{L_2}{L_1}=k,
\qquad
\frac{A_2}{A_1}=k^2,
\qquad
\frac{V_2}{V_1}=k^3.
$$

Tales exige paralelismo e correspondência coerente dos segmentos. Escala `1:n` multiplica comprimentos por `n`, áreas por `n²` e volumes por `n³`.

### 9.3. Perímetros e áreas

| Figura | Área |
|---|---:|
| quadrado | $l^2$ |
| retângulo | $ab$ |
| paralelogramo | $bh$ |
| triângulo | $\frac{bh}{2}$ |
| trapézio | $\frac{(B+b)h}{2}$ |
| losango | $\frac{Dd}{2}$ |

A altura é perpendicular à base. Em figura composta, decomponha sem sobrepor partes ou calcule uma região maior e subtraia recortes. Perímetro usa unidade linear; área, unidade quadrada.

Para polígono de `n` lados, a soma dos ângulos internos é:

$$
(n-2)180^\circ.
$$

### 9.4. Circunferência e círculo

$$
d=2r,
\qquad
C=2\pi r,
\qquad
A=\pi r^2.
$$

Para ângulo central `θ` em graus:

$$
L_{arco}=\frac{\theta}{360^\circ}2\pi r,
\qquad
A_{setor}=\frac{\theta}{360^\circ}\pi r^2.
$$

Coroa circular:

$$
A=\pi(R^2-r^2).
$$

Não confunda `R²-r²` com `(R-r)²` nem comprimento da circunferência com área do círculo.

### 9.5. Volumes e capacidade

| Sólido | Volume |
|---|---:|
| prisma | $A_bh$ |
| paralelepípedo | $abc$ |
| cubo | $l^3$ |
| cilindro | $\pi r^2h$ |
| pirâmide | $\frac{A_bh}{3}$ |
| cone | $\frac{\pi r^2h}{3}$ |

Com mesma base e altura, cone tem um terço do volume do cilindro; pirâmide, um terço do prisma. Em problema de material, conte apenas as faces existentes: caixa sem tampa não inclui a face superior.

### 9.6. Conversões dimensionais

Se `1 m = 100 cm`:

$$
1\text{ m}^2=10\,000\text{ cm}^2,
\qquad
1\text{ m}^3=1\,000\,000\text{ cm}^3.
$$

$$
1\text{ L}=1\text{ dm}^3=1\,000\text{ cm}^3,
\qquad
1\text{ m}^3=1\,000\text{ L}.
$$

O fator linear deve ser elevado ao quadrado para áreas e ao cubo para volumes.

## 10. Problemas matriciais

Uma matriz é uma disposição retangular; o significado vem dos rótulos e unidades de linhas e colunas. Em `A_{m×n}`, `m` é o número de linhas e `n`, o de colunas. O elemento `a_{ij}` está na linha `i`, coluna `j`.

Antes de operar, decida se a questão apresenta um **padrão em quadro** ou uma **operação matricial**. Em padrões, teste regra por linhas, colunas e, quando justificado, diagonais; uma regra que explica apenas uma posição não está confirmada.

### 10.1. Igualdade, soma e escalar

Duas matrizes são iguais quando têm a mesma ordem e elementos correspondentes iguais. Soma e subtração exigem mesma ordem e operam posição a posição:

$$
(A+B)_{ij}=a_{ij}+b_{ij}.
$$

Multiplicação por escalar aplica o fator a todos os elementos. Aumento uniforme de 10% produz `1,10A`; `0,10A` representa apenas o acréscimo.

### 10.2. Transposta

$$
(A^T)_{ij}=a_{ji}.
$$

A transposta troca linhas por colunas e transforma ordem `m×n` em `n×m`. Em uma tabela, pode trocar a leitura “setores × produtos” por “produtos × setores”, sem alterar arbitrariamente os valores.

### 10.3. Produto matricial

Se:

$$
A_{m\times n}B_{n\times p},
$$

então `AB` existe e tem ordem `m×p`. Cada entrada combina uma linha da primeira matriz com uma coluna da segunda:

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

As dimensões internas devem coincidir; as externas formam a ordem do resultado:

$$
(m\times\cancel n)(\cancel n\times p)\longrightarrow m\times p.
$$

Produto matricial não é multiplicação posição a posição. Em geral, `AB ≠ BA`; a existência de `AB` nem sequer garante a existência de `BA`.

### 10.4. Modelagem

Se linhas representam setores, colunas representam materiais, `Q` contém quantidades e `p` é vetor coluna de preços unitários, `Qp` fornece o custo total de cada setor. A unidade ajuda a validar:

$$
\text{quantidade}\times\frac{\text{valor}}{\text{unidade}}=\text{valor}.
$$

Em composição de etapas, o fator da direita atua primeiro. Trocar a ordem pode inverter o processo ou tornar o produto indefinido.

### 10.5. Limite do recorte

Determinantes, matriz inversa, escalonamento e resolução geral de sistemas lineares não foram nomeados no item “problemas matriciais” deste edital. Só devem aparecer se o próprio enunciado fornecer uma aplicação elementar indispensável; não são eixo autônomo da revisão.

## Revisão cruzada: distinções que atravessam o programa

### Condicional em três níveis

- **estrutura lógica**: `A → B` restringe configurações;
- **argumentação**: permite modus ponens e modus tollens, não conversa nem inversa;
- **lógica proposicional**: é falsa apenas em V/F e equivale a `¬A ∨ B`.

### De Morgan em três linguagens

| Contexto | Regra |
|---|---|
| proposições | negar parcelas e trocar `∧`/`∨` |
| quantificadores | trocar `∀`/`∃` e negar o escopo |
| conjuntos | complementar parcelas e trocar `∪`/`∩` |

### Existência

- uma configuração válida prova que algo **pode** ocorrer;
- uma premissa universal de classe não cria automaticamente exemplar;
- uma fórmula existencial exige testemunho;
- duas existenciais podem ter testemunhos diferentes;
- uma região em branco no diagrama não prova que esteja ocupada.

### “Ou”, soma e união

- no conectivo e na união, “ou” é normalmente inclusivo;
- na contagem, alternativas só podem ser somadas diretamente quando forem disjuntas;
- em probabilidade, a soma exige corrigir a interseção;
- “ou, mas não ambos” é exclusiva ou diferença simétrica.

### Independência, exclusão e incompatibilidade

- eventos mutuamente exclusivos não ocorrem juntos;
- eventos independentes não alteram a probabilidade um do outro;
- restrições incompatíveis tornam um ramo impossível;
- classes disjuntas têm interseção vazia, mas podem ambas existir.

### Unidades e dimensões

- taxa combina quantidade e tempo;
- porcentagem exige identificar a base;
- perímetro, área e volume usam dimensões diferentes;
- produto matricial exige compatibilidade de dimensões internas;
- número sem unidade pode estar matematicamente correto e contextualmente errado.

## Checklist de última passagem

- [ ] identifiquei o tipo de objeto antes de escolher a técnica?
- [ ] traduzi “se”, “somente se”, “todo”, “algum”, “nenhum”, “pelo menos” e “exatamente” sem alterar a força?
- [ ] preservei parênteses, escopos, direção de setas e ordem de quantificadores?
- [ ] distingui exemplo possível de conclusão necessária?
- [ ] procurei contraexemplo quando a questão exigia validade ou necessidade?
- [ ] em contagem, defini o que torna dois resultados diferentes?
- [ ] em probabilidade, confirmei equiprobabilidade, condicionamento, independência e reposição?
- [ ] em conjuntos, corrigi dupla contagem e comecei pela interseção mais interna?
- [ ] em aritmética e geometria, uniformizei unidades e conferi a base ou a hipótese do teorema?
- [ ] em matrizes, rotulei eixos e validei as ordens antes de operar?
- [ ] o resultado final satisfaz todas as condições e responde exatamente ao comando?

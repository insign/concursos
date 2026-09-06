---
schemaVersion: 1
title: Proposições simples e compostas e tabelas-verdade
description: Reconhecimento de proposições, formalização por conectivos e construção e interpretação de tabelas-verdade de fórmulas proposicionais.
order: 38
storageId: proposicoes-tabelas-verdade
---

## 1. O que uma tabela-verdade resolve?

Considere duas afirmações:

- p: “A auditoria começou.”
- q: “O relatório está pronto.”

Saber se cada frase é verdadeira no mundo real pode exigir fatos externos. A **lógica proposicional** faz outra pergunta: **dado o valor de p e de q, qual é o valor da afirmação formada ao combiná-las?**

Se alguém diz “A auditoria começou **e** o relatório está pronto”, a frase inteira só será verdadeira quando p e q forem verdadeiras. Se diz “**Se** a auditoria começou, **então** o relatório está pronto”, a regra de avaliação muda.

A tabela-verdade é justamente o instrumento que organiza todas as combinações possíveis dos valores das proposições simples e mostra o resultado da fórmula composta. Para usá-la bem, o caminho é:

1. reconhecer quais trechos são proposições;
2. separar as proposições simples;
3. identificar o conectivo e seu alcance;
4. aplicar a regra de verdade desse conectivo;
5. quando necessário, repetir o processo por subfórmulas até chegar ao resultado final.

Esse mecanismo é o centro do assunto. Equivalências, leis de De Morgan e diagramas lógicos ficam para o assunto seguinte; aqui, o objetivo é **avaliar a fórmula que foi dada**, sem transformá-la em outra.

## 2. Primeiro filtro: o enunciado recebe verdadeiro ou falso?

Uma **proposição** é uma afirmação declarativa à qual, em um contexto determinado, se pode atribuir exatamente um valor lógico:

- **V**, verdadeiro; ou
- **F**, falso.

Exemplos:

- “São Luís é a capital do Maranhão.” — proposição verdadeira;
- “O número 10 é ímpar.” — proposição falsa.

O candidato não precisa conhecer o valor para reconhecer a proposição. “O processo tem 80 páginas” continua sendo proposição mesmo que você não tenha acesso ao processo: há uma afirmação que, no contexto, será verdadeira ou falsa.

A lógica clássica usada neste assunto é **bivalente**: em cada interpretação, a proposição recebe um e somente um desses dois valores.

### 2.1. O que fica fora

Em regra, não são proposições:

- **perguntas:** “O relatório foi entregue?”;
- **ordens ou pedidos:** “Entregue o relatório.”;
- **exclamações sem afirmação avaliável:** “Que surpresa!”;
- **sentenças abertas:** “x + 2 = 7”, enquanto x não estiver determinado.

Uma **sentença aberta** contém elemento variável do qual depende o valor lógico. Se x for substituído por um valor definido, “x + 2 = 7” passa a produzir uma afirmação verdadeira ou falsa. O fechamento por quantificadores pertence à lógica de primeira ordem, estudada em assunto próprio.

> Pergunta ou ordem não é “proposição falsa”. Ela simplesmente não recebe V ou F.

## 3. Da frase simples à fórmula composta

Uma **proposição simples**, também chamada **atômica**, é tratada como uma unidade: não resulta da combinação de outras proposições por conectivos.

Retomando o cenário:

- p: “A auditoria começou.”
- q: “O relatório está pronto.”

Ao ligar essas unidades, surgem proposições compostas:

- ¬p — “A auditoria não começou.”
- p ∧ q — “A auditoria começou e o relatório está pronto.”
- p ∨ q — “A auditoria começou ou o relatório está pronto.”
- p → q — “Se a auditoria começou, então o relatório está pronto.”
- p ↔ q — “A auditoria começou se e somente se o relatório está pronto.”

O símbolo que realiza a ligação é um **conectivo lógico**. O número de verbos ou de palavras não decide quantas proposições simples existem; o que interessa é a decomposição lógica indicada pelo enunciado.

## 4. Antes de decorar tabelas: pergunte quando a frase falha

As regras dos conectivos ficam mais fáceis de reter quando você identifica o caso decisivo.

| Operação | Forma | Ideia de avaliação |
|---|---:|---|
| negação | ¬p | troca V por F e F por V |
| conjunção | p ∧ q | exige as duas verdadeiras |
| disjunção inclusiva | p ∨ q | exige ao menos uma verdadeira |
| disjunção exclusiva | p ⊻ q | exige exatamente uma verdadeira |
| condicional | p → q | falha apenas quando p é V e q é F |
| bicondicional | p ↔ q | exige valores iguais |

A seguir, cada regra é construída separadamente.

## 5. Negação: inverter o valor e respeitar o alcance

A negação troca o valor lógico:

| p | ¬p |
|:---:|:---:|
| V | F |
| F | V |

O ponto de prova não é apenas “inverter”. É saber **o que está sendo negado**:

- ¬p nega apenas p;
- ¬(p ∧ q) nega a proposição composta inteira;
- (¬p) ∧ q nega p e, depois, conjuga o resultado com q.

Os parênteses delimitam o alcance. Neste assunto, ¬(p ∧ q) deve ser avaliada como está. Transformá-la por uma lei de equivalência é matéria do assunto seguinte.

## 6. Conjunção: todos precisam passar

A conjunção p ∧ q afirma p **e** q ao mesmo tempo. Por isso, basta uma componente falsa para derrubar o conjunto.

| p | q | p ∧ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

Na formalização básica, “e”, “mas”, “embora” e “tanto... quanto” frequentemente unem proposições pela regra da conjunção. O vocabulário pode variar; a estrutura lógica é que decide.

**Atalho seguro:** encontrou uma componente F numa conjunção, o resultado já é F.

## 7. Disjunção: “ao menos uma” não é “exatamente uma”

### 7.1. Disjunção inclusiva

Na disjunção inclusiva p ∨ q, basta que uma das componentes seja verdadeira; as duas também podem ser verdadeiras.

| p | q | p ∨ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

Portanto, o “ou” lógico simples é tratado como inclusivo quando o enunciado não impõe exclusividade.

**Atalho seguro:** encontrou uma componente V numa disjunção inclusiva, o resultado já é V.

### 7.2. Disjunção exclusiva

Na disjunção exclusiva, p ⊻ q, exatamente uma componente deve ser verdadeira.

| p | q | p ⊻ q |
|:---:|:---:|:---:|
| V | V | F |
| V | F | V |
| F | V | V |
| F | F | F |

Ela costuma aparecer em expressões como:

- “ou p ou q, mas não ambos”;
- “exatamente uma”;
- “um ou outro, exclusivamente”.

O símbolo pode variar, inclusive aparecer como ⊕. Não transforme um “ou” simples em exclusivo sem indicação do enunciado.

## 8. Condicional: qual situação viola a promessa?

Leia p → q como “se p, então q”.

- p é o **antecedente**;
- q é o **consequente**.

Pense na condicional como uma regra: **sempre que p ocorrer, q deve ocorrer**. A única violação é afirmar p e deixar q falhar.

| p | q | p → q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

Isso explica dois atalhos que costumam parecer estranhos quando apenas decorados:

- antecedente F torna a condicional V;
- consequente V torna a condicional V.

A **condicional material** é definida por essa tabela. Ela não afirma, por si só, que p causa q, que p ocorreu antes de q ou que as duas proposições tratam do mesmo assunto.

### 8.1. Suficiente e necessário: siga a direção da seta

Em p → q, se p basta para garantir q, então:

- p é condição **suficiente** para q;
- q é condição **necessária** para p.

| Linguagem | Forma |
|---|---|
| se p, então q | p → q |
| p implica q | p → q |
| p é suficiente para q | p → q |
| q é necessário para p | p → q |
| p somente se q | p → q |
| p se q | q → p |

Compare duas frases:

- “Rui será nomeado **se** for aprovado.” A aprovação basta para a nomeação: a → n.
- “Rui será nomeado **somente se** for aprovado.” A aprovação é exigida para a nomeação: n → a.

A palavra **se** apresenta a condição suficiente. A expressão **somente se** apresenta a condição necessária — o lado para o qual a seta aponta.

## 9. Bicondicional: os dois lados precisam concordar

A bicondicional p ↔ q é verdadeira quando p e q têm o mesmo valor lógico.

| p | q | p ↔ q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

Leituras usuais:

- “p se e somente se q”;
- “p exatamente quando q”;
- “p é condição necessária e suficiente para q”.

Ela faz o contraste perfeito com a disjunção exclusiva:

| Valores de p e q | p ↔ q | p ⊻ q |
|---|:---:|:---:|
| iguais | V | F |
| diferentes | F | V |

## 10. Fórmula, subfórmula e conectivo principal

Uma fórmula composta pode exigir várias decisões sucessivas. Em

(p ∨ q) ∧ ¬r,

há três etapas:

1. avaliar p ∨ q;
2. avaliar ¬r;
3. conjugar os dois resultados.

Cada parte que forma uma expressão lógica dentro da fórmula é uma **subfórmula**. O conectivo aplicado por último, que une as grandes partes da expressão, é o **conectivo principal**.

Compare:

- p ∨ (q ∧ r);
- (p ∨ q) ∧ r.

Os mesmos símbolos aparecem, mas o agrupamento é diferente e pode gerar resultados diferentes. Em prova, não confie numa suposta prioridade universal entre conectivos quando a expressão puder ser ambígua: respeite a convenção fornecida e use os parênteses como guia.

## 11. Por que uma tabela com n letras tem 2ⁿ linhas?

Cada proposição simples distinta tem duas possibilidades: V ou F. Para duas letras, são 2 × 2 = 4 combinações; para três, 2 × 2 × 2 = 8. Assim, com n proposições simples distintas, a tabela completa tem:

**2ⁿ linhas.**

| n | Linhas |
|:---:|:---:|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

Conte **letras distintas**, não ocorrências. A fórmula (p ∧ q) ∨ (p ∧ ¬q) repete p e q, mas contém apenas duas proposições simples distintas: 2² = 4 linhas.

## 12. Como montar a tabela sem se perder

Para três letras, uma enumeração possível é:

| p | q | r |
|:---:|:---:|:---:|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |

A ordem pode variar. O requisito é que todas as combinações apareçam uma vez.

Agora avalie (p ∨ q) ∧ ¬p. Em vez de tentar enxergar tudo de uma vez, dê uma coluna a cada passo relevante:

| p | q | p ∨ q | ¬p | (p ∨ q) ∧ ¬p |
|:---:|:---:|:---:|:---:|:---:|
| V | V | V | F | F |
| V | F | V | F | F |
| F | V | V | V | V |
| F | F | F | V | F |

Use este fluxo:

1. liste as proposições simples distintas;
2. calcule 2ⁿ;
3. enumere todas as combinações de V e F;
4. identifique o conectivo principal;
5. separe as subfórmulas necessárias;
6. resolva das partes internas para a fórmula completa;
7. leia a coluna final.

Esse procedimento reduz erros de alcance e permite conferir onde um resultado mudou.

## 13. Quando não é preciso montar a tabela inteira

Se o enunciado já fornece os valores das letras, avalie somente aquela atribuição.

Exemplo:

(p → q) ↔ ¬r, com p=V, q=F e r=V.

1. p → q = F;
2. ¬r = F;
3. F ↔ F = V.

Logo, a fórmula vale V nessa atribuição.

Atalhos seguros vêm das próprias regras já entendidas:

- conjunção com uma componente F → F;
- disjunção inclusiva com uma componente V → V;
- condicional com antecedente F → V;
- condicional com consequente V → V;
- bicondicional → compare igualdade;
- exclusiva → compare diferença.

## 14. O que a coluna final diz sobre a fórmula inteira

Depois de avaliar **todas** as atribuições, a coluna final permite classificar a fórmula:

| Coluna final | Classificação |
|---|---|
| somente V | **tautologia** |
| somente F | **contradição** |
| pelo menos um V e um F | **contingência** |

Portanto:

- p ∨ ¬p é tautologia;
- p ∧ ¬p é contradição;
- p → q é contingência.

Uma única linha F basta para provar que a fórmula **não é tautologia**, mas não basta para chamá-la de contradição: ainda pode haver alguma linha V, caso em que será contingente.

Essas classificações são importantes aqui porque podem ser reconhecidas pela tabela. As transformações algébricas entre fórmulas equivalentes serão estudadas no assunto seguinte.

## 15. Tradução da linguagem natural: primeiro dê nomes, depois use símbolos

Considere:

- p: “O cadastro está completo.”
- q: “O comprovante será emitido.”

Agora preserve exatamente a relação expressa:

- “O comprovante será emitido **se** o cadastro estiver completo” → p → q;
- “O comprovante será emitido **somente se** o cadastro estiver completo” → q → p;
- “Não é verdade que o cadastro está completo e o comprovante foi emitido” → ¬(p ∧ q);
- “O cadastro não está completo e o comprovante foi emitido” → (¬p) ∧ q.

O método é sempre o mesmo: identifique as afirmações básicas, descubra o conectivo que as relaciona e confira o alcance da negação. Não acrescente exclusividade, causalidade ou agrupamento que o texto não forneceu.

## 16. Armadilhas de prova e por que estão erradas

1. **“Se eu não sei o valor, não é proposição.”** Errado: desconhecimento do candidato não elimina o valor lógico da afirmação no contexto.
2. **“Pergunta ou ordem é proposição falsa.”** Errado: elas não recebem V ou F.
3. **“A tabela tem uma linha para cada ocorrência de letra.”** Errado: são 2ⁿ linhas para n letras distintas.
4. **“Ou” simples sempre exclui a possibilidade de ambos.** Errado: a disjunção padrão é inclusiva; exclusividade precisa ser indicada.
5. **“Antecedente falso torna a condicional falsa.”** Errado: a única linha falsa de p → q é V/F.
6. **“Bicondicional verdadeira exige V/V.”** Errado: F/F também produz V porque os valores são iguais.
7. **“p somente se q” significa q → p.** Errado: q é necessária para p, logo p → q.
8. **“Parênteses são decorativos.”** Errado: eles determinam o agrupamento e o alcance.
9. **“Uma linha F prova contradição.”** Errado: ela apenas elimina a possibilidade de tautologia.
10. **“Negar p ∧ q é negar apenas p.”** Errado: ¬(p ∧ q) incide sobre a composta inteira.

## 17. Mapa de retenção

Se precisar reconstruir o assunto sob pressão, pense nesta sequência:

**proposição → letras simples → conectivo → alcance → regra de verdade → subfórmulas → coluna final.**

As regras essenciais são:

- ¬ inverte;
- ∧ exige todas verdadeiras;
- ∨ inclusiva exige ao menos uma verdadeira;
- ⊻ exige exatamente uma verdadeira;
- → só é falsa em V/F;
- ↔ é verdadeira quando os valores são iguais;
- em p → q, p é suficiente e q é necessária;
- n letras distintas geram 2ⁿ linhas;
- somente V na coluna final = tautologia; somente F = contradição; mistura = contingência.

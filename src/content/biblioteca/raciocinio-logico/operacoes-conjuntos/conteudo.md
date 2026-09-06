---
schemaVersion: 1
title: Operações com conjuntos
description: Pertinência, inclusão, união, interseção, diferença, complemento, leis algébricas, cardinalidade, inclusão-exclusão e diagramas de Venn.
order: 42
storageId: operacoes-conjuntos
---

## 1. A pergunta central: em que região cada elemento está?

Problemas de conjuntos parecem variar muito, mas quase todos exigem a mesma decisão: **em qual região cada elemento deve ser colocado ou contado?**

Considere um cenário hipotético. Um setor acompanha 120 processos. O conjunto $A$ reúne os processos com pendência documental; o conjunto $B$, os processos com pendência financeira. Um processo pode estar:

- somente em $A$;
- somente em $B$;
- simultaneamente em $A$ e $B$;
- fora dos dois conjuntos.

Toda a matéria deste capítulo nasce dessa divisão. As operações dizem **qual região selecionar**; a cardinalidade diz **quantos elementos há nela**; a inclusão-exclusão impede que um mesmo elemento seja contado mais de uma vez.

Antes das fórmulas, portanto, faça duas perguntas:

1. **qual é o universo do problema?**
2. **que condição define a região pedida?**

O edital cobra operações com conjuntos. Para esse recorte, são necessários universo, elemento, pertinência, inclusão, igualdade, conjunto vazio, operações, <abbr title="número de elementos distintos de um conjunto">cardinalidade</abbr>, inclusão-exclusão e leitura de regiões. Produto cartesiano, famílias indexadas, partições, intervalos e desenvolvimento abstrato do conjunto das partes não são necessários aqui.

## 2. A linguagem mínima antes de operar

Um **conjunto** é uma coleção bem determinada de objetos, chamados elementos. O **conjunto universo** $U$ reúne todos os objetos admitidos no problema.

No cenário inicial, se os 120 processos acompanhados são os únicos relevantes, esses 120 formam o universo. Os conjuntos $A$ e $B$ são subconjuntos desse universo.

### 2.1. Pertinência: elemento contra conjunto

Se o objeto $x$ é elemento de $A$, escreve-se:

$$
x\in A.
$$

Se não é:

$$
x\notin A.
$$

A relação de pertinência compara **um elemento com um conjunto**.

Exemplo:

$$
A=\{1,2,3\}.
$$

Então $2\in A$, mas $4\notin A$.

### 2.2. Inclusão: conjunto contra conjunto

A expressão

$$
A\subseteq B
$$

significa que **todo elemento de $A$ também pertence a $B$**.

Se, além disso, $A\ne B$, então $A$ é subconjunto próprio de $B$:

$$
A\subsetneq B.
$$

Aqui a comparação é entre **dois conjuntos**.

Essa diferença evita uma pegadinha frequente:

$$
x\in A
\quad\Longleftrightarrow\quad
\{x\}\subseteq A.
$$

Mas

$$
\{x\}\in A
$$

é outra afirmação: diz que o próprio conjunto unitário $\{x\}$ foi colocado como elemento de $A$.

Se

$$
A=\{1,\{2\},3\},
$$

então $\{2\}\in A$, mas $2\notin A$.

### 2.3. Igualdade, repetição e cardinalidade

Dois conjuntos são iguais quando possuem exatamente os mesmos elementos:

$$
A=B
\quad\Longleftrightarrow\quad
A\subseteq B\text{ e }B\subseteq A.
$$

A ordem de escrita e a repetição não alteram o conjunto:

$$
\{1,2,2,3\}=\{3,2,1\}.
$$

A **cardinalidade** de $A$, indicada por $|A|$, é o número de elementos distintos de $A$. Assim,

$$
|\{1,2,2,3\}|=3.
$$

Ter a mesma cardinalidade, porém, não torna dois conjuntos iguais. Por exemplo, $\{1,2\}$ e $\{7,8\}$ têm dois elementos, mas não têm os mesmos elementos.

### 2.4. Conjunto vazio

O conjunto vazio, indicado por $\varnothing$, não possui elementos:

$$
|\varnothing|=0.
$$

Ele é subconjunto de todo conjunto:

$$
\varnothing\subseteq A.
$$

Isso **não** significa que $\varnothing$ seja elemento de todo conjunto.

Também não confunda:

$$
\varnothing\ne\{\varnothing\}.
$$

O primeiro tem zero elementos. O segundo tem um elemento: o próprio conjunto vazio.

## 3. União e interseção: ampliar ou restringir a região

As duas operações centrais podem ser entendidas pelo efeito sobre a região selecionada.

### 3.1. União: basta pertencer a pelo menos um

A união reúne os elementos que estão em $A$, em $B$ **ou em ambos**:

$$
A\cup B=\{x\mid x\in A\text{ ou }x\in B\}.
$$

O “ou” é inclusivo.

Se

$$
A=\{1,2,3\},\qquad B=\{3,4\},
$$

então

$$
A\cup B=\{1,2,3,4\}.
$$

O elemento $3$ aparece nos dois conjuntos, mas é contado uma única vez na união.

No cenário dos processos, $A\cup B$ representa os processos com **pelo menos uma** das duas pendências.

### 3.2. Interseção: as condições devem valer ao mesmo tempo

A interseção reúne os elementos que pertencem simultaneamente aos dois conjuntos:

$$
A\cap B=\{x\mid x\in A\text{ e }x\in B\}.
$$

No exemplo numérico:

$$
A\cap B=\{3\}.
$$

No cenário dos processos, $A\cap B$ representa quem tem **as duas** pendências.

Palavras como **ambos**, **simultaneamente**, **nos dois** e **ao mesmo tempo** normalmente apontam para interseção.

Se

$$
A\cap B=\varnothing,
$$

os conjuntos são **disjuntos**: não possuem elementos em comum.

## 4. Diferença, complemento e exatamente um

### 4.1. Diferença: fica o que pertence ao primeiro e não ao segundo

A diferença

$$
A\setminus B
$$

seleciona os elementos que estão em $A$ e não estão em $B$:

$$
A\setminus B=\{x\mid x\in A\text{ e }x\notin B\}.
$$

Para

$$
A=\{1,2,3\},\qquad B=\{3,4\},
$$

temos

$$
A\setminus B=\{1,2\},
\qquad
B\setminus A=\{4\}.
$$

A ordem importa. Em geral,

$$
A\setminus B\ne B\setminus A.
$$

No cenário inicial, $A\setminus B$ são os processos com pendência documental, mas sem pendência financeira.

### 4.2. Complemento: tudo depende do universo

O complemento de $A$ é o que está no universo e não está em $A$:

$$
A^c=U\setminus A.
$$

Se

$$
U=\{1,2,3,4,5\},\qquad A=\{1,3,5\},
$$

então

$$
A^c=\{2,4\}.
$$

Por isso, “fora de $A$” só faz sentido depois de saber qual é o universo. Trocar $U$ pode trocar $A^c$.

Também:

$$
A\setminus B=A\cap B^c.
$$

Ou seja, “estar em $A$ e não em $B$” é exatamente “estar em $A$ e no complemento de $B$”.

### 4.3. Diferença simétrica: exatamente um dos conjuntos

A diferença simétrica seleciona quem pertence a um dos conjuntos, mas não aos dois:

$$
A\triangle B
=(A\setminus B)\cup(B\setminus A).
$$

Também pode ser escrita como:

$$
A\triangle B
=(A\cup B)\setminus(A\cap B).
$$

No cenário dos processos, é o conjunto dos processos com **exatamente uma** das duas pendências.

## 5. Traduzir a frase vem antes de calcular

Muitos erros não são de conta; são de tradução da linguagem para a região correta.

| Linguagem do enunciado | Região |
|---|---|
| pelo menos um / $A$ ou $B$ | $A\cup B$ |
| ambos / simultaneamente | $A\cap B$ |
| $A$, mas não $B$ | $A\setminus B$ |
| exatamente um | $A\triangle B$ |
| nenhum dos dois | $(A\cup B)^c$ |
| não ambos | $(A\cap B)^c$ |
| somente $A$ entre três | $A\setminus(B\cup C)$ |

Duas frases merecem contraste especial:

- **nenhum dos dois**: o elemento está fora de $A$ e fora de $B$;
- **não ambos**: basta que pelo menos uma das duas pertinências falhe.

Logo,

$$
(A\cup B)^c
\ne
(A\cap B)^c
$$

em geral.

## 6. Leis algébricas: por que elas funcionam

As leis são mais fáceis de lembrar quando se observa a região que cada expressão seleciona.

### 6.1. Repetir a mesma condição não muda a região

$$
A\cup A=A,
\qquad
A\cap A=A.
$$

São as leis de **idempotência**.

### 6.2. Trocar a ordem não muda união nem interseção

$$
A\cup B=B\cup A,
$$

$$
A\cap B=B\cap A.
$$

São as leis de **comutatividade**.

### 6.3. Reagrupar três conjuntos também não muda o resultado

$$
(A\cup B)\cup C=A\cup(B\cup C),
$$

$$
(A\cap B)\cap C=A\cap(B\cap C).
$$

São as leis de **associatividade**.

### 6.4. Vazio e universo funcionam como extremos

$$
A\cup\varnothing=A,
\qquad
A\cap U=A,
$$

$$
A\cup U=U,
\qquad
A\cap\varnothing=\varnothing.
$$

### 6.5. Absorção

A expressão $A\cap B$ já está dentro de $A$. Por isso, uni-la novamente a $A$ não acrescenta nada:

$$
A\cup(A\cap B)=A.
$$

Pelo raciocínio dual:

$$
A\cap(A\cup B)=A.
$$

### 6.6. Distributividade

Assim como em expressões algébricas, uma operação pode ser distribuída sobre a outra:

$$
A\cap(B\cup C)
=(A\cap B)\cup(A\cap C),
$$

$$
A\cup(B\cap C)
=(A\cup B)\cap(A\cup C).
$$

## 7. Complementos e leis de De Morgan

O complemento inverte a região selecionada. Se uma condição era “pertencer à união”, o complemento exige ficar fora de toda essa união:

$$
(A\cup B)^c=A^c\cap B^c.
$$

Em palavras: **não estar em $A$ nem em $B$** significa estar fora de $A$ **e** fora de $B$.

Já:

$$
(A\cap B)^c=A^c\cup B^c.
$$

Em palavras: **não estar simultaneamente em $A$ e $B$** significa estar fora de pelo menos um deles.

Esse é o mecanismo das leis de De Morgan: ao complementar, união e interseção trocam de lugar.

Também valem:

$$
A\cup A^c=U,
\qquad
A\cap A^c=\varnothing,
\qquad
(A^c)^c=A.
$$

## 8. Cardinalidade: contar regiões sem dupla contagem

Quando o problema pergunta “quantos?”, o foco passa da seleção da região para sua cardinalidade.

### 8.1. Dois conjuntos

Suponha, no cenário inicial, que:

$$
|A|=70,
\qquad
|B|=50,
\qquad
|A\cap B|=20.
$$

Se somarmos $70+50$, os 20 processos da interseção entram duas vezes. Para contar cada processo uma única vez, subtraímos uma dessas contagens:

$$
|A\cup B|
=|A|+|B|-|A\cap B|.
$$

No exemplo:

$$
|A\cup B|=70+50-20=100.
$$

Como o universo tem 120 processos, ficam fora dos dois conjuntos:

$$
|(A\cup B)^c|=120-100=20.
$$

As regiões exclusivas também saem diretamente da interseção:

$$
|A\setminus B|=|A|-|A\cap B|,
$$

$$
|B\setminus A|=|B|-|A\cap B|.
$$

No exemplo:

$$
|A\setminus B|=50,
\qquad
|B\setminus A|=30.
$$

Exatamente um dos dois conjuntos corresponde à soma dessas duas regiões:

$$
|A\triangle B|
=|A|+|B|-2|A\cap B|.
$$

### 8.2. Um teste de possibilidade

Se $A,B\subseteq U$ e $|U|=N$, a interseção não pode ser negativa nem maior que o menor conjunto. Além disso, se $|A|+|B|$ ultrapassa $N$, alguma sobreposição é obrigatória.

Por isso:

$$
\max(0,|A|+|B|-N)
\le |A\cap B|
\le \min(|A|,|B|).
$$

Esse intervalo é útil para detectar dados impossíveis antes de fazer contas longas.

## 9. Três conjuntos: comece pelo centro

Com três conjuntos, cada elemento pode ocupar mais regiões. O ponto crítico é que uma interseção de pares, como $A\cap B$, **inclui** quem também pertence a $C$.

A fórmula de inclusão-exclusão é:

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

O sinal final é positivo porque, após subtrair as três interseções de pares, a região tripla foi retirada vezes demais e precisa ser recolocada uma vez.

### 9.1. Como preencher um diagrama de Venn

Quando os dados são fornecidos por interseções, a ordem mais segura é **do centro para fora**:

1. coloque a interseção tripla;
2. obtenha as regiões de exatamente dois conjuntos;
3. calcule as regiões exclusivas de cada conjunto;
4. só então calcule a região externa à união.

Suponha:

$$
|A\cap B|=50,
\quad
|A\cap C|=40,
\quad
|B\cap C|=30,
\quad
|A\cap B\cap C|=20.
$$

A região “$A$ e $B$, mas não $C$” vale:

$$
50-20=30.
$$

Analogamente:

$$
|A\cap C\text{ somente}|=40-20=20,
$$

$$
|B\cap C\text{ somente}|=30-20=10.
$$

Esse passo evita usar como região exclusiva um número que ainda contém a interseção tripla.

### 9.2. Pelo menos dois entre três

Somando

$$
|A\cap B|+|A\cap C|+|B\cap C|,
$$

cada elemento da interseção tripla aparece três vezes. Para que apareça uma única vez, retiramos duas contagens:

$$
|A\cap B|+|A\cap C|+|B\cap C|
-2|A\cap B\cap C|.
$$

## 10. Método de resolução para prova

Use este fluxo sempre que aparecer um problema de conjuntos:

1. **fixe o universo** — principalmente se houver complemento, “nenhum” ou total de pessoas/objetos;
2. **identifique o tipo de relação** — elemento com conjunto ($\in$) ou conjunto com conjunto ($\subseteq$);
3. **traduza a frase em região** — “ou”, “e”, “somente”, “exatamente”, “pelo menos”, “nenhum”;
4. **desenhe ou imagine as regiões antes dos números**;
5. em três conjuntos, **comece pela interseção tripla**;
6. transforme interseções de pares em regiões exclusivas antes de calcular “somente”;
7. aplique inclusão-exclusão para eliminar dupla contagem;
8. confira se nenhuma região ficou negativa e se a soma respeita o universo.

## 11. O que deve ficar automático

Ao final deste assunto, estas distinções precisam sair sem hesitação:

- $x\in A$ compara elemento e conjunto; $B\subseteq A$ compara conjuntos;
- $\varnothing\subseteq A$ para todo $A$, mas isso não implica $\varnothing\in A$;
- $\varnothing$ e $\{\varnothing\}$ são conjuntos diferentes;
- repetir um elemento não aumenta a cardinalidade;
- união usa “ou” inclusivo e contém a interseção;
- diferença depende da ordem;
- complemento depende do universo;
- “nenhum” e “não ambos” representam regiões diferentes;
- em três conjuntos, $A\cap B$ inclui quem também está em $C$;
- inclusão-exclusão existe para corrigir contagens repetidas.

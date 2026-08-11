---
schemaVersion: 1
title: Operações com conjuntos
description: Pertinência, inclusão, união, interseção, diferença, complemento, leis algébricas, cardinalidade, inclusão-exclusão e diagramas de Venn.
order: 42
storageId: operacoes-conjuntos
---

## 1. Recorte do edital

O edital cobra **operações com conjuntos**. O foco é interpretar relações e regiões, operar conjuntos e resolver problemas de cardinalidade sem dupla contagem.

Para esse objetivo, são indispensáveis apenas algumas noções anteriores às operações: universo, elemento, pertinência, inclusão, igualdade, conjunto vazio e cardinalidade. Produto cartesiano, famílias indexadas, partições, intervalos e desenvolvimento abstrato do conjunto das partes não são necessários para este recorte.

## 2. Linguagem básica

Um **conjunto** é uma coleção bem determinada de objetos, chamados elementos. O conjunto universo $U$ reúne os objetos admitidos no problema.

### 2.1. Pertinência

Se $x$ é elemento de $A$:

$$
x\in A.
$$

Se não pertence:

$$
x\notin A.
$$

Pertinência compara **elemento e conjunto**.

### 2.2. Inclusão

$$
A\subseteq B
$$

significa que todo elemento de $A$ também pertence a $B$.

Se $A\subseteq B$ e $A\ne B$, então $A$ é subconjunto próprio de $B$:

$$
A\subsetneq B.
$$

Inclusão compara **dois conjuntos**.

Uma equivalência útil é:

$$
x\in A
\quad\Longleftrightarrow\quad
\{x\}\subseteq A.
$$

Mas $\{x\}\in A$ é outra afirmação: significa que o próprio conjunto unitário aparece como elemento de $A$.

### 2.3. Igualdade e repetição

Conjuntos são iguais quando possuem os mesmos elementos:

$$
A=B
\quad\Longleftrightarrow\quad
A\subseteq B\text{ e }B\subseteq A.
$$

A ordem e a repetição não alteram um conjunto:

$$
\{1,2,2,3\}=\{3,2,1\}.
$$

A cardinalidade $|A|$ conta elementos distintos.

### 2.4. Conjunto vazio e disjunção

O conjunto vazio não possui elementos:

$$
|\varnothing|=0.
$$

Ele é subconjunto de todo conjunto:

$$
\varnothing\subseteq A.
$$

Isso não significa $\varnothing\in A$.

Além disso:

$$
|\{\varnothing\}|=1.
$$

Dois conjuntos são **disjuntos** quando:

$$
A\cap B=\varnothing.
$$

## 3. União e interseção

### 3.1. União

A união reúne quem pertence a $A$, a $B$ ou a ambos:

$$
A\cup B=\{x\mid x\in A\text{ ou }x\in B\}.
$$

O “ou” é inclusivo.

Se

$$
A=\{1,2,3\},\qquad B=\{3,4\},
$$

então:

$$
A\cup B=\{1,2,3,4\}.
$$

### 3.2. Interseção

A interseção reúne quem pertence simultaneamente aos dois conjuntos:

$$
A\cap B=\{x\mid x\in A\text{ e }x\in B\}.
$$

No exemplo:

$$
A\cap B=\{3\}.
$$

Palavras como **ambos**, **simultaneamente** e **nos dois** normalmente indicam interseção.

## 4. Diferença, complemento e diferença simétrica

### 4.1. Diferença

$$
A\setminus B=\{x\mid x\in A\text{ e }x\notin B\}.
$$

No exemplo anterior:

$$
A\setminus B=\{1,2\},
\qquad
B\setminus A=\{4\}.
$$

A diferença **não é comutativa**.

Também:

$$
A\setminus B=A\cap B^c.
$$

### 4.2. Complemento

O complemento depende do universo:

$$
A^c=U\setminus A.
$$

Se

$$
U=\{1,2,3,4,5\},\qquad A=\{1,3,5\},
$$

então:

$$
A^c=\{2,4\}.
$$

Sem universo, o complemento fica indeterminado.

### 4.3. Diferença simétrica

A diferença simétrica reúne os elementos que pertencem a **exatamente um** dos conjuntos:

$$
A\triangle B
=(A\setminus B)\cup(B\setminus A)
=(A\cup B)\setminus(A\cap B).
$$

## 5. Leis essenciais

Para simplificar expressões, use as identidades centrais:

| Lei | Identidade |
|---|---|
| comutatividade | $A\cup B=B\cup A$; $A\cap B=B\cap A$ |
| associatividade | $(A\cup B)\cup C=A\cup(B\cup C)$; análoga para $\cap$ |
| idempotência | $A\cup A=A$; $A\cap A=A$ |
| identidade | $A\cup\varnothing=A$; $A\cap U=A$ |
| dominação | $A\cup U=U$; $A\cap\varnothing=\varnothing$ |
| absorção | $A\cup(A\cap B)=A$; $A\cap(A\cup B)=A$ |

As distributivas são:

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C),
$$

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C).
$$

Para complementos:

$$
A\cup A^c=U,
\qquad
A\cap A^c=\varnothing,
\qquad
(A^c)^c=A.
$$

## 6. Leis de De Morgan para conjuntos

Ao complementar, união e interseção trocam de lugar:

$$
(A\cup B)^c=A^c\cap B^c,
$$

$$
(A\cap B)^c=A^c\cup B^c.
$$

Em linguagem de prova:

- **não pertence a nenhum** $\Rightarrow (A\cup B)^c$;
- **não pertence aos dois simultaneamente** $\Rightarrow (A\cap B)^c$.

Essas expressões não são equivalentes.

## 7. Cardinalidade de dois conjuntos

Para conjuntos finitos:

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

A interseção é subtraída porque foi contada duas vezes.

### 7.1. Regiões exclusivas

$$
|A\setminus B|=|A|-|A\cap B|,
$$

$$
|B\setminus A|=|B|-|A\cap B|.
$$

Exatamente um dos dois:

$$
|A\triangle B|
=|A|+|B|-2|A\cap B|.
$$

Nenhum dos dois:

$$
|(A\cup B)^c|=|U|-|A\cup B|.
$$

### 7.2. Limites da interseção

Se $A,B\subseteq U$ e $|U|=N$:

$$
\max(0,|A|+|B|-N)
\le |A\cap B|
\le \min(|A|,|B|).
$$

O limite inferior vem de $|A\cup B|\le N$; o superior, do fato de a interseção não poder ultrapassar o menor conjunto.

## 8. Três conjuntos e inclusão-exclusão

Para conjuntos finitos:

$$
|A\cup B\cup C|
=|A|+|B|+|C|
-|A\cap B|-|A\cap C|-|B\cap C|
+|A\cap B\cap C|.
$$

As interseções de pares são **inclusivas**: por exemplo, $A\cap B$ também contém quem pertence a $C$.

### 8.1. Como preencher um diagrama

Preencha do centro para fora:

1. interseção tripla;
2. regiões de exatamente dois conjuntos;
3. regiões exclusivas de cada conjunto;
4. região externa ao conjunto união.

Se forem dados:

$$
|A\cap B|=50,
\quad
|A\cap C|=40,
\quad
|B\cap C|=30,
\quad
|A\cap B\cap C|=20,
$$

as regiões de exatamente dois são:

$$
50-20=30,
\qquad
40-20=20,
\qquad
30-20=10.
$$

### 8.2. Pelo menos dois entre três

Somando as interseções de pares, a região tripla aparece três vezes. Para contá-la apenas uma vez:

$$
|A\cap B|+|A\cap C|+|B\cap C|
-2|A\cap B\cap C|.
$$

## 9. Tradução verbal para regiões

| Linguagem do enunciado | Região |
|---|---|
| pelo menos um | $A\cup B$ |
| ambos | $A\cap B$ |
| $A$, mas não $B$ | $A\setminus B$ |
| exatamente um | $A\triangle B$ |
| nenhum | $(A\cup B)^c$ |
| não ambos | $(A\cap B)^c$ |
| somente $A$ entre três | $A\setminus(B\cup C)$ |
| pelo menos dois entre três | regiões duplas exclusivas + tripla |

A maior fonte de erro é traduzir a frase errada antes de calcular.

## 10. Método de resolução

1. **Identifique o universo**, principalmente se houver complemento ou “nenhum”.
2. **Diferencie $\in$ de $\subseteq$**.
3. Traduza “ou”, “e”, “não”, “somente”, “exatamente” e “pelo menos”.
4. Em cardinalidade, desenhe as regiões antes de substituir números.
5. Em três conjuntos, comece pela região tripla.
6. Converta interseções de pares em regiões exclusivas antes de calcular “somente”.
7. Use inclusão-exclusão para corrigir dupla contagem.
8. Confira se todas as regiões são não negativas e se a soma respeita o universo.

## 11. Pegadinhas

- $x\in A$ compara elemento com conjunto; $B\subseteq A$ compara conjuntos.
- $\varnothing\subseteq A$ não implica $\varnothing\in A$.
- $\varnothing\ne\{\varnothing\}$.
- Repetição de elemento não aumenta cardinalidade.
- A união usa “ou” inclusivo e contém a interseção.
- $A\setminus B$ e $B\setminus A$ geralmente são diferentes.
- Complemento depende do universo.
- “Nenhum” e “não ambos” representam regiões diferentes.
- $A\cap B$ inclui a região tripla quando existe um terceiro conjunto.
- Na inclusão-exclusão de três conjuntos, a interseção tripla é adicionada ao final.

## Referências

- CEBRASPE. [Edital nº 1 — TCE/MA, de 6 de julho de 2026](https://cdn.cebraspe.org.br/concursos/TCE_MA_26/arquivos/5FADC380CB030A07F557A9C5EEA6D063017A2CA675E683F39C50B65E6D70F57B.pdf). Raciocínio Lógico, item 6 — Operações com conjuntos.
- BEMM, Laerte. [Lógica e teoria de conjuntos](https://prh.uem.br/kit/topicos-especiais/logica-e-teoria-de-conjuntos.pdf). Universidade Estadual de Maringá. Noções de conjuntos, operações, propriedades e leis de De Morgan.
- ROISENBERG, Mauro. [Teoria dos conjuntos](https://www.inf.ufsc.br/~mauro.roisenberg/ine5403/slide/Conjuntos.PDF). Universidade Federal de Santa Catarina. Pertinência, inclusão, operações e cardinalidade.
- UNIVERSIDADE FEDERAL DE JUIZ DE FORA. [Fundamentos de Matemática Elementar I](https://www2.ufjf.br/mat/files/2009/05/fundamentosdematemticaelementari.pdf). Referência acadêmica para conceitos e operações elementares com conjuntos.